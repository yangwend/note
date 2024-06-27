import { useMemo, useCallback, useEffect } from 'react';
import { useRequest, useSetState } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { PageStatus, NewGoodCreateByFlowTypes } from '@/types';
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
  }>({
    pageStatus: PageStatus.loading,
    errorMessage: '',
  });

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

  // 获取 对比数据列表——纯展示（非四步）
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
          pageStatus: (data || []).length > 0 ? PageStatus.success : PageStatus.empty,
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

  // 获取 对比数据 列表数据（四步）
  const { data: firstList, run: getFirstTabList } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !goodsId) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '对比数据加载失败',
        });
        return [];
      }

      try {
        const data = await NewGoodCreateByFlowService.getListCompareDetails(
          basicInfo?.auditId,
          goodsId
        );

        setState({
          pageStatus: (data || []).length > 0 ? PageStatus.success : PageStatus.empty,
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

  useEffect(() => {
    if (
      basicInfo?.auditId &&
      basicInfo?.applyType &&
      PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps &&
      goodsId
    ) {
      // 获取 对比数据列表——纯展示（非四步）
      getCompareNotStepsList();
    }
  }, [basicInfo?.auditId, basicInfo?.applyType, goodsId, getCompareNotStepsList]);

  useEffect(() => {
    if (
      basicInfo?.auditId &&
      basicInfo?.applyType &&
      PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps &&
      goodsId
    ) {
      // 获取 对比数据 展示（四步）
      getFirstTabList();
    }
  }, [basicInfo?.auditId, basicInfo?.applyType, goodsId, getFirstTabList]);

  const notStepTableProps = useMemo(
    () => ({
      notStepsList: notStepsList || [],
    }),
    [notStepsList]
  );

  const stepTableProps = useMemo(
    () => ({
      firstList: firstList || [],
    }),
    [firstList]
  );

  return {
    pageTitle: basicInfo?.applyName || '对比数据',
    pageStatus: state.pageStatus,
    errorMessage: state.errorMessage,
    basicInfo,
    notStepTableProps,
    stepTableProps,
  };
};
