import { FC } from 'react';
import { StateLayout } from '@/components';
import { PageStatus } from '@/types';
import FixedTableWithHorizontal from '../FixedTableWithHorizontal';
import StoreViewer from '../StoreViewer/index1';
import { IListItem } from '../../types';
import styles from './index.module.scss';

interface IProps {
  flowId: string; // 流程id
  dataSource: IListItem[]; // 审批列表数据
  hasMore: boolean; // 是否有更多数据
  isSearch: boolean;
  loadMore: () => void; // 加载更多
  imgUrl?: string; // 凭证地址
  onFileClick: () => void; // 点击查看凭证
  singleLoadingMap: { [key: string]: boolean | undefined }; // 单个同意|拒绝 loading
  singleApprove: (record: IListItem, approve: boolean) => void; // 单个同意|拒绝
  canEdit: boolean; // 是否可以编辑

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度
}

const GoodsList: FC<IProps> = ({
  flowId,
  dataSource,
  hasMore,
  isSearch,
  loadMore,
  imgUrl,
  onFileClick,
  singleLoadingMap,
  singleApprove,
  canEdit,

  ...restProps
}) => {
  const columns = [
    {
      dataIndex: '222',
      title: '222',
      ellipsis: true,
    },
    {
      dataIndex: '22',
      title: '22',
    },
    {
      dataIndex: 'storeCount',
      title: '门店',
      render: (_: string | number, record: IListItem) => {
        return <StoreViewer record={record} flowId={flowId} {...restProps} />;
      },
    },
  ];

  return (
    <>
      <FixedTableWithHorizontal
          rowKey="rowKey"
          columns={columns}
          list={dataSource}
          className={`${styles.table} ${canEdit ? styles.tableWithBottom : ''}`}
          loadMore={loadMore}
          hasMore={hasMore}
          {...restProps}
        />
    </>
  );
};

export default GoodsList;
