/* eslint-disable spellcheck/spell-checker */
import { FC, useMemo, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useSetState, useDeepCompareEffect } from 'ahooks';
import { EditSOutline, CloseCircleOutline } from 'antd-mobile-icons';
import { IStoreGroupTypeItem, NewGoodCreateByFlowTypes } from '@/types';
import { ToolUtil } from '@/utils';
import GoodsTypeModal from '../../GoodsTypeModal';
import PageUtils from '../../../utils';
import styles from './index.module.scss';

interface IProps {
  groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
  goodsTypeList: { code: string; name: string }[]; // 配置状态下拉列表

  canEdit: boolean;

  secList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
  secLoading: boolean;

  bottomHeight: number;

  activeKey: '1' | '2';

  mutateSecList: (list: Partial<NewGoodCreateByFlowTypes.ICompareItem>[]) => void;
}

const SecTable: FC<IProps> = ({
  groupList,
  goodsTypeList,

  canEdit,

  secList,
  secLoading,

  bottomHeight,

  activeKey,

  mutateSecList,
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

  const [state, setState] = useSetState<{
    goodsTypeModalVisible: boolean; // 配置状态审批弹窗显隐
    editRow: Partial<NewGoodCreateByFlowTypes.ICompareItem>; // 操作行
  }>({
    goodsTypeModalVisible: false,
    editRow: {},
  });

  const scrollEvent = (e) => {
    if (theadRightRef?.current) {
      theadRightRef.current.style.left =
        -e.target.scrollLeft +
        ((document.querySelector(`.${styles.theadLeft}`) as HTMLDivElement)?.offsetWidth || 200) +
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
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadLeftItemHeights, 4)];

    // 右侧动态的 thead 列 集合
    const theadRightItems = document.querySelectorAll(`.${styles.theadRightItem}`);
    const theadRightItemHeights: number[] = [];
    theadRightItems.forEach((childItem) => {
      theadRightItemHeights.push((childItem as HTMLDivElement).offsetHeight);
    });
    theadHeightList = [...theadHeightList, ...ToolUtil.getGroupedList(theadRightItemHeights, 4)];
    console.log('第二个 theadHeightList', theadHeightList);

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
    console.log('第二个 theadMaxHeightList', theadMaxHeightList);

    // 获取整个 thead 高度
    const theadMaxHeight = theadMaxHeightList.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    // 给如下2个节点设置对应的 margin-top
    (document.querySelector(`.${styles.tbody}`) as HTMLDivElement).style.setProperty(
      'margin-top',
      `${theadMaxHeight}px`
    );
    const tabHeaderHeight =
      (document.querySelector(`.adm-tabs-header`) as HTMLDivElement)?.offsetHeight ?? 44;
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
    tbodyLeftItems.forEach((childItem, childIndex) => {
      // 注意！由于第5项可能存在子组件渲染，直接获取外层div高度无法拿到真实子组件的高度，故两者取最大来处理
      // TODO:自定义组件，高度设置有问题
      if (childIndex % 17 === 4) {
        const childHeight =
          (childItem.querySelector(`.${styles.goodsTypeInput}`) as HTMLDivElement)?.offsetHeight ??
          0;
        tbodyLeftItemHeights.push(
          Math.max(
            (childItem as HTMLDivElement).offsetHeight,
            childHeight + 1 + +new BigNumber(PageUtils.calDynamicPadding(8)).times(2)
          )
        );
      } else {
        tbodyLeftItemHeights.push((childItem as HTMLDivElement).offsetHeight);
      }
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyLeftItemHeights, 17)];

    // 右侧动态的 tbody 列 集合
    const tbodyRightItems = document.querySelectorAll(`.${styles.tbodyRightItem}`);
    const tbodyRightItemHeights: number[] = [];
    tbodyRightItems.forEach((childItem, childIndex) => {
      // 注意！由于第5项可能存在子组件渲染，直接获取外层div高度无法拿到真实子组件的高度，故两者取最大来处理
      // TODO:自定义组件，高度设置有问题
      if (childIndex % 17 === 4) {
        const childHeight =
          (childItem.querySelector(`.${styles.goodsTypeInput}`) as HTMLDivElement)?.offsetHeight ??
          0;
        tbodyRightItemHeights.push(
          Math.max(
            (childItem as HTMLDivElement).offsetHeight,
            childHeight + 1 + +new BigNumber(PageUtils.calDynamicPadding(8)).times(2)
          )
        );
      } else {
        tbodyRightItemHeights.push((childItem as HTMLDivElement).offsetHeight);
      }
    });
    tbodyHeightList = [...tbodyHeightList, ...ToolUtil.getGroupedList(tbodyRightItemHeights, 17)];
    console.log('第二个 tbodyHeightList', tbodyHeightList);

    // 获取 tbody 每一行的最大高度集合
    let tbodyMaxHeightList: number[] = Array(17).fill(0);
    tbodyHeightList.forEach((tbodyHeightItem: number[]) => {
      tbodyHeightItem.forEach((childTbodyHeightItem: number, childIndex: number) => {
        tbodyMaxHeightList[childIndex] = Math.max(
          tbodyMaxHeightList[childIndex],
          childTbodyHeightItem
        );
      });
    });
    console.log('第二个 tbodyMaxHeightList', tbodyMaxHeightList);

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
    if (activeKey === '2') {
      syncTheadHeight(bottomHeight);
      syncTbodyHeight();
    }
  }, [activeKey, secList, bottomHeight]);

  // 获取 当前配置状态 文案
  const getCurrGroupCodeStr = (
    text: string[],
    record: Partial<NewGoodCreateByFlowTypes.ICompareItem>
  ) => {
    let finalText = '-';
    // 目标3333
    if (record.dataType === '1') {
      if ((text || []).length === 0) {
        finalText = '-';
      } else {
        const names =
          groupList
            .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
            .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
        finalText = `323232：${names.join(',')}`;
      }
    } else {
      // 对比3333
      finalText =
        ToolUtil.getLabelByValue(goodsTypeList, record.goodsType || '', 'code', 'name') || '-';
    }
    return finalText;
  };

  // 获取 申请调整配置状态 文案
  const getUpdateGroupCodeStr = (
    text: string[],
    record: Partial<NewGoodCreateByFlowTypes.ICompareItem>
  ) => {
    let finalText = '-';
    // 目标3333
    if (record.dataType === '1') {
      finalText = '-';
    } else if ((text || []).length === 0) {
      finalText = '-';
    } else {
      const names =
        groupList
          .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
          .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
      finalText = `323232：${names.join(',')}`;
    }
    return finalText;
  };

  // 获取 配置状态审批意见 文案
  const getAuditGroupCodeStr = (
    text: string[],
    record: Partial<NewGoodCreateByFlowTypes.ICompareItem>
  ) => {
    let finalText = '-';
    if ((text || []).length === 0) {
      finalText = '-';
    } else {
      const names =
        groupList
          .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
          .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
      finalText = `323232：${names.join(',')}`;
    }
    return finalText;
  };

  // 渲染 配置状态审批意见 组件
  // （由于组件直接在本组件内编写，不存在子组件渲染的时间差问题，故不需要考虑第一次chooseStr为“请选择”导致渲染不对的情况）
  const renderGoodsTypeInput = (
    text: string[],
    record: Partial<NewGoodCreateByFlowTypes.ICompareItem>
  ) => {
    let chooseStr = '请选择';
    if ((text || []).length > 0) {
      const names =
        groupList
          .filter((groupItem: IStoreGroupTypeItem) => text?.includes(groupItem.groupCode))
          .map((groupItem: IStoreGroupTypeItem) => groupItem.groupName) ?? [];
      chooseStr = `323232：${names.join(',')}`;
    }

    return (
      <div className={styles.goodsTypeInput}>
        <div
          className={`${styles.desc} ${(text || []).length === 0 ? styles.descEmpty : ''}`}
          onClick={() => {
            setState({
              goodsTypeModalVisible: true,
              editRow: record,
            });
          }}
        >
          {chooseStr}
        </div>
        <div className={styles.btnGroup}>
          {(text || []).length > 0 && (
            <CloseCircleOutline
              onClick={() => {
                const newList = (secList || []).map((item) => {
                  if (item.id === record.id) {
                    return {
                      ...item,
                      auditGoodsType: undefined,
                      auditGroupCodeList: [],
                    };
                  }
                  return item;
                });
                mutateSecList(newList);
              }}
              className={styles.closeBtn}
            />
          )}
          <EditSOutline
            onClick={() => {
              setState({
                goodsTypeModalVisible: true,
                editRow: record,
              });
            }}
            color="#55aff4"
            className={styles.editBtn}
          />
        </div>
      </div>
    );
  };

  const goodsTypeModalProps = useMemo(
    () => ({
      title: '配置状态审批',
      goodsTypeList,
      groupList,
      editRow: {
        goodsType: state.editRow.auditGoodsType || 'DAILY_ASK',
        groupCodeList: state.editRow.auditGroupCodeList || [],
      },
      editVisible: state.goodsTypeModalVisible,
      onOk: (data: {
        goodsType?: string; // 配置状态
        groupCodeList?: string[]; // 门店分组
      }) => {
        const newList = secList.map((item) => {
          if (item.id === state.editRow.id) {
            return {
              ...item,
              auditGoodsType: data.goodsType,
              auditGroupCodeList: data.groupCodeList || [],
            };
          }
          return item;
        });
        mutateSecList(newList);
        setState({
          editRow: {},
          goodsTypeModalVisible: false,
        });
      },
      onCancel: () => {
        setState({
          editRow: {},
          goodsTypeModalVisible: false,
        });
      },
    }),
    [
      goodsTypeList,
      groupList,
      state.editRow.auditGoodsType,
      state.editRow.auditGroupCodeList,
      state.goodsTypeModalVisible,
      secList,
      state.editRow.id,
      mutateSecList,
      setState,
    ]
  );

  return (
    <>
      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles.theadLeft}>
            <div className={styles.theadLeftItems}>
              <div className={styles.theadLeftItem}>说明</div>
              <div className={styles.theadLeftItem}>通用名称</div>
              <div className={styles.theadLeftItem}>规格</div>
              <div className={styles.theadLeftItem} style={{ borderBottomColor: '#a5a5a5' }}>
                3333厂家
              </div>
            </div>
            <div className={`${styles.theadLeftItems} ${styles.theadLeftItems1}`}>
              <div className={styles.theadLeftItem}>目标3333</div>
              <div className={styles.theadLeftItem} style={{ fontWeight: 'bold' }}>
                {secList[0].commonName || '-'}
              </div>
              <div className={styles.theadLeftItem}>{secList[0].standard || '-'}</div>
              <div className={styles.theadLeftItem} style={{ borderBottomColor: '#a5a5a5' }}>
                {secList[0].manufacturerName || '-'}
              </div>
            </div>
          </div>
          <div className={styles.theadRight} ref={theadRightRef}>
            <div className={styles.theadRightWrap}>
              {secList.slice(1).map((item) => (
                <div key={item.id} className={styles.theadRightItems}>
                  <div className={styles.theadRightItem}>对比3333</div>
                  <div className={styles.theadRightItem} style={{ fontWeight: 'bold' }}>
                    {item.commonName || '-'}
                  </div>
                  <div className={styles.theadRightItem}>{item.standard || '-'}</div>
                  <div className={styles.theadRightItem} style={{ borderBottomColor: '#a5a5a5' }}>
                    {item.manufacturerName || '-'}
                  </div>
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
                <div className={styles.tbodyLeftItem}>我去32332</div>
                <div className={styles.tbodyLeftItem}>让他状态</div>
                <div className={styles.tbodyLeftItem}>当前配置状态</div>
                <div className={styles.tbodyLeftItem}>申请调整配置状态</div>
                <div className={styles.tbodyLeftItem}>配置状态审批意见</div>
                <div className={styles.tbodyLeftItem}>近60天销售数量</div>
                <div className={styles.tbodyLeftItem}>近60天销售额</div>
                <div className={styles.tbodyLeftItem}>近60天毛利率</div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                >
                  大店
                </div>
                <div className={styles.tbodyLeftItem}>铺货率</div>
                <div className={styles.tbodyLeftItem}>60天动销率</div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                >
                  中店
                </div>
                <div className={styles.tbodyLeftItem}>铺货率</div>
                <div className={styles.tbodyLeftItem}>60天动销率</div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                >
                  小店
                </div>
                <div className={styles.tbodyLeftItem}>铺货率</div>
                <div className={styles.tbodyLeftItem}>60天动销率</div>
              </div>
              <div className={`${styles.tbodyLeftItems} ${styles.tbodyLeftItems1}`}>
                <div className={styles.tbodyLeftItem}>{secList[0].我去32332 || '/'}</div>
                <div className={styles.tbodyLeftItem}>{secList[0].goodsStatusName || '-'}</div>
                <div className={styles.tbodyLeftItem}>
                  {getCurrGroupCodeStr(secList[0].groupCodeList || [], secList[0])}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {getUpdateGroupCodeStr(secList[0].updateGroupCodeList || [], secList[0])}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {canEdit
                    ? renderGoodsTypeInput(secList[0].auditGroupCodeList || [], secList[0])
                    : getAuditGroupCodeStr(secList[0].auditGroupCodeList || [], secList[0])}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].sixtySaleNum) ? '-' : secList[0].sixtySaleNum}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].sixtySaleMoney)
                    ? '-'
                    : secList[0].sixtySaleMoney}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].sixtySaleRate)
                    ? '-'
                    : `${secList[0].sixtySaleRate}%`}
                </div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                ></div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].bigDistributeRate)
                    ? '-'
                    : `${secList[0].bigDistributeRate}%`}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].bigSixtyMoveRate)
                    ? '-'
                    : `${secList[0].bigSixtyMoveRate}%`}
                </div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                ></div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].middleDistributeRate)
                    ? '-'
                    : `${secList[0].middleDistributeRate}%`}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].middleSixtyMoveRate)
                    ? '-'
                    : `${secList[0].middleSixtyMoveRate}%`}
                </div>
                <div
                  className={styles.tbodyLeftItem}
                  style={{ background: '#f2f2f2', fontWeight: 'bold' }}
                ></div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].smallDistributeRate)
                    ? '-'
                    : `${secList[0].smallDistributeRate}%`}
                </div>
                <div className={styles.tbodyLeftItem}>
                  {ToolUtil.isEmptyValue(secList[0].smallSixtyMoveRate)
                    ? '-'
                    : `${secList[0].smallSixtyMoveRate}%`}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tbodyRight}>
            <div className={styles.tbodyRightWrap}>
              {secList.slice(1).map((item) => (
                <div key={item.id} className={styles.tbodyRightItems}>
                  <div className={styles.tbodyRightItem}>{item.我去32332 || '/'}</div>
                  <div className={styles.tbodyRightItem}>{item.goodsStatusName || '-'}</div>
                  <div className={styles.tbodyRightItem}>
                    {getCurrGroupCodeStr(item.groupCodeList || [], item)}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {getUpdateGroupCodeStr(item.updateGroupCodeList || [], item)}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {canEdit
                      ? renderGoodsTypeInput(item.auditGroupCodeList || [], item)
                      : getAuditGroupCodeStr(item.auditGroupCodeList || [], item)}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.sixtySaleNum) ? '-' : item.sixtySaleNum}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.sixtySaleMoney) ? '-' : item.sixtySaleMoney}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.sixtySaleRate) ? '-' : `${item.sixtySaleRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem} style={{ background: '#f2f2f2' }}></div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.bigDistributeRate)
                      ? '-'
                      : `${item.bigDistributeRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.bigSixtyMoveRate)
                      ? '-'
                      : `${item.bigSixtyMoveRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem} style={{ background: '#f2f2f2' }}></div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.middleDistributeRate)
                      ? '-'
                      : `${item.middleDistributeRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.middleSixtyMoveRate)
                      ? '-'
                      : `${item.middleSixtyMoveRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem} style={{ background: '#f2f2f2' }}></div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.smallDistributeRate)
                      ? '-'
                      : `${item.smallDistributeRate}%`}
                  </div>
                  <div className={styles.tbodyRightItem}>
                    {ToolUtil.isEmptyValue(item.smallSixtyMoveRate)
                      ? '-'
                      : `${item.smallSixtyMoveRate}%`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <GoodsTypeModal {...goodsTypeModalProps}></GoodsTypeModal>
    </>
  );
};

export default SecTable;
