import { useMemo, useState } from 'react';
import { useAsyncEffect, useSetState, useTitle } from 'ahooks';
import { Toast } from 'antd-mobile';
import { useSearchParams } from 'react-router-dom';
import { MessageGoodsTypes, INormalSearchBarProps } from '@/types';
import { MessageGoodsService } from '@/services';
import { actions, placeholderText } from '@/constant/messageGoods';

const useGoodsList = () => {
  useTitle('谢谢谢谢谢');

  const [search] = useSearchParams();
  // 页面url 参数 noticeId
  const noticeId = search.get('noticeId') as string;

  const [state, setState] = useSetState<{
    searchInputValue: string;
    selected: string;
    placeholder: string;
  }>({
    searchInputValue: '',
    selected: 'goodsCode',
    placeholder: placeholderText.goodsCode,
  });
  const [goodsList, setGoodsList] = useState<MessageGoodsTypes.IEliminateGoodsItem[]>([]);
  const [goodsHasMore, setGoodsHasMore] = useState<boolean>(false);
  const [isShowDrop, setIsShowDrop] = useState<boolean>(false);
  const [listParam, setListParam] = useState<MessageGoodsTypes.IGoodsListParam>({
    pageCurrent: 1,
    pageLimit: 10,
    goodsCode: '', // 商品编码
    goodsDesc: '', // 商品描述
  });

  useAsyncEffect(async () => {
    // 默认进来获取第1页数据
    getGoodList(listParam);
  }, []);

  /***
   * 搜索
   */
  const searchBarProps: INormalSearchBarProps = useMemo(
    () => ({
      onSet: (value: string) => {
        setState({
          ...state,
          searchInputValue: value,
        });
      },
      onSearch: () => {
        const param: MessageGoodsTypes.IGoodsListParam = {
          ...listParam,
          pageCurrent: 1,
          goodsCode: '',
          goodsDesc: '',
          [state.selected]: state.searchInputValue,
        };
        getGoodList(param);
      },
      searchInputValue: state.searchInputValue,
      showSearchIcon: false,
      showSearchText: true,
      showScanIcon: false,
      placeholder: state.placeholder,
      onClear: () => {
        setState({
          ...state,
          searchInputValue: '',
        });
      },
    }),
    [state.searchInputValue, state.placeholder, state.selected]
  );

  const dropMenuProps = useMemo(
    () => ({
      isShowDrop: isShowDrop,
      actions: Object.keys(actions).map((key) => ({ key: key, text: actions[key] })),
      onAction: (node: any) => {
        const param: MessageGoodsTypes.IGoodsListParam = {
          ...listParam,
          pageCurrent: 1,
          goodsCode: '',
          goodsDesc: '',
          [node.key]: state.searchInputValue,
        };
        setState({
          ...state,
          selected: node.key,
          placeholder: placeholderText[node.key],
        });
        getGoodList(param);
      },
      onVisibleChange: (visible: boolean) => {
        setIsShowDrop(visible);
      },
      dropText: actions[state.selected],
    }),
    [isShowDrop, state.selected, state.searchInputValue]
  );

  const getGoodList = async (params: MessageGoodsTypes.IGoodsListParam) => {
    if (!noticeId) {
      Toast.show('xxxx不能为空');
      return;
    }

    const res = await Promise.all([
      MessageGoodsService.listEliminateGoods(
        {
          noticeId,
          goodsCode: params.goodsCode,
          goodsDesc: params.goodsDesc,
        },
        {
          page: params.pageCurrent,
          rows: params.pageLimit,
        }
      ),
      MessageGoodsService.listEliminateCount({
        noticeId,
        goodsCode: params.goodsCode,
        goodsDesc: params.goodsDesc,
      }),
    ]);
    const result = res?.[0] || [];
    const totalSize = Number(res?.[1] || 0);

    setListParam({ ...params, pageCurrent: params.pageCurrent + 1 });
    setGoodsList(params.pageCurrent > 1 ? [...goodsList, ...result] : [...result]);
    setGoodsHasMore(params.pageCurrent * params.pageLimit < totalSize);
  };

  const commonListViewProps = useMemo(() => {
    return {
      keyExtra: 'goodsId', // 唯一键
      dataSource: goodsList,
      hasMore: goodsHasMore,
      loadMore: () => getGoodList({ ...listParam, pageCurrent: listParam.pageCurrent }),
    };
  }, [goodsHasMore, goodsList]);

  return {
    searchBarProps,
    commonListViewProps,
    dropMenuProps,
  };
};
export default useGoodsList;
