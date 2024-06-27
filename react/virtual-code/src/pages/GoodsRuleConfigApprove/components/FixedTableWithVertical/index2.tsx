import {
  FC,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
  CSSProperties,
  memo,
} from 'react';
import BigNumber from 'bignumber.js';
import { Ellipsis, List } from 'antd-mobile';
import { VariableSizeList, areEqual } from 'react-window';
import memoize from 'memoize-one';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ToolUtil } from '@/utils';
import styles from './index2.module.scss';

interface IColumnItem {
  dataIndex: string;
  title: ReactNode;
  width?: number; // 设置单元格宽度
  ellipsisRow?: number; // 缩略展示行数，默认为 1（可自定义）
  ellipsis?: boolean; // 设置单元格文案是否使用缩略展示
  render?: (text: any, record: any, index: number) => ReactNode; // 自定义渲染
}

// 参考链接：https://react-window.vercel.app/#/examples/list/memoized-list-items
const renderRow = memo(
  ({
    data: rawData,
    index: listIndex,
    style,
    isScrolling,
  }: {
    data: {
      list: any[]; // table 数据
      columns: IColumnItem[]; // 列数据
      rowKey?: string; // 唯一键
      calDynamicWidth: (width: number) => number;
    };
    index: number;
    style: CSSProperties;
    isScrolling?: boolean;
  }) => {
    const listItem = rawData.list[listIndex];

    // TODO:太慢了，体验感不咋友好，实在不行就还是去掉吧（尝试下直接写死那些需要展示的字段，看能否快一点）
    // 解决滚动时的空白问题：https://react-window.vercel.app/#/examples/list/scrolling-indicators
    return (
      <List.Item className={styles.listItem} style={style}>
        {/* {isScrolling ? (
          <div style={{ paddingLeft: 10, fontSize: 13 }}>加载中...</div>
        ) : ( */}
        <>
          {rawData.columns.map((columnItem: IColumnItem, columnIndex: number) => (
            <div
              key={`${listItem[rawData.rowKey || 'id']}-${listIndex}-${columnItem.dataIndex}`}
              className={styles.td}
            >
              {/* 注意：此处去掉了 Ellipsis 组件，该组件放在这做处理很耗性能 */}
              <span
                className={`${styles.tdSpan}`}
                style={{ width: rawData.calDynamicWidth(columnItem.width ?? 100) }}
              >
                {listItem[columnItem.dataIndex] || '-'}
              </span>
            </div>
          ))}
        </>
        {/* )} */}
      </List.Item>
    );
  },
  areEqual
);

const createItemData = memoize((list, columns, rowKey, calDynamicWidth) => ({
  list,
  columns,
  rowKey,
  calDynamicWidth,
}));

interface IProps {
  rowKey?: string; // 唯一键
  columns: IColumnItem[]; // 列数据
  list: any[]; // table 数据
  className?: string;

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度

  listHeight: number; // 表格高度
  theadHeight: number; // 表头高度
  itemSize: (index: number) => number; // 虚拟列表动态高度
}

const FixedTableWithVertical: FC<IProps> = ({
  rowKey = 'id',
  columns,
  list,
  className = '',

  isLandscape,
  clientWidth,
  clientHeight,

  listHeight,
  theadHeight,
  itemSize,
}) => {
  // 根据屏幕宽度动态计算
  const calDynamicWidth = useCallback(
    (width: number) => {
      // 此处 .div(375)，不可以改为按横屏竖屏适配，不然宽度无法撑一屏
      return +new BigNumber(clientWidth || 375).div(375).times(width);
    },
    [clientWidth]
  );

  const itemData = createItemData(list, columns, rowKey, calDynamicWidth);

  return (
    <Fragment>
      <div>
        <div className={styles.header} style={{ height: theadHeight }}>
          {columns.map((columnItem: IColumnItem, columnIndex: number) => (
            <div key={`${columnItem.dataIndex}-${columnIndex}`} className={styles.th}>
              <span
                className={`${styles.thSpan}`}
                style={{ width: calDynamicWidth(columnItem.width ?? 100) }}
              >
                {columnItem.title}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.list}>
          <List>
            <AutoSizer disableHeight>
              {({ width }: { width: number }) => (
                <VariableSizeList
                  width={width}
                  height={listHeight - theadHeight}
                  itemCount={list.length}
                  itemSize={itemSize}
                  itemData={itemData}
                  overscanCount={isLandscape ? 15 : 30}
                  useIsScrolling
                >
                  {renderRow}
                </VariableSizeList>
              )}
            </AutoSizer>
          </List>
        </div>
      </div>
    </Fragment>
  );
};

export default FixedTableWithVertical;
