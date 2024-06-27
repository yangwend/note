import { FC } from 'react';
import { Popover, SafeArea } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import CommonListView from './CommonListView';
import { ImageAssets } from '@/assets';
import NormalSearchBar from './NormalSearchBar';
import { MessageGoodsTypes } from '@/types';
import useGoodsList from './hooks';
import styles from './index.module.scss';

const GoodsListPage: FC = () => {
  const { searchBarProps, commonListViewProps, dropMenuProps } = useGoodsList();
  const { isShowDrop, dropText, actions, onAction, onVisibleChange } = dropMenuProps;

  const rowRender = (rowData: MessageGoodsTypes.IEliminateGoodsItem) => {
    return (
      <div className={styles.goodsItem}>
        <div className={styles.listTop}>{rowData.goodsDesc}</div>
        <div className={`${styles.list} ${styles.listWithChild}`}>
          <div className={styles.item}>
            <span className={styles.itemTitle}>1111：</span>
            {rowData.xxx1}
          </div>
        </div>
        <div className={styles.list}>
          <span className={styles.itemTitle}>2222：</span>
          {rowData.xxx2}
        </div>
        <div className={styles.list}>
          <span className={styles.itemTitle}>3333：</span>
          {rowData.xxx3}
        </div>
        <div className={styles.list}>
          <span className={styles.itemTitle}>4444：</span>
          {rowData.xxx4}
        </div>
        <div className={styles.list}>
          <span className={styles.itemTitle}>5555：</span>
          {rowData.xxx5}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.goodsListContent}>
      <NormalSearchBar {...searchBarProps}>
        <Popover.Menu
          placement='bottom'
          actions={actions}
          trigger='click'
          onAction={onAction}
          onVisibleChange={onVisibleChange}
        >
          <div className={styles.dropMenu}>
            <span>{dropText}</span>
            {isShowDrop ? <UpOutline color={'#000'} /> : <DownOutline color={'#000'} />}
            <span className={styles.line}></span>
          </div>
        </Popover.Menu>
      </NormalSearchBar>
      <div className={styles.goodList}>
        {commonListViewProps.dataSource.length > 0 ? (
          <>
            <CommonListView onRowRender={rowRender} {...commonListViewProps} />
            {!commonListViewProps.hasMore && <div className={styles.noMore}>没有更多啦</div>}
          </>
        ) : (
          <div className={styles.empty}>
            <img src={ImageAssets.empty.pic_default_empty} />
            <div className={styles.emptyText}>暂无数据</div>
          </div>
        )}
      </div>
      <div style={{ background: '#FFFFFF' }}>
        <SafeArea position='bottom' />
      </div>
    </div>
  );
};
export default GoodsListPage;
