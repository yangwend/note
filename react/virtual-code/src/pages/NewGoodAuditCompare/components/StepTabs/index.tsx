import { FC, useMemo } from 'react';
import { Tabs } from 'antd-mobile';
import { IPurchaseItem, IStoreGroupTypeItem, NewGoodCreateByFlowTypes, PageStatus } from '@/types';
import { PageScaffold } from '@/components';
import FirstTable from './firstTable';
import SecTable from './secTable';
import styles from './index.module.scss';

interface IProps {
  pageTitle: string;
  purchaseData: IPurchaseItem[];
  groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
  goodsTypeList: { code: string; name: string }[]; // 配置状态下拉列表
  goodStatusDictList: { dictCode: string; dictName: string }[]; // 让他状态下拉列表

  canEdit: boolean;

  firstList: NewGoodCreateByFlowTypes.ICompareItem[];
  firstLoading: boolean;
  secList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
  secLoading: boolean;

  activeKey: '1' | '2';

  tabInfo?: {
    firstTabShow: boolean;
    secTabShow: boolean;
  };

  bottomHeight: number;

  mutateFirstList: (list: NewGoodCreateByFlowTypes.ICompareItem[]) => void;
  mutateSecList: (list: Partial<NewGoodCreateByFlowTypes.ICompareItem>[]) => void;
  onTabChange: (key: string) => void;
}

const StepTabs: FC<IProps> = ({
  pageTitle,
  purchaseData,
  groupList,
  goodsTypeList,
  goodStatusDictList,

  canEdit,

  firstList,
  firstLoading,
  secList,
  secLoading,

  activeKey,

  tabInfo,

  bottomHeight,

  mutateFirstList,
  mutateSecList,
  onTabChange,
}) => {
  const firstTableProps = useMemo(
    () => ({
      purchaseData,
      goodStatusDictList,
      canEdit,
      firstList,
      firstLoading,
      bottomHeight,
      activeKey,
      mutateFirstList,
    }),
    [
      purchaseData,
      goodStatusDictList,
      canEdit,
      firstList,
      firstLoading,
      bottomHeight,
      activeKey,
      mutateFirstList,
    ]
  );

  const secTableProps = useMemo(
    () => ({
      groupList,
      goodsTypeList,
      canEdit,
      secList,
      secLoading,
      bottomHeight,
      activeKey,
      mutateSecList,
    }),
    [groupList, goodsTypeList, canEdit, secList, secLoading, bottomHeight, activeKey, mutateSecList]
  );

  return (
    <>
      <Tabs className={styles.tabs} activeKey={activeKey} onChange={onTabChange}>
        {tabInfo?.firstTabShow && (
          <Tabs.Tab title="让他分类和让他状态审批" key="1">
            <PageScaffold
              pageStatus={
                firstLoading
                  ? PageStatus.loading
                  : firstList.length > 0
                  ? PageStatus.success
                  : PageStatus.empty
              }
              pageTitle={pageTitle}
              className={styles.wrap}
              content={<FirstTable {...firstTableProps} />}
              emptyTip="暂无对比数据"
            ></PageScaffold>
          </Tabs.Tab>
        )}
        {tabInfo?.secTabShow && (
          <Tabs.Tab title="配置状态审批" key="2">
            <PageScaffold
              pageStatus={
                secLoading
                  ? PageStatus.loading
                  : secList.length > 0
                  ? PageStatus.success
                  : PageStatus.empty
              }
              pageTitle={pageTitle}
              className={styles.wrap}
              content={<SecTable {...secTableProps} />}
              emptyTip="暂无对比数据"
            ></PageScaffold>
          </Tabs.Tab>
        )}
      </Tabs>
    </>
  );
};

export default StepTabs;
