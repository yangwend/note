import { FC, ReactNode, useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { throttle } from 'lodash';
import BigNumber from 'bignumber.js';
import { Ellipsis, InfiniteScroll } from 'antd-mobile';
import { ToolUtil } from '@/utils';
import styles from './index.module.scss';

interface IColumnItem {
  dataIndex: string;
  title: ReactNode;
  width?: number; // 设置单元格宽度
  ellipsis?: boolean; // 设置单元格文案是否使用缩略展示
  columnClassName?: string;
  render?: (text: any, record: any, index: number) => ReactNode; // 自定义渲染
}

interface IProps {
  rowKey?: string | ((record: any) => string); // 唯一键
  columns: IColumnItem[]; // 列数据
  list: any[]; // table 数据
  className?: string;

  loadMore: () => void; // 加载更多的回调函数
  hasMore: boolean; // 是否还有更多内容
  hideNoMoreContent?: boolean; // 是否隐藏没有更多内容时的默认内容

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度
}

const FixedTable: FC<IProps> = ({
  rowKey = 'id',
  columns,
  list,
  className = '',

  loadMore,
  hasMore,
  hideNoMoreContent,

  isLandscape,
  clientWidth,
  clientHeight,
}) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const setDraggable = () => {
    let scrollLeft = 0;
    let scrollTop = 0;
    let clickPointX = 0;
    let clickPointY = 0;

    if (tableWrapperRef.current) {
      const handleMove = throttle((e) => {
        // console.log('mousemove 触发', e);
        // 设置表格滚动距离为鼠标移动距离的2倍，可以根据实际情况做修改
        const newX = scrollLeft - (e.x - clickPointX) * 2;
        const newY = scrollTop - (e.y - clickPointY) * 2;
        tableWrapperRef.current!.scroll(newX, newY);
      }, 50);

      tableWrapperRef.current!.addEventListener('mousedown', (e: MouseEvent) => {
        // console.log('鼠标按下', e);
        scrollLeft = tableWrapperRef.current!.scrollLeft;
        scrollTop = tableWrapperRef.current!.scrollTop;
        clickPointX = e.x;
        clickPointY = e.y;
        tableWrapperRef.current!.addEventListener('mousemove', handleMove);
      });

      tableWrapperRef.current!.addEventListener('mouseup', (e) => {
        tableWrapperRef.current!.removeEventListener('mousemove', handleMove);
      });

      tableWrapperRef.current!.addEventListener('mouseleave', (e) => {
        tableWrapperRef.current!.removeEventListener('mousemove', handleMove);
      });

      tableWrapperRef.current!.addEventListener('dragend', (e) => {
        tableWrapperRef.current!.removeEventListener('mousemove', handleMove);
      });
    }
  };

  useEffect(() => {
    setDraggable();
  }, []);

  // 根据屏幕宽度动态计算
  const calDynamicWidth = useCallback(
    (width: number) => {
      // 此处 .div(375)，不可以改为按横屏竖屏适配，不然宽度无法撑一屏
      return +new BigNumber(clientWidth || 375).div(375).times(width);
    },
    [clientWidth]
  );

  // 获取 th/td 的列名
  const getThTdClassName = useCallback((columnItem: IColumnItem, index: number) => {
    if (index === 0) {
      // 首行/列 固定
      return styles.fixedColumn;
    }

    // 其他行/列 暂不支持固定
    return '';
  }, []);

  // 获取唯一键
  const getRowKey = useCallback(
    (record: any) => {
      if (typeof rowKey === 'string') {
        return rowKey;
      }

      if (typeof rowKey === 'function') {
        return rowKey(record);
      }

      return 'id'; // 默认 id
    },
    [rowKey]
  );

  const onLoadMore = async () => {
    console.log('到最下边了!', hasMore);

    if (!hasMore) {
      return;
    }
    console.log('分页请求');
    loadMore();
  };

  return (
    <Fragment>
      <div
        className={`${styles.tableWrapper} ${className}`}
        ref={tableWrapperRef}
        contextMenu={'none'}
      >
        <table className={styles.fixedTable}>
          <thead>
            <tr>
              {columns.map((columnItem: IColumnItem, columnIndex: number) => (
                <th
                  key={`${columnItem.dataIndex}-${columnIndex}`}
                  className={getThTdClassName(columnItem, columnIndex)}
                  style={{
                    paddingLeft: calDynamicWidth(4),
                    paddingRight: calDynamicWidth(4),
                  }}
                >
                  <span
                    className={`${styles.thSpan} ${columnItem.columnClassName}`}
                    style={{ width: calDynamicWidth(columnItem.width ?? 100) }}
                  >
                    {columnItem.title}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((listItem: any, listIndex: number) => (
              <tr key={`${listItem[getRowKey(listItem)]}-${listIndex}`}>
                {columns.map((columnItem: IColumnItem, columnIndex: number) => (
                  <td
                    key={`${listItem[getRowKey(listItem)]}-${listIndex}-${columnItem.dataIndex}`}
                    className={getThTdClassName(columnItem, columnIndex)}
                    style={{
                      paddingLeft: calDynamicWidth(4),
                      paddingRight: calDynamicWidth(4),
                    }}
                  >
                    <span
                      className={`${styles.tdSpan} ${columnItem.columnClassName}`}
                      style={{ width: calDynamicWidth(columnItem.width ?? 100) }}
                    >
                      {typeof columnItem.render !== 'undefined' && (
                        <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                          {columnItem.render(listItem[columnItem.dataIndex], listItem, listIndex)}
                        </span>
                      )}
                      {typeof columnItem.render === 'undefined' && (
                        <>
                          {columnItem.ellipsis ? (
                            <Ellipsis
                              direction="end"
                              rows={2}
                              content={
                                ToolUtil.isEmptyValue(listItem[columnItem.dataIndex])
                                  ? '-'
                                  : listItem[columnItem.dataIndex]
                              }
                              expandText="展开"
                              collapseText="收起"
                            />
                          ) : (
                            <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                              {ToolUtil.isEmptyValue(listItem[columnItem.dataIndex])
                                ? '-'
                                : listItem[columnItem.dataIndex]}
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <InfiniteScroll threshold={10} loadMore={onLoadMore} hasMore={hasMore}>
          {hideNoMoreContent ? <span></span> : undefined}
        </InfiniteScroll>
      </div>
    </Fragment>
  );
};

export default FixedTable;
