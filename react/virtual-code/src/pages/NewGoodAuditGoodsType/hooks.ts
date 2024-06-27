import { useMemo, useCallback, useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { useRequest, useSetState } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { pick } from 'lodash';
import { PageStatus, NewGoodCreateByFlowTypes, IStoreGroupTypeItem, CommonRes } from '@/types';
import { NewGoodCreateByFlowService } from '@/services';

/**
 * 携带参数：openId、processInstanceId、goodsId
 */
export const useAuditGoodsType = () => {
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

    groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
    goodsTypeList: { code: string; name: string }[]; // 配置状态下拉列表
  }>({
    pageStatus: PageStatus.loading,
    errorMessage: '',

    groupList: [],
    goodsTypeList: [],
  });

  // 获取 有门店的门店分组数据 && 让他配置状态下拉列表
  const initData = useCallback(() => {
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

  // 获取 配置状态审批 列表数据
  const {
    data: secList,
    loading: secLoading,
    run: getSecTabList,
    mutate: mutateSecList,
  } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !goodsId) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '对比数据加载失败',
        });
        return [];
      }

      try {
        const data = await NewGoodCreateByFlowService.getListCompareType(
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

  // 保存
  const { loading: saveLoading, run: handleSave } = useRequest(
    async () => {
      if (!basicInfo?.auditId || !goodsId) {
        return;
      }

      try {
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

        Toast.show({
          icon: 'success',
          content: '保存成功',
        });
        getSecTabList();
      } catch (error) {
        console.log('error->', error);
      }
    },
    {
      manual: true,
    }
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
    // 获取 有门店的门店分组数据 && 让他配置状态下拉列表
    initData();
  }, [initData]);

  useEffect(() => {
    if (basicInfo?.auditId && goodsId) {
      getSecTabList();
    }
  }, [basicInfo?.auditId, goodsId, getSecTabList]);

  const stepTableProps = useMemo(
    () => ({
      groupList: state.groupList,
      goodsTypeList: state.goodsTypeList,

      canEdit: canEdit || false,

      secList: secList || [],
      secLoading: secLoading || false,

      mutateSecList,
    }),
    [state.groupList, state.goodsTypeList, canEdit, secList, secLoading, mutateSecList]
  );

  return {
    pageTitle: basicInfo?.applyName || '配置状态审批',
    pageStatus: state.pageStatus,
    errorMessage: state.errorMessage,
    canEdit: canEdit || false,
    basicInfo,
    stepTableProps,
    saveLoading: saveLoading || false,
    onBack,
    onSave,
  };
};
