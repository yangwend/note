/* eslint-disable spellcheck/spell-checker */
import { FC, useEffect, useRef, useState } from 'react';
import { PickerValue } from 'antd-mobile/es/components/picker';
import { IPurchaseItem, NewGoodCreateByFlowTypes } from '@/types';
import { ToolUtil } from '@/utils';
import PurchaseCascader from '../../PurchaseCascader';
import GoodsStatusPicker from '../../GoodsStatusPicker';
import PageUtils from '../../../utils';
import styles from './index.module.scss';

// todo 自定义组件，高度获取有问题

interface IProps {
  purchaseData: IPurchaseItem[];
  goodStatusDictList: { dictCode: string; dictName: string }[]; // 商品状态下拉列表

  canEdit: boolean;

  firstList: NewGoodCreateByFlowTypes.ICompareItem[];
  firstLoading: boolean;

  bottomHeight: number;

  mutateFirstList: (list: NewGoodCreateByFlowTypes.ICompareItem[]) => void;
}

const FirstTable: FC<IProps> = ({
  purchaseData,
  goodStatusDictList,

  canEdit,

  firstList,
  firstLoading,

  bottomHeight,

  mutateFirstList,
}) => {
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
        (document.querySelector(`.${styles.theadLeft}`)?.offsetWidth || 200) +
        'px';
    }
    if (tbodyLeftItemRef?.current) {
      tbodyLeftItemRef.current.style.top = -e.target.scrollTop + 'px';
    }
  };

  // 监听滑动开始
  const onTouchStart = (e) => {
    console.log(e.touches[0].startX, e.touches[0].startY);
    setStartX(e.touches[0].pageX); // 记录初始X位置
    setStartY(e.touches[0].pageY); // 记录初始Y位置
  };

  // 监听滑动移动
  const onTouchMove = (e) => {
    console.log(e.touches[0].startX, e.touches[0].startY);
    setIsMove(true);
    setEndX(e.touches[0].pageX); // 监听滑动最终结束的X位置
    setEndY(e.touches[0].pageY); // 监听滑动最终结束的Y位置

    // 判断移动方向
    let X = e.touches[0].pageX - startX;
    let Y = e.touches[0].pageY - startY;
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
      theadLeftItemHeights.push(childItem.offsetHeight);
    });
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadLeftItemHeights, 4)];

    // 右侧动态的 thead 列 集合
    const theadRightItems = document.querySelectorAll(`.${styles.theadRightItem}`);
    const theadRightItemHeights: number[] = [];
    theadRightItems.forEach((childItem) => {
      theadRightItemHeights.push(childItem.offsetHeight);
    });
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadRightItemHeights, 4)];
    console.log('第一个 theadHeightList', theadHeightList);

    // 获取 thead 每一行的最大高度集合
    let theadMaxHeightList: number[] = Array(4).fill(0);
    theadHeightList.forEach((theadHeightItem: number[]) => {
      theadHeightItem.forEach((childTheadHeightItem: number, childIndex: number) => {
        theadMaxHeightList[childIndex] = Math.max(
          theadMaxHeightList[childIndex],
          childTheadHeightItem
        );
      });
    });
    console.log('第一个 theadMaxHeightList', theadMaxHeightList);

    // 获取整个 thead 高度
    const theadMaxHeight = theadMaxHeightList.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    // 给如下2个节点设置对应的 margin-top
    (document.querySelector(`.${styles.tbody}`) as HTMLDivElement).style.setProperty(
      'margin-top',
      `${theadMaxHeight}px`
    );
    const tabHeaderHeight = document.querySelector(`.adm-tabs-header`)?.offsetHeight ?? 44;
    (document.querySelector(`.${styles.tbody}`) as HTMLDivElement).style.setProperty(
      'height',
      `calc(100vh - ${bottomDomHeight + tabHeaderHeight + theadMaxHeight}px)`
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

  const syncTbodyHeight = () => {
    // 二维高度数组
    let tbodyHeightList: number[][] = [];

    // 左侧固定的两个 tbody 列 集合
    const tbodyLeftItems = document.querySelectorAll(`.${styles.tbodyLeftItem}`);
    const tbodyLeftItemHeights: number[] = [];
    tbodyLeftItems.forEach((childItem) => {
      tbodyLeftItemHeights.push(childItem.offsetHeight);
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyLeftItemHeights, 27)];

    // 右侧动态的 tbody 列 集合
    const tbodyRightItems = document.querySelectorAll(`.${styles.tbodyRightItem}`);
    const tbodyRightItemHeights: number[] = [];
    tbodyRightItems.forEach((childItem) => {
      tbodyRightItemHeights.push(childItem.offsetHeight);
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyRightItemHeights, 27)];
    console.log('第一个 tbodyHeightList', tbodyHeightList);

    // 获取 tbody 每一行的最大高度集合
    let tbodyMaxHeightList: number[] = Array(27).fill(0);
    tbodyHeightList.forEach((tbodyHeightItem: number[]) => {
      tbodyHeightItem.forEach((childTbodyHeightItem: number, childIndex: number) => {
        tbodyMaxHeightList[childIndex] = Math.max(
          tbodyMaxHeightList[childIndex],
          childTbodyHeightItem
        );
      });
    });
    console.log('第一个 tbodyMaxHeightList', tbodyMaxHeightList);

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

  useEffect(() => {
    syncTheadHeight(bottomHeight);
    syncTbodyHeight();
  }, [firstList, endX, endY, isMove, bottomHeight]);

  return (
    <>
      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles.theadLeft}>
            <div className={styles.theadLeftItems}>
              <div className={styles.theadLeftItem}>说明</div>
              <div className={styles.theadLeftItem}>通用名称</div>
              <div className={styles.theadLeftItem}>规格</div>
              <div className={styles.theadLeftItem}>生产厂家</div>
            </div>
            <div className={`${styles.theadLeftItems} ${styles.theadLeftItems1}`}>
              <div className={styles.theadLeftItem}>目标品种</div>
              <div className={styles.theadLeftItem} style={{ fontWeight: 'bold' }}>
                {firstList[0].commonName || '-'}
              </div>
              <div className={styles.theadLeftItem}>{firstList[0].standard || '-'}</div>
              <div className={styles.theadLeftItem}>{firstList[0].manufacturerName || '-'}</div>
            </div>
          </div>
          <div className={styles.theadRight} ref={theadRightRef}>
            <div className={styles.theadRightWrap}>
              {firstList.slice(1).map((item) => (
                <div key={item.id} className={styles.theadRightItems}>
                  <div className={styles.theadRightItem}>对比品种</div>
                  <div className={styles.theadRightItem} style={{ fontWeight: 'bold' }}>
                    {item.commonName || '-'}
                  </div>
                  <div className={styles.theadRightItem}>{item.standard || '-'}</div>
                  <div className={styles.theadRightItem}>{item.manufacturerName || '-'}</div>
                </div>
              ))}
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
                <div className={styles.tbodyLeftItem}>商品编码</div>
                <div className={styles.tbodyLeftItem}>当前采购分类</div>
                <div className={styles.tbodyLeftItem}>当前商品状态</div>
                <div className={styles.tbodyLeftItem}>申请调整采购分类</div>
                <div className={styles.tbodyLeftItem}>申请调整商品状态</div>
                <div className={styles.tbodyLeftItem}>采购分类审批意见</div>
                <div className={styles.tbodyLeftItem}>商品状态审批意见</div>
                <div className={styles.tbodyLeftItem}>开票价</div>
                <div className={styles.tbodyLeftItem}>后台返利</div>
                <div className={styles.tbodyLeftItem}>底价(减返利)</div>
                <div className={styles.tbodyLeftItem}>标准零售价</div>
                <div className={styles.tbodyLeftItem}>平均零售价</div>
                <div className={styles.tbodyLeftItem}>前后台毛利额</div>
                <div className={styles.tbodyLeftItem}>前后台毛利率</div>
                <div className={styles.tbodyLeftItem}>月销售数量</div>
                <div className={styles.tbodyLeftItem}>最小含量进价</div>
                <div className={styles.tbodyLeftItem}>最小含量售价</div>
                <div className={styles.tbodyLeftItem}>每天最高服用量</div>
                <div className={styles.tbodyLeftItem}>每天服用金额</div>
                <div className={styles.tbodyLeftItem}>每天服用成本额</div>
                <div className={styles.tbodyLeftItem}>单盒服用天数</div>
                <div className={styles.tbodyLeftItem}>疗程</div>
                <div className={styles.tbodyLeftItem}>评审会通过率</div>
                <div className={styles.tbodyLeftItem}>成分及组方</div>
                <div className={styles.tbodyLeftItem}>引进理由</div>
                <div className={styles.tbodyLeftItem}>功能主治</div>
                <div className={styles.tbodyLeftItem}>卖点说明</div>
              </div>
              <div className={`${styles.tbodyLeftItems} ${styles.tbodyLeftItems1}`}>
                <div className={styles.tbodyLeftItem}>{firstList[0].goodsCode || '/'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].purchaseName || '-'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].goodsStatusName || '-'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].updatePurchaseName || '-'}</div>
                <div className={styles.tbodyLeftItem}>
                  {firstList[0].updateGoodsStatusName || '-'}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {canEdit ? (
                    <PurchaseCascader
                      purchaseData={purchaseData}
                      disabled={false}
                      value={
                        firstList[0].auditPurchaseCode
                          ? PageUtils.buildRelateKeys(
                              firstList[0].auditPurchaseCode,
                              purchaseData,
                              'purchaseCode',
                              'parentPurchaseCode'
                            )
                          : []
                      }
                      onChange={(val?: PickerValue[]) => {
                        const values = (val || []).filter((valItem) => !!valItem) as string[];
                        const newList = firstList.map((firstItem) => {
                          if (firstItem.id === firstList[0].id) {
                            return {
                              ...firstItem,
                              auditPurchaseCode:
                                values.length > 0 ? values[values.length - 1] : undefined,
                            };
                          }
                          return firstItem;
                        });
                        mutateFirstList(newList);
                      }}
                    />
                  ) : (
                    firstList[0].auditPurchaseName || '-'
                  )}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {firstList[0].auditGoodsStatusName || '-'}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].invoicePrice)
                    ? '-'
                    : firstList[0].invoicePrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].backReturnRate)
                    ? '-'
                    : firstList[0].backReturnRate}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].basePrice) ? '-' : firstList[0].basePrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].standardRetailPrice)
                    ? '-'
                    : firstList[0].standardRetailPrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].retailPrice) ? '-' : firstList[0].retailPrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].grossMoney) ? '-' : firstList[0].grossMoney}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].grossRate)
                    ? '-'
                    : `${firstList[0].grossRate}%`}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].monthSaleNum)
                    ? '-'
                    : firstList[0].monthSaleNum}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].minComePrice)
                    ? '-'
                    : firstList[0].minComePrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].minSalePrice)
                    ? '-'
                    : firstList[0].minSalePrice}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].dayMax) ? '-' : firstList[0].dayMax}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].dayMoney) ? '-' : firstList[0].dayMoney}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].dayCost) ? '-' : firstList[0].dayCost}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].customerCanUseDays)
                    ? '-'
                    : firstList[0].customerCanUseDays}
                </div>
                <div className={styles.tbodyLeftItem}>{firstList[0].treatmentCourse || '-'}</div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(firstList[0].passRate) ? '-' : `${firstList[0].passRate}%`}
                </div>
                <div className={styles.tbodyLeftItem}>{firstList[0].compositionFormula || '-'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].importReason || '-'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].functionsIndicated || '-'}</div>
                <div className={styles.tbodyLeftItem}>{firstList[0].saleDesc || '-'}</div>
              </div>
            </div>
          </div>
          <div className={styles.tbodyRight}>
            <div className={styles.tbodyRightWrap}>
              {firstList.slice(1).map((item) => (
                <div key={item.id} className={styles.tbodyRightItems}>
                  <div className={styles.tbodyRightItem}>{item.goodsCode || '/'}</div>
                  <div className={styles.tbodyRightItem}>{item.purchaseName || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.goodsStatusName || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.updatePurchaseName || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.updateGoodsStatusName || '-'}</div>
                  <div className={styles.tbodyRightItem}>
                    {canEdit ? (
                      <PurchaseCascader
                        purchaseData={purchaseData}
                        disabled={false}
                        value={
                          item.auditPurchaseCode
                            ? PageUtils.buildRelateKeys(
                                item.auditPurchaseCode,
                                purchaseData,
                                'purchaseCode',
                                'parentPurchaseCode'
                              )
                            : []
                        }
                        onChange={(val?: PickerValue[]) => {
                          const values = (val || []).filter((valItem) => !!valItem) as string[];
                          const newList = firstList.map((firstItem) => {
                            if (firstItem.id === item.id) {
                              return {
                                ...firstItem,
                                auditPurchaseCode:
                                  values.length > 0 ? values[values.length - 1] : undefined,
                              };
                            }
                            return firstItem;
                          });
                          mutateFirstList(newList);
                        }}
                      />
                    ) : (
                      item.auditPurchaseName || '-'
                    )}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {item.dataType === '1' ? (
                      item.auditGoodsStatusName || '-'
                    ) : canEdit ? (
                      <GoodsStatusPicker
                        goodStatusDictList={goodStatusDictList}
                        disabled={false}
                        value={item.auditGoodsStatus ? [item.auditGoodsStatus] : []}
                        onChange={(val?: PickerValue[]) => {
                          const values = (val || []).filter((valItem) => !!valItem) as string[];
                          const newList = firstList.map((firstItem) => {
                            if (firstItem.id === item.id) {
                              return {
                                ...firstItem,
                                auditGoodsStatus: values.length > 0 ? values[0] : undefined,
                              };
                            }
                            return firstItem;
                          });
                          mutateFirstList(newList);
                        }}
                      />
                    ) : (
                      item.auditGoodsStatusName || '-'
                    )}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.invoicePrice) ? '-' : item.invoicePrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.backReturnRate) ? '-' : item.backReturnRate}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.basePrice) ? '-' : item.basePrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.standardRetailPrice)
                      ? '-'
                      : item.standardRetailPrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.retailPrice) ? '-' : item.retailPrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.grossMoney) ? '-' : item.grossMoney}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.grossRate) ? '-' : `${item.grossRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.monthSaleNum) ? '-' : item.monthSaleNum}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.minComePrice) ? '-' : item.minComePrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.minSalePrice) ? '-' : item.minSalePrice}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.dayMax) ? '-' : item.dayMax}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.dayMoney) ? '-' : item.dayMoney}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.dayCost) ? '-' : item.dayCost}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.customerCanUseDays) ? '-' : item.customerCanUseDays}
                  </div>
                  <div className={styles.tbodyRightItem}>{item.treatmentCourse || '-'}</div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.passRate) ? '-' : `${item.passRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem}>{item.compositionFormula || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.importReason || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.functionsIndicated || '-'}</div>
                  <div className={styles.tbodyRightItem}>{item.saleDesc || '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstTable;
