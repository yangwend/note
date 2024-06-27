import { FC, useMemo, useRef, useState } from 'react';
import { useSetState } from 'ahooks';
import { Ellipsis } from 'antd-mobile';
import { EditSOutline, CloseCircleOutline } from 'antd-mobile-icons';
import { NewGoodCreateByFlowTypes, IStoreGroupTypeItem } from '@/types';
import { ToolUtil } from '@/utils';
import FixedTable from '@/components/common/FixedTable';
import GoodsTypeModal from '../GoodsTypeModal';
import styles from './index.module.scss';

interface IProps {
  groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
  goodsTypeList: { code: string; name: string }[]; // 配置状态下拉列表

  canEdit: boolean;

  secList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
  secLoading: boolean;

  mutateSecList: (list: Partial<NewGoodCreateByFlowTypes.ICompareItem>[]) => void;
}

const StepTable: FC<IProps> = ({
  groupList,
  goodsTypeList,

  canEdit,

  secList,
  secLoading,

  mutateSecList,
}) => {
  const [state, setState] = useSetState<{
    goodsTypeModalVisible: boolean; // 配置状态审批弹窗显隐
    editRow: Partial<NewGoodCreateByFlowTypes.ICompareItem>; // 操作行
  }>({
    goodsTypeModalVisible: false,
    editRow: {},
  });

  const columns = [
    {
      dataIndex: 'dataType',
      title: '说明',
      width: 65,
      render: (text: string) => xxxxx,
    },
    {
      dataIndex: '我去32332',
      title: '我去32332',
      width: 65,
      fixed: 'left' as 'left' | 'right',
      render: (text: string) => text || '/',
    },
    ...(canEdit
      ? [
          {
            dataIndex: 'auditGroupCodeList',
            title: '配置状态审批意见',
            width: 125,
            fixed: 'left' as 'left' | 'right',
            render: (text: string[], record: Partial<NewGoodCreateByFlowTypes.ICompareItem>) => {
              let chooseStr = '请选择';
              if ((text || []).length > 0) {
                const names =
                  groupList
                    .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
                    .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
                chooseStr = `323232：${names.join(',')}`;
              }

              return (
                <div className={styles.goodsTypeInput}>
                  <div
                    className={`${styles.desc} ${
                      (text || []).length === 0 ? styles.descEmpty : ''
                    }`}
                    onClick={() => {
                      setState({
                        goodsTypeModalVisible: true,
                        editRow: record,
                      });
                    }}
                  >
                    <Ellipsis direction="end" rows={2} content={chooseStr} />
                  </div>
                  <div className={styles.btnGroup}>
                    {(text || []).length > 0 && (
                      <CloseCircleOutline
                        onClick={() => {
                          const newList = (secList || []).map((item) => {
                            if (item.id === record.id) {
                              return {
                                ...item,
                                auditGoodsType: undefined,
                                auditGroupCodeList: [],
                              };
                            }
                            return item;
                          });
                          mutateSecList(newList);
                        }}
                        className={styles.closeBtn}
                      />
                    )}
                    <EditSOutline
                      onClick={() => {
                        setState({
                          goodsTypeModalVisible: true,
                          editRow: record,
                        });
                      }}
                      color="#55aff4"
                      className={styles.editBtn}
                    />
                  </div>
                </div>
              );
            },
          },
        ]
      : [
          {
            dataIndex: 'auditGroupCodeList',
            title: '3545343434343批意见',
            width: 125,
            fixed: 'left' as 'left' | 'right',
            render: (text: string[], record: Partial<NewGoodCreateByFlowTypes.ICompareItem>) => {
              let finalText = '-';
              if ((text || []).length === 0) {
                finalText = '-';
              } else {
                const names =
                  groupList
                    .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
                    .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
                finalText = `4545：${names.join(',')}`;
              }

              return (
                <Ellipsis
                  direction="end"
                  rows={2}
                  content={finalText}
                  expandText="展开"
                  collapseText="收起"
                />
              );
            },
          },
        ]),
    {
      dataIndex: '23232',
      title: '23323',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '2323',
      title: '2323',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '2323',
      title: '232323',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '2323',
      title: '2323',
      width: 65,
    },
    {
      dataIndex: '232',
      title: '2323',
      width: 125,
      render: (text: string[], record: Partial<NewGoodCreateByFlowTypes.ICompareItem>) => {
        let finalText = '-';
        // 目标3333
        if (record.dataType === '1') {
          if ((text || []).length === 0) {
            finalText = '-';
          } else {
            const names =
              groupList
                .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
                .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
            finalText = `233333333：${names.join(',')}`;
          }
        } else {
          // 对比3333
          finalText =
            ToolUtil.getLabelByValue(goodsTypeList, record.goodsType || '', 'code', 'name') || '-';
        }

        return (
          <Ellipsis
            direction="end"
            rows={2}
            content={finalText}
            expandText="展开"
            collapseText="收起"
          />
        );
      },
    },
    {
      dataIndex: '322222222222',
      title: '2333333333',
      width: 125,
      render: (text: string[], record: Partial<NewGoodCreateByFlowTypes.ICompareItem>) => {
        let finalText = '-';
        // 目标3333
        if (record.dataType === '1') {
          finalText = '-';
        } else if ((text || []).length === 0) {
          finalText = '-';
        } else {
          const names =
            groupList
              .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
              .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
          finalText = `323232323232：${names.join(',')}`;
        }

        return (
          <Ellipsis
            direction="end"
            rows={2}
            content={finalText}
            expandText="展开"
            collapseText="收起"
          />
        );
      },
    },
    {
      dataIndex: '23',
      title: '23',
      width: 105,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 95,
    },
    {
      dataIndex: 'sixtySa23leRate',
      title: '23',
      width: 95,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: '23',
      title: '(大322店)23',
      width: 90,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: 'bigSixtyMoveRate',
      title: '(大23店)60天23动销23率',
      width: 115,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: 'middleDi23stribu23teRa23te',
      title: '(中23店)铺货23率',
      width: 90,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: 'middleSixt23yMoveRate',
      title: '(中店23)60天动23销率',
      width: 115,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: '32',
      title: '(23',
      width: 90,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: '23',
      title: '(小店)23',
      width: 115,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
  ];

  const goodsTypeModalProps = useMemo(
    () => ({
      title: '配置23状23态审批',
      goodsTypeList,
      groupList,
      editRow: {
        goodsType: state.editRow.auditGoodsType || '23',
        groupCodeList: state.editRow.auditGroupCodeList || [],
      },
      editVisible: state.goodsTypeModalVisible,
      onOk: (data: {
        goodsType?: string; // 配置状态
        groupCodeList?: string[]; // 门店分组
      }) => {
        const newList = secList.map((item) => {
          if (item.id === state.editRow.id) {
            return {
              ...item,
              auditGoodsType: data.goodsType,
              auditGroupCodeList: data.groupCodeList || [],
            };
          }
          return item;
        });
        mutateSecList(newList);
        setState({
          editRow: {},
          goodsTypeModalVisible: false,
        });
      },
      onCancel: () => {
        setState({
          editRow: {},
          goodsTypeModalVisible: false,
        });
      },
    }),
    [
      goodsTypeList,
      groupList,
      state.editRow.auditGoodsType,
      state.editRow.auditGroupCodeList,
      state.goodsTypeModalVisible,
      secList,
      state.editRow.id,
      mutateSecList,
      setState,
    ]
  );

  return (
    <>
      <FixedTable
        className={canEdit ? styles.tableShort : styles.table}
        columns={columns}
        list={secList}
      />
      <GoodsTypeModal {...goodsTypeModalProps}></GoodsTypeModal>
    </>
  );
};

export default StepTable;
