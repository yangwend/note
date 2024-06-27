/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useCallback, useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { useRequest, useSetState } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { pick } from 'lodash';
import {
  PageStatus,
  NewGoodCreateByFlowTypes,
  IPurchaseItem,
  IStoreGroupTypeItem,
  CommonRes,
} from '@/types';
import { NewGoodCreateByFlowService } from '@/services';
import PageUtils from './utils';

/**
 * 携带参数：openId、processInstanceId、goodsId
 */
export const useAuditCompare = () => {
  const [search] = useSearchParams();
  // 页面url 参数 openId
  const openId = search.get('openId') as string;
  // 页面url 参数 processInstanceId
  const flowId = search.get('processInstanceId') as string;
  // 页面url 参数 goodsId
  const goodsId = search.get('goodsId') as string;

  const [state, setState] = useSetState<{
    pageStatus: PageStatus; // 页面状态
    errorMessage: string; // 失败错误文案

    activeKey: '1' | '2';

    purchaseData: IPurchaseItem[]; // 让他分类数据
    groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
    goodsTypeList: { code: string; name: string }[]; // 配置状态下拉列表
    goodStatusDictList: { dictCode: string; dictName: string }[]; // 让他状态下拉列表
  }>({
    pageStatus: PageStatus.loading,
    errorMessage: '',

    activeKey: '1',
    purchaseData: [],
    groupList: [],
    goodsTypeList: [],
    goodStatusDictList: [],
  });

  // 获取 让他分类数据 && 有门店的门店分组数据 && 让他配置状态下拉列表 && 让他状态下拉列表
  const initData = useCallback(() => {
    // 获取 让他分类数据
    NewGoodCreateByFlowService.purchaseListAll().then((res: CommonRes<IPurchaseItem[]>) => {
      setState({
        purchaseData: res?.data || [],
      });
    });

    // 获取 有门店的门店分组
    NewGoodCreateByFlowService.listStoreGroup().then((data: IStoreGroupTypeItem[]) => {
      setState({
        groupList: data || [],
      });
    });

    // 获取 让他配置状态下拉列表
    NewGoodCreateByFlowService.listGoodsTypeDict().then(
      (res: CommonRes<{ code: string; name: string }[]>) => {
        setState({
          goodsTypeList: res?.data || [],
        });
      }
    );

    // 获取 让他状态下拉列表
    NewGoodCreateByFlowService.dictWithoutCode(['purchaseStatus']).then(
      (res: CommonRes<{ dictCode: string; dictName: string }[]>) => {
        setState({
          goodStatusDictList: res?.data || [],
        });
      }
    );
  }, [setState]);

  // 校验当前登录人是否是当前节点可以操作的人
  const { data: canEdit } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return false;
      }

      try {
        const data = await NewGoodCreateByFlowService.checkCanEdit({
          flowId,
          openId,
        });
        return data || false;
      } catch (error) {
        return false;
      }
    },
    {
      manual: false,
    }
  );

  // 根据 流程id 查询流程基本信息
  const { data: basicInfo } = useRequest(
    async () => {
      if (!flowId) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '流程ID不能为空',
        });
        return undefined;
      }

      try {
        // 获取流程基本信息
        const data = await NewGoodCreateByFlowService.queryBasicInfo({
          flowId,
        });
        return {
          ...(data || {}),
          auditId: data?.id, // 前端转化一下
          dataStatus: data?.dataStatus || NewGoodCreateByFlowTypes.DataStatusEnum.TODO,
        };
      } catch (error) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: (error as any).message,
        });
        return undefined;
      }
    },
    {
      manual: false,
    }
  );

  // 获取 对比数据列表——纯展示
  const { data: notStepsList, run: getCompareNotStepsList } = useRequest(
    async () => {
      if (
        !basicInfo?.auditId ||
        !basicInfo?.applyType ||
        !PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps ||
        !goodsId
      ) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '对比数据加载失败',
        });
        return [];
      }

      try {
        const data = await NewGoodCreateByFlowService.getListCompareBasic({
          auditId: basicInfo?.auditId,
          goodsId,
          compareType: '2',
        });

        setState({
          pageStatus: PageStatus.success,
          errorMessage: '',
        });

        return data || [];
      } catch (error) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: (error as any).message,
        });
        return [];
      }
    },
    {
      manual: true,
    }
  );

  // 信息信息信息审批时，根据 信息让他id 获取需要展示哪些 tab
  const { data: tabInfo, run: getCompareTabsInfo } = useRequest(
    async () => {
      if (
        !basicInfo?.auditId ||
        !basicInfo?.applyType ||
        !PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps ||
        !goodsId
      ) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '对比数据加载失败',
        });
        return {
          firstTabShow: false,
          secTabShow: false,
        };
      }

      try {
        const data = await NewGoodCreateByFlowService.getCompareTabsInfo({
          auditId: basicInfo?.auditId,
          goodsId,
        });

        setState({
          pageStatus: PageStatus.success,
          errorMessage: '',
        });

        return {
          firstTabShow: data?.hasPtcn ?? false,
          secTabShow: data?.hasGoodsType ?? false,
        };
      } catch (error) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: (error as any).message,
        });
        return {
          firstTabShow: false,
          secTabShow: false,
        };
      }
    },
    {
      manual: true,
    }
  );

  // 获取 让他分类和让他状态审批 列表数据
  const {
    data: firstList,
    loading: firstLoading,
    run: getFirstTabList,
    mutate: mutateFirstList,
  } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !tabInfo?.firstTabShow || !goodsId) {
        return [];
      }

      try {
        const data = await NewGoodCreateByFlowService.getAuditComparePurchaseInfo({
          auditId: basicInfo?.auditId,
          goodsId,
        });

        return data || [];
      } catch (error) {
        return [];
      }
    },
    {
      manual: true,
    }
  );

  // 获取 配置状态审批 列表数据
  const {
    data: secList,
    loading: secLoading,
    run: getSecTabList,
    mutate: mutateSecList,
  } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !tabInfo?.secTabShow || !goodsId) {
        return [];
      }

      try {
        const data = await NewGoodCreateByFlowService.getListCompareType(
          basicInfo?.auditId,
          goodsId
        );

        return data || [];
      } catch (error) {
        return [];
      }
    },
    {
      manual: true,
    }
  );

  // 保存（两个接口都调用）
  const { loading: saveLoading, run: handleSave } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !goodsId) {
        return;
      }

      try {
        if (tabInfo?.firstTabShow) {
          await NewGoodCreateByFlowService.updateAuditComparePurchaseInfo(
            (firstList || []).map((firstItem) => ({
              ...pick(firstItem, [
                'id',
                'goodsId',
                'dataType',
                '我去32332',
                'auditPurchaseCode',
                'auditGoodsStatus',
              ]),
            }))
          );
        }

        if (tabInfo?.secTabShow) {
          await NewGoodCreateByFlowService.updateFlowCompareType(
            (secList || []).map((secItem) => ({
              ...pick(secItem, [
                'id',
                'goodsId',
                'dataType',
                '我去32332',
                'auditGoodsType',
                'auditGroupCodeList',
              ]),
            }))
          );
        }

        Toast.show({
          icon: 'success',
          content: '保存成功',
        });
        getFirstTabList();
        getSecTabList();
      } catch (error) {
        console.log('error->', error);
      }
    },
    {
      manual: true,
    }
  );

  // tab 切换
  const onTabChange = useCallback(
    (key: string) => {
      setState({
        activeKey: key as '1' | '2',
      });
    },
    [setState]
  );

  // 返回
  const onBack = useCallback(() => {
    window.history.go(-1);
  }, []);

  // 保存
  const onSave = useCallback(() => {
    if (!canEdit) {
      return;
    }

    handleSave();
  }, [canEdit, handleSave]);

  useEffect(() => {
    if (
      basicInfo?.applyType &&
      PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps
    ) {
      // 获取 让他分类数据 && 有门店的门店分组数据 && 让他配置状态下拉列表 && 让他状态下拉列表
      initData();
    }
  }, [basicInfo?.applyType, initData]);

  useEffect(() => {
    if (
      basicInfo?.auditId &&
      basicInfo?.applyType &&
      PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps &&
      goodsId
    ) {
      // 获取 让他分类和让他状态审批 tab info
      getCompareTabsInfo();
    } else if (
      basicInfo?.auditId &&
      basicInfo?.applyType &&
      PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps &&
      goodsId
    ) {
      // 获取 对比数据列表——纯展示
      getCompareNotStepsList();
    }
  }, [
    basicInfo?.auditId,
    basicInfo?.applyType,
    goodsId,
    getCompareNotStepsList,
    getCompareTabsInfo,
  ]);

  useEffect(() => {
    if (basicInfo?.auditId && tabInfo?.firstTabShow && goodsId) {
      getFirstTabList();
    }
  }, [basicInfo?.auditId, tabInfo?.firstTabShow, goodsId, getFirstTabList]);

  useEffect(() => {
    if (basicInfo?.auditId && tabInfo?.secTabShow && goodsId) {
      getSecTabList();
    }
  }, [basicInfo?.auditId, tabInfo?.secTabShow, goodsId, getSecTabList]);

  const notStepTableProps = useMemo(
    () => ({
      notStepsList: notStepsList || [],
    }),
    [notStepsList]
  );

  const stepTabsProps = useMemo(
    () => ({
      purchaseData: state.purchaseData,
      groupList: state.groupList,
      goodsTypeList: state.goodsTypeList,
      goodStatusDictList: state.goodStatusDictList,

      canEdit: canEdit || false,

      firstList: firstList || [],
      firstLoading: firstLoading || false,
      secList: secList || [],
      secLoading: secLoading || false,

      activeKey: state.activeKey,

      tabInfo,

      mutateFirstList,
      mutateSecList,
      onTabChange,
    }),
    [
      state.purchaseData,
      state.groupList,
      state.goodsTypeList,
      state.goodStatusDictList,

      canEdit,

      firstList,
      firstLoading,
      secList,
      secLoading,

      state.activeKey,

      tabInfo,

      mutateFirstList,
      mutateSecList,
      onTabChange,
    ]
  );

  return {
    pageTitle: basicInfo?.applyName || 'OA信息信息审批',
    pageStatus: state.pageStatus,
    errorMessage: state.errorMessage,
    canEdit: canEdit || false,
    basicInfo,
    tabInfo,
    notStepTableProps,
    stepTabsProps,
    saveLoading: saveLoading || false,
    onBack,
    onSave,
  };
};
