import {
  FC,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
  CSSProperties,
} from 'react';
import BigNumber from 'bignumber.js';
import { Ellipsis, List } from 'antd-mobile';
// @ts-ignore
import { List as VirtualizedList } from 'react-virtualized';
import 'react-virtualized/styles.css'; // 导入样式
import { ToolUtil } from '@/utils';
import styles from './index1.module.scss';

interface IColumnItem {
  dataIndex: string;
  title: ReactNode;
  width?: number; // 设置单元格宽度
  ellipsisRow?: number; // 缩略展示行数，默认为 1（可自定义）
  ellipsis?: boolean; // 设置单元格文案是否使用缩略展示
  columnClassName?: string;
  render?: (text: any, record: any, index: number) => ReactNode; // 自定义渲染
}

interface IProps {
  rowKey?: string | ((record: any) => string); // 唯一键
  columns: IColumnItem[]; // 列数据
  list: any[]; // table 数据
  className?: string;

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度

  listHeight: number; // 表格高度
  theadHeight: number; // 表头高度
  rowHeight: ({ index }: { index: number }) => number;
}

const FixedTable: FC<IProps> = ({
  rowKey = 'id',
  columns,
  list,
  className = '',

  isLandscape,
  clientWidth,
  clientHeight,

  listHeight,
  theadHeight,
  rowHeight,
}) => {
  // 根据屏幕宽度动态计算
  const calDynamicWidth = useCallback(
    (width: number) => {
      // 此处 .div(375)，不可以改为按横屏竖屏适配，不然宽度无法撑一屏
      return +new BigNumber(clientWidth || 375).div(375).times(width);
    },
    [clientWidth]
  );

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

  const rowRenderer = ({
    index: listIndex,
    key,
    style,
    isScrolling,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
    isScrolling: boolean;
  }) => {
    const listItem = list[listIndex];
    if (!listItem) return;

    // React Virtualized - 滚动一长串item后屏幕变为空白：https://cloud.tencent.com/developer/ask/sof/1197539
    return (
      <List.Item className={styles.listItem} key={key} style={{ ...style }}>
        {isScrolling ? (
          <div style={{ paddingLeft: 10, fontSize: 13 }}>加载中...</div>
        ) : (
          <>
            {columns.map((columnItem: IColumnItem, columnIndex: number) => (
              <div
                key={`${listItem[getRowKey(listItem)]}-${listIndex}-${columnItem.dataIndex}`}
                className={styles.td}
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
                          rows={columnItem.ellipsisRow || 1} // 默认为 1，可自定义，不放开展开收起功能
                          content={
                            ToolUtil.isEmptyValue(listItem[columnItem.dataIndex])
                              ? '-'
                              : listItem[columnItem.dataIndex]
                          }
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
              </div>
            ))}
          </>
        )}
      </List.Item>
    );
  };

  return (
    <Fragment>
      <div>
        <div className={styles.header} style={{ height: theadHeight }}>
          {columns.map((columnItem: IColumnItem, columnIndex: number) => (
            <div key={`${columnItem.dataIndex}-${columnIndex}`} className={styles.th}>
              <span
                className={`${styles.thSpan} ${columnItem.columnClassName}`}
                style={{ width: calDynamicWidth(columnItem.width ?? 100) }}
              >
                {columnItem.title}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.list}>
          <List>
            <VirtualizedList
              autoHeight={false}
              rowCount={list.length}
              rowRenderer={rowRenderer}
              width={clientWidth}
              height={listHeight - theadHeight}
              rowHeight={rowHeight}
              overscanRowCount={10}
            />
          </List>
        </div>
      </div>
    </Fragment>
  );
};

export default FixedTable;
