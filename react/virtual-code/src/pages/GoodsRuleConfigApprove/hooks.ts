import { useMemo, useCallback, useEffect, useRef } from 'react';
import { Modal, Toast } from 'antd-mobile';
import { useRequest, useSetState } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { PageStatus } from '@/types';
import { IListItem } from './types';
import GoodsRuleConfigApproveService from './services';

interface IState {
  pageStatus: PageStatus; // 页面状态
  errorMessage: string; // 失败错误文案

  activeKey: '1' | '2' | '3'; // 三个 tab

  remark: string; // 审批意见

  imageViewerVisible: boolean; // 图片查看器弹窗显隐

  dataSource: IListItem[]; // 审批列表数据
  total: number; // 审批列表总数
  pageCurrent: number; // 分页页码（默认一页10条）
  isSearch: boolean; // 是否处于搜索中，非第一次加载则置为 true
}

export const useGoodsRuleConfigApprove = () => {
  const [search] = useSearchParams();
  // 页面url 参数 openId
  const openId = search.get('openId') as string;
  // 页面url 参数 processInstanceId
  const flowId = search.get('processInstanceId') as string;

  const fetchLoading = useRef<boolean>(false); // 分页加载中
  const hasMore = useRef<boolean>(false); // 是否有更多数据

  const [state, setState] = useSetState<IState>({
    pageStatus: PageStatus.loading,
    errorMessage: '',

    activeKey: '1',

    remark: '',

    imageViewerVisible: false,

    dataSource: [],
    total: 0,
    pageCurrent: 1,
    isSearch: false,
  });

  // 同意|拒绝按钮的 loading state
  const [approveState, setApproveState] = useSetState<{
    allLoading?: boolean; // 全部同意|拒绝 loading
    singleLoadingMap: { [key: string]: boolean | undefined }; // 单个同意|拒绝 loading
  }>({
    allLoading: undefined, // 为 undefined 标明此时没有 loading，true/false 标明此时正在 loading 中
    singleLoadingMap: {}, // 单项为 undefined 标明此时没有 loading，true/false 标明此时正在 loading 中
  });

  // 校验当前登录人是否是当前节点可以操作的人
  const { data: canEdit, run: queryCanEdit } = useRequest(
    async () => {
      if (!flowId || !openId) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: '流程ID或当前登录人工号不能为空',
        });
        return false;
      }

      try {
        const data = await GoodsRuleConfigApproveService.getFlowNode({ flowId });

        setState({
          pageStatus: PageStatus.success,
          errorMessage: '',
        });

        const dealPeopleSet = data.dealPeopleSet || [];
        return dealPeopleSet.includes(openId);
      } catch (error) {
        setState({
          pageStatus: PageStatus.error,
          errorMessage: (error as any).message,
        });

        return false;
      }
    },
    {
      manual: false, // 进来页面则自动触发调用
    }
  );

  // 根据流程id获取当前流程的凭证（一个流程只有一个凭证）
  const { data: imgUrl } = useRequest(
    async () => {
      if (!flowId) {
        return '';
      }

      try {
        const url = await GoodsRuleConfigApproveService.getFileByFlowId({ flowId });

        if (url) {
          return `${url}${url.indexOf('?') > -1 ? '&' : '?'}x-oss-process=image/quality,q_80`; // 图片处理
        } else {
          return '';
        }
      } catch (error) {
        return '';
      }
    },
    {
      manual: false, // 进来页面则自动触发调用
    }
  );

  // 获取流程图地址
  const { data: flowChartUrl, run: getFlowChart } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return '';
      }

      try {
        const data = await GoodsRuleConfigApproveService.getFlowChart({ flowId, creator: openId });
        return data?.url || '';
      } catch (error) {
        return '';
      }
    },
    {
      manual: false, // 进来页面则自动触发调用
    }
  );

  // 获取流程处理列表（审批记录）
  const { data: processInfoList, run: getProcessInfo } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return [];
      }

      try {
        const data = await GoodsRuleConfigApproveService.getProcessInfo({
          flowId,
          creator: openId,
        });
        return data || [];
      } catch (error) {
        return [];
      }
    },
    {
      manual: false, // 进来页面则自动触发调用
    }
  );

  // 获取审批列表
  const getList = async (pageCurrent: number) => {
    if (!flowId || !openId) {
      Toast.show('流程ID或当前登录人工号不能为空');
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

    console.info('pageCurrent', pageCurrent, fetchLoading.current, hasMore.current);

    try {
      const data = await GoodsRuleConfigApproveService.listByFlowId({
        page: pageCurrent,
        rows: 10, // 默认 10 条
        flowId,
        userCode: openId,
      });

      let { records = [], total = 0 } = data;
      records =
        records?.map((item) => ({
          ...item,
          rowKey: nanoid(), // 前端生成唯一键
        })) ?? [];

      // 注意！涉及到 “基于旧值的计算”，都需要取 prev 来获取最新的旧值
      setState((prev) => {
        const newState = {
          ...prev,
          dataSource:
            pageCurrent > 1 ? [...prev.dataSource, ...(records || [])] : [...(records || [])],
          total: Number(total || 0),
          pageCurrent, // 更新页码
          isSearch: true,
        };
        return newState;
      });
      hasMore.current = pageCurrent * 10 < Number(total || 0);
    } catch (error) {
      setState({
        pageCurrent: pageCurrent - 1, // 还原页码
      });
    } finally {
      fetchLoading.current = false;
      toastIndex.close();
    }
  };

  useEffect(() => {
    if (flowId && openId) {
      // 获取第一页数据
      getList(1);
    }
  }, [flowId, openId]);

  // 单个同意|拒绝
  const { run: singleApprove } = useRequest(
    async (record: IListItem, approve: boolean) => {
      if (!flowId) {
        return;
      }

      // 防重复提交
      if (typeof approveState.singleLoadingMap[record.rowKey!] === 'boolean') {
        return;
      }

      setApproveState((prev) => {
        return {
          ...prev,
          singleLoadingMap: {
            ...prev.singleLoadingMap,
            [record.rowKey!]: approve,
          },
        };
      });

      try {
        await GoodsRuleConfigApproveService.updateAuditResult({
          flowId, // 流程实例编码
          我去32332: record.我去32332, // 我去32332
          lotNumber: record.lotNumber, // 批号
          companyCode: record.legalCompanyCode, // 录像编码
          electWareFlag: record.electWareFlag, // 是否含电商仓
          auditResult: approve ? '1' : '0', // 审批结果：同意1，拒绝0
        });
        Toast.show({
          icon: 'success',
          content: `操作成功`,
        });

        // 不需要重新请求接口获取数据，直接改数据即可
        setState((prev) => {
          const newDataSource = prev.dataSource.map((item) => {
            if (item.rowKey === record.rowKey) {
              return {
                ...item,
                auditResultName: approve ? '同意' : '拒绝',
              };
            }
            return item;
          });

          return {
            ...prev,
            dataSource: newDataSource,
          };
        });
      } catch (error) {
        console.log('error->', error);
      } finally {
        setApproveState((prev) => {
          return {
            ...prev,
            singleLoadingMap: {
              ...prev.singleLoadingMap,
              [record.rowKey!]: undefined,
            },
          };
        });
      }
    },
    {
      manual: true,
    }
  );

  // 全部同意|拒绝
  const { run: allApprove } = useRequest(
    async (approve: boolean) => {
      if (!flowId) {
        return;
      }

      // 防重复提交
      if (typeof approveState.allLoading === 'boolean') {
        return;
      }

      setApproveState({
        allLoading: approve,
      });

      try {
        await GoodsRuleConfigApproveService.updateAuditResultAll({
          flowId, // 流程实例编码
          auditResult: approve ? '1' : '0', // 审批结果：同意1，拒绝0
        });
        Toast.show({
          icon: 'success',
          content: `操作成功`,
        });
        // 不需要重新请求接口获取数据，直接改数据即可
        setState((prev) => {
          const newDataSource = prev.dataSource.map((item) => {
            return {
              ...item,
              auditResultName: approve ? '同意' : '拒绝',
            };
          });

          return {
            ...prev,
            dataSource: newDataSource,
          };
        });
      } catch (error) {
        console.log('error->', error);
      } finally {
        setApproveState({
          allLoading: undefined,
        });
      }
    },
    {
      manual: true,
    }
  );

  // 提交
  const { loading: submitFlowLoading, run: submitFlow } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return;
      }

      try {
        // 校验数据是否全部操作完成（同意|拒绝）
        const checkResult = await GoodsRuleConfigApproveService.checkAuditResult({ flowId });

        if (checkResult) {
          const data = await GoodsRuleConfigApproveService.submitFlow({
            flowId,
            userCode: openId,
            remark: state.remark || '批准流程',
          });

          if (data === 'SUCCESS') {
            Toast.show({
              icon: 'success',
              content: `提交成功`,
            });

            setState({
              pageStatus: PageStatus.loading,
            });
            queryCanEdit();
            getFlowChart();
            getProcessInfo();
            // 此处不更新45列表数据
          } else {
            Toast.show({
              icon: 'fail',
              content: '提交失败，请联系管理员',
            });
          }
        } else {
          // 弹窗提示先进行45
          Modal.show({
            title: '提示',
            content: '批准失败！请对44信息确认同意或拒绝后再批准',
            closeOnMaskClick: true,
            closeOnAction: true,
            actions: [
              {
                key: 'online',
                text: '确定',
                primary: true,
                style: {
                  fontSize: '3.73333vw',
                  height: '10.66667vw',
                  lineHeight: 1,
                  backgroundColor: '#197bff',
                },
              },
            ],
          });
        }
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
        activeKey: key as '1' | '2' | '3',
      });
    },
    [setState]
  );

  // 意见输入框输入
  const onRemarkChange = (value: string) => {
    setState({
      remark: value || '',
    });
  };

  const listProps = useMemo(
    () => ({
      flowId: flowId || '',
      dataSource: state.dataSource,
      hasMore: hasMore.current,
      isSearch: state.isSearch,
      loadMore: () => {
        // 分页加载更多
        // 注意！涉及到 “基于旧值的计算”，都需要取 prev 来获取最新的旧值
        setState((prev) => {
          getList(prev.pageCurrent + 1);
          return prev;
        });
      },

      imgUrl,
      onFileClick: () => {
        if (!imgUrl) {
          return;
        }

        // 有图片
        setState({
          imageViewerVisible: true,
        });
      },

      singleLoadingMap: approveState.singleLoadingMap,
      singleApprove,

      canEdit: canEdit || false,
    }),
    [
      flowId,
      state.dataSource,
      state.isSearch,

      imgUrl,

      approveState.singleLoadingMap,
      singleApprove,

      canEdit,
      setState,
    ]
  );

  return {
    pageStatus: state.pageStatus,
    errorMessage: state.errorMessage,

    total: state.total,
    activeKey: state.activeKey,
    onTabChange,
    flowChartUrl: flowChartUrl || '',
    processInfoList: processInfoList || [],

    canEdit: canEdit || false,

    allApprove,
    allApproveLoading: approveState.allLoading,
    remark: state.remark,
    onRemarkChange,
    submitFlowLoading: submitFlowLoading || false,
    submitFlow,

    listProps,

    imgUrl: imgUrl || '',
    imageViewerVisible: state.imageViewerVisible,
    onFileCancel: () => {
      setState({
        imageViewerVisible: false,
      });
    },
  };
};
