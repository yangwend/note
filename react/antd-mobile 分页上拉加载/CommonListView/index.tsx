import { Divider, InfiniteScroll, PullToRefresh } from 'antd-mobile';
import React, { Fragment } from 'react';
import styles from './index.module.scss';

export interface ICommonListViewProps<T extends { [key: string]: any }> {
  onRefresh?: () => Promise<void>;
  loadMore?: () => Promise<void>;
  onRowRender: string | React.ReactNode | ((rowData: T, index: number) => React.ReactNode);
  dataSource: T[];
  hasMore: boolean;
  showDivider?: boolean;
  keyExtra?: string;
  hideNoMoreContent?: boolean;
  disablePullRefresh?: boolean;
}

function renderRow<T extends { [key: string]: any }>(
  item: T,
  index: number,
  onRowRender: string | React.ReactNode | ((rowData: T, index: number) => React.ReactNode)
) {
  if (typeof onRowRender === 'string') {
    return onRowRender;
  }
  if (typeof onRowRender === 'function') {
    return onRowRender(item, index);
  }
  return onRowRender;
}

function CommonListView<T extends { [key: string]: any }>({
  onRefresh,
  loadMore,
  dataSource,
  hasMore,
  onRowRender,
  showDivider,
  keyExtra,
  hideNoMoreContent,
  disablePullRefresh,
}: ICommonListViewProps<T>): React.ReactElement<ICommonListViewProps<T>> {
  return (
    <>
      <PullToRefresh onRefresh={onRefresh} disabled={disablePullRefresh}>
        {dataSource.map((item: T, index: number) => (
          <Fragment key={keyExtra ? `${item[keyExtra]}` : index}>
            {showDivider && (
              <div className={index !== 0 ? styles.line : styles.hide}>
                <Divider />
              </div>
            )}
            {renderRow(item, index, onRowRender)}
          </Fragment>
        ))}
      </PullToRefresh>
      {hasMore && loadMore ? (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          {hideNoMoreContent ? <span></span> : undefined}
        </InfiniteScroll>
      ) : (
        <div />
      )}
    </>
  );
}

export default CommonListView;
