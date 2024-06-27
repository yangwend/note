/* eslint-disable spellcheck/spell-checker */
import { FC, useRef, useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { NewGoodCreateByFlowTypes, PageStatus } from '@/types';
import { PageScaffold } from '@/components';
import { ToolUtil } from '@/utils';
import styles from './index.module.scss';

interface IProps {
  pageTitle: string;
  notStepsList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
  bottomHeight: number;
}

const NotStepTable: FC<IProps> = ({ pageTitle, notStepsList, bottomHeight }) => {
  const theadRightRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLDivElement>(null);
  const tbodyLeftRef = useRef<HTMLDivElement>(null);
  const tbodyLeftItemRef = useRef<HTMLDivElement>(null);

  /* 移动所需参数 */
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [endX, setEndX] = useState<number>(0);
  const [endY, setEndY] = useState<number>(0);
  const [isMove, setIsMove] = useState<boolean>(false);

  const scrollEvent = (e) => {
    if (theadRightRef?.current) {
      theadRightRef.current.style.left =
        -e.target.scrollLeft +
        ((document.querySelector(`.${styles.theadLeft}`) as HTMLDivElement)?.offsetWidth || 80) +
        'px';
    }
    if (tbodyLeftItemRef?.current) {
      tbodyLeftItemRef.current.style.top = -e.target.scrollTop + 'px';
    }
  };

  // 监听滑动开始
  const onTouchStart = (e) => {
    setStartX(e.touches[0].pageX); // 记录初始X位置
    setStartY(e.touches[0].pageY); // 记录初始Y位置
  };

  // 监听滑动移动
  const onTouchMove = (e) => {
    setIsMove(true);
    setEndX(e.touches[0].pageX); // 监听滑动最终结束的X位置
    setEndY(e.touches[0].pageY); // 监听滑动最终结束的Y位置

    // 判断移动方向
    const X = e.touches[0].pageX - startX;
    const Y = e.touches[0].pageY - startY;
    // 判断是否移动还是点击
    if (tbodyRef?.current) {
      if (X > 0 && Math.abs(X) > Math.abs(Y)) {
        // 向右
        console.log('向右');
        tbodyRef.current.style['overflowY'] = 'hidden';
        tbodyRef.current.style['overflowX'] = 'auto';
      } else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
        // 向左
        console.log('向左');
        tbodyRef.current.style['overflowY'] = 'hidden';
        tbodyRef.current.style['overflowX'] = 'auto';
      } else if (Y > 0 && Math.abs(Y) > Math.abs(X)) {
        // 向下
        console.log('向下');
        tbodyRef.current.style['overflowX'] = 'hidden';
        tbodyRef.current.style['overflowY'] = 'auto';
      } else if (Y < 0 && Math.abs(Y) > Math.abs(X)) {
        // 向上
        console.log('向上');
        tbodyRef.current.style['overflowX'] = 'hidden';
        tbodyRef.current.style['overflowY'] = 'auto';
      } else {
        // 没有
        // console.log("没有");
      }
    } else {
      // console.log("没有");
    }
  };

  const syncTheadHeight = (bottomDomHeight: number) => {
    // 二维高度数组
    let theadHeightList: number[][] = [];

    // 左侧固定的两个 thead 列 集合
    const theadLeftItems = document.querySelectorAll(`.${styles.theadLeftItem}`);
    const theadLeftItemHeights: number[] = [];
    theadLeftItems.forEach((childItem) => {
      theadLeftItemHeights.push((childItem as HTMLDivElement).offsetHeight);
    });
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadLeftItemHeights, 1)];

    // 右侧动态的 thead 列 集合
    const theadRightItems = document.querySelectorAll(`.${styles.theadRightItem}`);
    const theadRightItemHeights: number[] = [];
    theadRightItems.forEach((childItem) => {
      theadRightItemHeights.push((childItem as HTMLDivElement).offsetHeight);
    });
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadRightItemHeights, 1)];
    console.log('theadHeightList', theadHeightList);

    // 获取 thead 每一行的最大高度集合
    let theadMaxHeightList: number[] = Array(1).fill(0);
    theadHeightList.forEach((theadHeightItem: number[]) => {
      theadHeightItem.forEach((childTheadHeightItem: number, childIndex: number) => {
        theadMaxHeightList[childIndex] = Math.max(
          theadMaxHeightList[childIndex],
          childTheadHeightItem
        );
      });
    });
    console.log('theadMaxHeightList', theadMaxHeightList);

    // 获取整个 thead 高度
    const theadMaxHeight = theadMaxHeightList.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    // 给如下2个节点设置对应的 margin-top
    (document.querySelector(`.${styles.tbody}`) as HTMLDivElement).style.setProperty(
      'margin-top',
      `${theadMaxHeight}px`
    );
    (document.querySelector(`.${styles.tbody}`) as HTMLDivElement).style.setProperty(
      'height',
      `calc(100vh - ${bottomDomHeight + theadMaxHeight}px)`
    );
    (document.querySelector(`.${styles.tbodyLeftWrap}`) as HTMLDivElement).style.setProperty(
      'margin-top',
      `${theadMaxHeight}px`
    );

    // 给每一行设置最大高度
    document.querySelectorAll(`.${styles.theadLeftItems}`).forEach((item) => {
      item.querySelectorAll(`.${styles.theadLeftItem}`).forEach((childItem, childIndex: number) => {
        (childItem as HTMLDivElement).style.setProperty(
          'height',
          `${theadMaxHeightList[childIndex]}px`
        );
      });
    });
    document.querySelectorAll(`.${styles.theadRightItems}`).forEach((item) => {
      item
        .querySelectorAll(`.${styles.theadRightItem}`)
        .forEach((childItem, childIndex: number) => {
          (childItem as HTMLDivElement).style.setProperty(
            'height',
            `${theadMaxHeightList[childIndex]}px`
          );
        });
    });
  };

  const syncTbodyHeight = (num: number) => {
    // 二维高度数组
    let tbodyHeightList: number[][] = [];

    // 左侧固定的两个 tbody 列 集合
    const tbodyLeftItems = document.querySelectorAll(`.${styles.tbodyLeftItem}`);
    const tbodyLeftItemHeights: number[] = [];
    tbodyLeftItems.forEach((childItem) => {
      tbodyLeftItemHeights.push((childItem as HTMLDivElement).offsetHeight);
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyLeftItemHeights, num)];

    // 右侧动态的 tbody 列 集合
    const tbodyRightItems = document.querySelectorAll(`.${styles.tbodyRightItem}`);
    const tbodyRightItemHeights: number[] = [];
    tbodyRightItems.forEach((childItem) => {
      tbodyRightItemHeights.push((childItem as HTMLDivElement).offsetHeight);
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyRightItemHeights, num)];
    console.log('tbodyHeightList', tbodyHeightList);

    // 获取 tbody 每一行的最大高度集合
    let tbodyMaxHeightList: number[] = Array(num).fill(0);
    tbodyHeightList.forEach((tbodyHeightItem: number[]) => {
      tbodyHeightItem.forEach((childTbodyHeightItem: number, childIndex: number) => {
        tbodyMaxHeightList[childIndex] = Math.max(
          tbodyMaxHeightList[childIndex],
          childTbodyHeightItem
        );
      });
    });
    console.log('tbodyMaxHeightList', tbodyMaxHeightList);

    // 给每一行设置最大高度
    document.querySelectorAll(`.${styles.tbodyLeftItems}`).forEach((item) => {
      item.querySelectorAll(`.${styles.tbodyLeftItem}`).forEach((childItem, childIndex: number) => {
        (childItem as HTMLDivElement).style.setProperty(
          'height',
          `${tbodyMaxHeightList[childIndex]}px`
        );
      });
    });
    document.querySelectorAll(`.${styles.tbodyRightItems}`).forEach((item) => {
      item
        .querySelectorAll(`.${styles.tbodyRightItem}`)
        .forEach((childItem, childIndex: number) => {
          (childItem as HTMLDivElement).style.setProperty(
            'height',
            `${tbodyMaxHeightList[childIndex]}px`
          );
        });
    });
  };

  useDeepCompareEffect(() => {
    syncTheadHeight(bottomHeight);
    syncTbodyHeight(notStepsList.length);
  }, [notStepsList, bottomHeight]);

  return (
    <PageScaffold
      pageStatus={notStepsList.length > 0 ? PageStatus.success : PageStatus.empty}
      pageTitle={pageTitle}
      className={styles.wrap}
      content={
        <>
          <div className={styles.table}>
            <div className={styles.thead}>
              <div className={styles.theadLeft}>
                <div className={styles.theadLeftItems}>
                  <div className={styles.theadLeftItem}>我去32332</div>
                </div>
              </div>
              <div className={styles.theadRight} ref={theadRightRef}>
                <div className={styles.theadRightWrap}>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>通用名称</div>
                  </div>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>规格</div>
                  </div>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>3333厂家</div>
                  </div>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>开票价</div>
                  </div>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>平均零售价</div>
                  </div>
                  <div className={styles.theadRightItems}>
                    <div className={styles.theadRightItem}>近30天销售</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles.tbody}
              onScroll={scrollEvent}
              ref={tbodyRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
            >
              <div className={styles.tbodyLeft} ref={tbodyLeftRef}>
                <div className={styles.tbodyLeftWrap} ref={tbodyLeftItemRef}>
                  <div className={styles.tbodyLeftItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyLeftItem}>
                        {item.我去32332}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.tbodyRight}>
                <div className={styles.tbodyRightWrap}>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div
                        key={item.id}
                        className={styles.tbodyRightItem}
                        style={{ fontWeight: 'bold' }}
                      >
                        {item.commonName || '-'}
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyRightItem}>
                        {item.standard || '-'}
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyRightItem}>
                        {item.manufacturerName || '-'}
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyRightItem}>
                        {ToolUtil.isEmptyValue(item.invoicePrice) ? '-' : item.invoicePrice}
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyRightItem}>
                        {ToolUtil.isEmptyValue(item.retailPrice) ? '-' : item.retailPrice}
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbodyRightItems}>
                    {notStepsList.map((item) => (
                      <div key={item.id} className={styles.tbodyRightItem}>
                        {ToolUtil.isEmptyValue(item.saleThirtyNum) ? '-' : item.saleThirtyNum}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      emptyTip="暂无对比数据"
    ></PageScaffold>
  );
};

export default NotStepTable;
