import { FC, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSetState } from 'ahooks';
import { Toast, Popup, InputRef, Popover, PopoverRef } from 'antd-mobile';
import BigNumber from 'bignumber.js';
import FixedTableWithVertical from '../FixedTableWithVertical/index1';
import { IListItem, IStoreListItem } from '../../types';
import GoodsRuleConfigApproveService from '../../services';
import styles from './index1.module.scss';

interface IProps {
  record: IListItem;
  flowId: string; // 流程id

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度
}

const placeholderText: { [key: string]: string } = {
  storeCode: '请输入门门门门',
  storeName: '请输入门门名称',
};

const StoreViewer: FC<IProps> = ({ record, flowId, ...restProps }) => {
  const inputRef = useRef<InputRef>(null);
  const popoverMenuRef = useRef<PopoverRef>(null);

  const fetchLoading = useRef<boolean>(false); // 分页加载中

  const [state, setState] = useSetState<{
    dataSource: IStoreListItem[]; // 门店数据
    isSearch: boolean; // 是否处于搜索中，非第一次加载则置为 true

    open: boolean; // 门店列表弹窗

    selected: 'storeCode' | 'storeName'; // 下拉选项
    searchInputValue: string; // 搜索值
    placeholder: string; // 搜索框占位

    isShowDrop: boolean; // 是否展示下拉控件

    listHeight: number; // 表格高度
  }>({
    dataSource: [],
    isSearch: false,

    open: false,

    selected: 'storeCode',
    searchInputValue: '',
    placeholder: placeholderText.storeCode,

    isShowDrop: false,

    listHeight: 499,
  });

  // 获取门店列表
  const getList = async () => {
    if (!flowId) {
      Toast.show('流程ID不能为空');
      return;
    }

    if (fetchLoading.current) {
      return;
    }

    const toastIndex = Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 1000,
    });
    fetchLoading.current = true;

    try {
      const data = await GoodsRuleConfigApproveService.getStoreByFlowId({
        [state.selected]: state.searchInputValue, // 查询条件
        page: 1,
        rows: 10000, // 默认查1万条，不走分页
        flowId, // 流程实例编码，必填
        goodsCode: record.goodsCode, // 商品编码，必填
        lotNumber: record.lotNumber, // 批号,有则必填
        companyCode: record.legalCompanyCode, // 公司编码，必填
        electWareFlag: record.electWareFlag, // 是否含电商仓
      });

      const { records = [] } = data;

      // 注意！涉及到 “基于旧值的计算”，都需要取 prev 来获取最新的旧值
      setState((prev) => {
        const newState = {
          ...prev,
          dataSource: [...(records || [])],
          isSearch: true,
        };
        return newState;
      });
    } catch (error) {
      setState((prev) => {
        const newState = {
          ...prev,
          dataSource: [],
          isSearch: true,
        };
        return newState;
      });
    } finally {
      fetchLoading.current = false;
      toastIndex.close();
    }
  };

  useEffect(() => {
    if (flowId && state.open) {
      // 每次打开弹窗，获取第一页数据
      getList();
    } else if (!state.open) {
      setState({
        dataSource: [],
        isSearch: false,

        selected: 'storeCode',
        searchInputValue: '',
        placeholder: placeholderText.storeCode,

        isShowDrop: false,
      });

      fetchLoading.current = false;
      popoverMenuRef?.current?.hide();
    }
  }, [flowId, state.open, setState]);

  const onOpen = () => {
    setState({
      open: true,
    });
  };

  const onClose = () => {
    setState({
      open: false,
    });
  };

  const tableProps = useMemo(
    () => ({
      rowKey: 'storeCode' as string,
      list: state.dataSource,
    }),
    [state.dataSource]
  );

  const columns: any[] = [];

  useEffect(() => {
    if (state.open && restProps.clientHeight > 0) {
      // 获取顶部元素的高度
      const topDomHeight =
        (document.querySelector(`.${styles.top}`) as HTMLDivElement)?.offsetHeight ?? 101;
      // 公式：Math.ceil(667 * 0.9 - 101)
      setState({
        listHeight: Math.ceil(
          +new BigNumber(restProps.clientHeight).times(0.9).minus(topDomHeight)
        ),
      });
    } else {
      setState({
        listHeight: 499,
      });
    }
  }, [restProps.clientHeight, state.open]);

  return (
    <FixedTableWithVertical
      {...tableProps}
      className={styles.table}
      columns={columns}
      {...restProps}
      listHeight={state.listHeight}
      theadHeight={40}
      itemSize={(index: number) => {
        const listItem = state.dataSource[index] as IStoreListItem;
        const isTooLong =
          listItem.storeCode.length > 4 ||
          listItem.storeAbbreviation.length > 6 ||
          listItem.propertyOwnershipCode.length > 4 ||
          listItem.cityName.length > 4 ||
          listItem.storeStatus.length > 4;

        return isTooLong ? 50 : 32;
      }}
    />
  );
};

export default StoreViewer;
