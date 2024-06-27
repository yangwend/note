import { FC, ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash';
import BigNumber from 'bignumber.js';
import { Ellipsis } from 'antd-mobile';
import { ToolUtil } from '@/utils';
import styles from './index.module.scss';

interface IColumnItem {
  dataIndex: string;
  title: ReactNode;
  width?: number; // 设置单元格宽度
  fixed?: 'left' | 'right'; // 设置单元格是否是固定的
  ellipsis?: boolean; // 设置单元格文案是否使用缩略展示
  columnClassName?: string;
  render?: (text: any, record: any, index: number) => ReactNode; // 自定义渲染
}

interface IProps {
  columns: IColumnItem[]; // 列数据
  list: any[]; // table 数据
  className?: string;
}

const FixedTable: FC<IProps> = ({ columns, list, className = '' }) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [isLandscape, setIsLandscape] = useState<boolean>(false); // 是否横屏展示

  // 监听页面变化
  const handleResize = () => {
    // window.orientation属性已经被废弃，不再建议使用。
    // iPhone 的 Safari 浏览器不支持该属性。经验证，在iphone上，获取到的window.orientation是错的
    // 如果需要检测设备的方向，请使用window.matchMedia("(orientation: portrait)")或window.matchMedia("(orientation: landscape)")。

    // 更新是否横屏展示
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  const setDraggable = () => {
    let scrollLeft = 0;
    let scrollTop = 0;
    let clickPointX = 0;
    let clickPointY = 0;

    if (tableWrapperRef.current) {
      const handleMove = throttle((e) => {
        console.log('mousemove 触发', e);
        // 设置表格滚动距离为鼠标移动距离的2倍，可以根据实际情况做修改
        const newX = scrollLeft - (e.x - clickPointX) * 2;
        const newY = scrollTop - (e.y - clickPointY) * 2;
        tableWrapperRef.current!.scroll(newX, newY);
      }, 50);

      tableWrapperRef.current!.addEventListener('mousedown', (e: MouseEvent) => {
        console.log('鼠标按下', e);
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

    handleResize();

    // 此种判断方式没错，可以考虑采用它，但是 resize 性能更好，可以针对页面任何的 resize 做监听，故优先采用 resize
    // const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  const calDynamicWidth = (width: number) => {
    const html = document.getElementsByTagName('html')[0];
    const clientWidth = html.clientWidth;
    const clientHeight = html.clientHeight;
    const min = clientWidth > clientHeight ? clientHeight : clientWidth;
    console.log('FixedTable 页面宽高->', clientWidth, clientHeight, min);
    return +new BigNumber(min).div(isLandscape ? 300 : 375).times(width);
  };

  // 获取 th/td 的列名
  const getThTdClassName = useCallback((columnItem: IColumnItem, index: number) => {
    if (index === 0) {
      // 首行/列 固定
      return styles.fixedColumn;
    }

    // 其他行/列 设置了固定才固定
    return columnItem.fixed
      ? columnItem.fixed === 'left'
        ? styles.fixedColumn
        : styles.fixedRightColumn
      : '';
  }, []);

  /**
   * @description 计算 设置了固定的列的 left
   * @author yangwen
   * @param {number} index
   * @return {*}
   */
  const getThTdLeft = (index: number) => {
    let left = 0;

    if (index > 0) {
      // 计算 left 值
      columns.forEach((columnItem, columnIndex: number) => {
        if (columnIndex < index) {
          left += calDynamicWidth((columnItem.width ?? 100) + 8);
        }
      });
    }

    return left;
  };

  /**
   * @description 计算设置了固定的列的 right
   * @author yangwen
   * @param {number} index
   * @return {*}
   */
  const getThTdRight = (index: number) => {
    let right = 0;

    if (index < columns.length - 1) {
      // 计算 right 值
      for (let i = columns.length - 1; i >= 0; i--) {
        if (index < i) {
          right += calDynamicWidth((columns[i].width ?? 100) + 8);
        }
      }
    }

    return right;
  };

  return (
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
                key={columnItem.dataIndex}
                className={getThTdClassName(columnItem, columnIndex)}
                style={{
                  paddingLeft: calDynamicWidth(4),
                  paddingRight: calDynamicWidth(4),
                  ...(columnIndex === 0 || !columnItem.fixed
                    ? {
                        // width: calDynamicWidth((columnItem.width ?? 100) + 8),
                      }
                    : columnItem.fixed === 'left'
                    ? {
                        left: getThTdLeft(columnIndex),
                        width: calDynamicWidth((columnItem.width ?? 100) + 8),
                        zIndex: 2 + (100 - columnIndex),
                      }
                    : {
                        right: getThTdRight(columnIndex), // sticky right 属性会受到父元素 transform 的影响，故此处是失效的
                        width: calDynamicWidth((columnItem.width ?? 100) + 8),
                        zIndex: 110 + columnIndex, // 首行的z-index需要大于td的z-index
                      }),
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
            <tr key={listItem.id}>
              {columns.map((columnItem: IColumnItem, columnIndex: number) => (
                <td
                  key={`${listItem.id}-${columnItem.dataIndex}`}
                  className={getThTdClassName(columnItem, columnIndex)}
                  style={{
                    paddingLeft: calDynamicWidth(4),
                    paddingRight: calDynamicWidth(4),
                    ...(columnIndex === 0 || !columnItem.fixed
                      ? {
                          // width: calDynamicWidth((columnItem.width ?? 100) + 8),
                        }
                      : columnItem.fixed === 'left'
                      ? {
                          left: getThTdLeft(columnIndex),
                          width: calDynamicWidth((columnItem.width ?? 100) + 8),
                          zIndex: 1 + (100 - columnIndex),
                        }
                      : {
                          right: getThTdRight(columnIndex), // sticky right 属性会受到父元素 transform 的影响，故此处是失效的
                          width: calDynamicWidth((columnItem.width ?? 100) + 8),
                          zIndex: 100 + columnIndex, // 首行的z-index需要大于td的z-index
                        }),
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
    </div>
  );
};

export default FixedTable;
