import { FC, ReactNode, useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { throttle } from 'lodash';
import BigNumber from 'bignumber.js';
import { Ellipsis } from 'antd-mobile';
import { PlatformEnum } from '@/types';
import { ToolUtil, EnvUtil } from '@/utils';
import styles from './index.module.scss';

interface IColumnItem {
  dataIndex: string;
  title: ReactNode;
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

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度
}

/**
 * 竖屏展示 + 首行首列固定 + 横向滚动加载分页
 */
const FixedTableWithHorizontal: FC<IProps> = ({
  rowKey = 'id',
  columns,
  list,
  className = '',

  loadMore,
  hasMore,

  isLandscape,
  clientWidth,
  clientHeight,
}) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [firstTdWidth, setFirstTdWidth] = useState<number>(55); // 首列列宽
  const [normalTdWidth, setNormalTdWidth] = useState<number>(100); // 其他列列宽

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

  const handleScroll = useCallback(
    throttle((e) => {
      const scrollLeft = e?.target?.scrollLeft ?? 0;
      const clientWidth1 = e?.target?.clientWidth ?? 0;
      const scrollWidth = e?.target?.scrollWidth ?? 0;
      // console.log(
      //   `e相关值:(scrollLeft：${scrollLeft}，clientWidth：${clientWidth1}，scrollWidth：${scrollWidth})`
      // );

      // 阈值设置为 10
      if (scrollLeft + clientWidth1 + 10 >= scrollWidth) {
        console.log('到最右边了!', hasMore);

        if (!hasMore) {
          return;
        }
        console.log('分页请求');
        loadMore();
      }
    }, 200), // 时间设置太快了，容易导致多次调用
    [hasMore]
  );

  useEffect(() => {
    if (tableWrapperRef.current) {
      // 监听滚动，分页加载处理
      tableWrapperRef.current!.addEventListener('scroll', handleScroll, false);
    }

    return () => {
      if (tableWrapperRef.current) {
        tableWrapperRef.current!.removeEventListener('scroll', handleScroll, false);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (list.length <= 2) {
      // 小于等于2条数据，则针对表格列宽度做处理；大于2条数据，则页面已经可以撑满，不需要做处理
      setFirstTdWidth(list.length === 1 ? (isLandscape ? 240 : 120) : isLandscape ? 131 : 65);
      setNormalTdWidth(list.length === 1 ? (isLandscape ? 411 : 239) : isLandscape ? 256 : 143);
    } else {
      setFirstTdWidth(55);
      setNormalTdWidth(100);
    }
  }, [list.length, isLandscape]);

  // 根据屏幕宽度动态计算
  const calDynamicWidth = useCallback(
    (width: number) => {
      return +new BigNumber(clientWidth || 375).div(isLandscape ? 667 : 375).times(width);
    },
    [clientWidth, isLandscape]
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
              <th
                className={styles.fixedColumn}
                style={{
                  paddingLeft: calDynamicWidth(4),
                  paddingRight: calDynamicWidth(4),
                }}
              >
                <span
                  className={`${styles.thSpan} ${columns[0].columnClassName}`}
                  style={{ width: calDynamicWidth(firstTdWidth) }} // 固定首列为 firstTdWidth
                >
                  {columns[0].title}
                </span>
              </th>
              {list.map((listItem: any, listIndex: number) => (
                <th
                  key={`${listItem[getRowKey(listItem)]}-${listIndex}-${columns[0].dataIndex}`}
                  className={styles.fixedColumn}
                  style={{
                    paddingLeft: calDynamicWidth(4),
                    paddingRight: calDynamicWidth(4),
                  }}
                >
                  <span
                    className={`${styles.thSpan} ${columns[0].columnClassName}`}
                    style={{ width: calDynamicWidth(normalTdWidth) }} // 固定其余列为 normalTdWidth
                  >
                    {typeof columns[0].render !== 'undefined' && (
                      <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                        {columns[0].render(listItem[columns[0].dataIndex], listItem, listIndex)}
                      </span>
                    )}
                    {typeof columns[0].render === 'undefined' && (
                      <>
                        {columns[0].ellipsis ? (
                          <Ellipsis
                            direction="end"
                            rows={2}
                            content={
                              ToolUtil.isEmptyValue(listItem[columns[0].dataIndex])
                                ? '-'
                                : listItem[columns[0].dataIndex]
                            }
                            expandText="展开"
                            collapseText="收起"
                          />
                        ) : (
                          <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                            {ToolUtil.isEmptyValue(listItem[columns[0].dataIndex])
                              ? '-'
                              : listItem[columns[0].dataIndex]}
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.slice(1).map((columnItem: IColumnItem, columnIndex: number) => (
              <tr key={`${columnItem.dataIndex}-${columnIndex}`}>
                <td
                  className={styles.fixedColumn}
                  style={{
                    paddingLeft: calDynamicWidth(4),
                    paddingRight: calDynamicWidth(4),
                  }}
                >
                  <span
                    className={`${styles.tdSpan} ${columnItem.columnClassName}`}
                    style={{ width: calDynamicWidth(firstTdWidth) }} // 固定首列为 firstTdWidth
                  >
                    {columnItem.title}
                  </span>
                </td>
                {list.map((listItem: any, listIndex: number) => (
                  <td
                    key={`${listItem[getRowKey(listItem)]}-${listIndex}-${columnItem.dataIndex}`}
                    style={{
                      paddingLeft: calDynamicWidth(4),
                      paddingRight: calDynamicWidth(4),
                    }}
                  >
                    <span
                      className={`${styles.tdSpan} ${columnItem.columnClassName}`}
                      style={{ width: calDynamicWidth(normalTdWidth) }} // 固定其余列为 normalTdWidth
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
            {/* 处理从PC端跳转进来时，企业微信自带了一个安全区域，导致我们页面展示有问题 */}
            {EnvUtil.getPlatform() === PlatformEnum.IOS && (
              <tr className={styles.extraTr}>
                <td colSpan={list.length + 1}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default FixedTableWithHorizontal;
