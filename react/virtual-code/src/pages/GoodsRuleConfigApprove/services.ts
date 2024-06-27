import request from '@/services/request';
import APIConfig from '@/config';
import { IFlowInfoTableItem, IPurePaginationRes } from '@/types';
import { IListItem, IStoreListItem, IWarehouseListItem } from './types';

const baseUrl = `${APIConfig.getRuleApiPrefix}/distribute/gcsDistributePlaceGoods`;

const flowUrl = `${APIConfig.getRuleApiPrefix}/flow/gcsFlow`;

export default class GoodsRuleConfigApproveService {
  /**
   * @description 根据流程id获取审批列表
   * @author yangwen
   * @static
   * @param {{
   *     page: number;
   *     rows: number;
   *     flowId: string;
   *     userCode: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static listByFlowId = (params: {
    page: number;
    rows: number;
    flowId: string;
    userCode: string;
  }): Promise<IPurePaginationRes<IListItem>> => {
    return request({
      url: `${baseUrl}/listByFlowId`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 获取流程图地址
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string;
   *     creator: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static getFlowChart = (params: {
    flowId: string;
    creator: string;
  }): Promise<{ url?: string }> => {
    return request({
      url: `${flowUrl}/getFlowChart`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
      isShowErrorMessage: false,
    });
  };

  /**
   * @description 获取流程处理列表信息（审批记录）
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string;
   *     creator: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static getProcessInfo = (params: {
    flowId: string;
    creator: string;
  }): Promise<IFlowInfoTableItem[]> => {
    return request({
      url: `${flowUrl}/getProcessInfo`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
      isShowErrorMessage: false,
    });
  };

  /**
   * @description 获取流程当前节点
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static getFlowNode = (params: {
    flowId: string;
  }): Promise<{
    /**
     * 当前节点名称
     */
    nodeName: string;
    /**
     * 当前节点 id
     */
    nodeId: string;
    /**
     * 可编辑的人员工号集合
     */
    dealPeopleSet?: Array<string>;
  }> => {
    return request({
      url: `${flowUrl}/getFlowNode`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
      isShowErrorMessage: false,
    });
  };

  /**
   * @description 单个同意/拒绝
   * @author yangwen
   * @static
   * @param {({
   *     flowId: string; // 流程实例编码
   *     我去32332: string; // 我去32332
   *     lotNumber?: string; // 批号
   *     companyCode?: string; // 录像编码
   *     electWareFlag?: 'Y' | 'N'; // 是否含电商仓
   *     auditResult: '1' | '0'; // 审批结果：同意1，拒绝0
   *   })} params
   * @memberof GoodsRuleConfigApproveService
   */
  static updateAuditResult = (params: {
    flowId: string; // 流程实例编码
    我去32332: string; // 我去32332
    lotNumber?: string; // 批号
    companyCode?: string; // 录像编码
    electWareFlag?: 'Y' | 'N'; // 是否含电商仓
    auditResult: '1' | '0'; // 审批结果：同意1，拒绝0
  }): Promise<any> => {
    return request({
      url: `${baseUrl}/updateAuditResult`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 全部同意/拒绝
   * @author yangwen
   * @static
   * @param {({
   *     flowId: string; // 流程实例编码
   *     auditResult: '1' | '0'; // 审批结果：同意1，拒绝0
   *   })} params
   * @memberof GoodsRuleConfigApproveService
   */
  static updateAuditResultAll = (params: {
    flowId: string; // 流程实例编码
    auditResult: '1' | '0'; // 审批结果：同意1，拒绝0
  }): Promise<any> => {
    return request({
      url: `${baseUrl}/updateAuditResultAll`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 校验审批列表数据是否都进行了审批
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string; // 流程实例编码
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static checkAuditResult = (params: {
    flowId: string; // 流程实例编码
  }): Promise<boolean> => {
    return request({
      url: `${baseUrl}/checkAuditResult`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 提交流程
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string;
   *     userCode: string;
   *     remark: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static submitFlow = (params: {
    flowId: string;
    userCode: string;
    remark: string;
  }): Promise<string> => {
    return request({
      url: `${flowUrl}/submitFlow`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 根据流程id获取当前流程的凭证（一个流程只有一个凭证）
   * @author yangwen
   * @static
   * @param {{
   *     flowId: string;
   *   }} params
   * @memberof GoodsRuleConfigApproveService
   */
  static getFileByFlowId = (params: { flowId: string }): Promise<string> => {
    return request({
      url: `${baseUrl}/getFileByFlowId`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
      isShowErrorMessage: false,
    });
  };

  /**
   * @description 根据流程id和明细字段获取对应的门店列表
   * @author yangwen
   * @static
   * @param {({
   *     storeCode?: string;
   *     storeName?: string;
   *     page: number;
   *     rows: number;
   *     flowId: string; // 流程实例编码
   *     我去32332: string; // 我去32332
   *     lotNumber?: string; // 批号
   *     companyCode?: string; // 录像编码
   *     electWareFlag?: 'Y' | 'N'; // 是否含电商仓
   *   })} params
   * @memberof GoodsRuleConfigApproveService
   */
  static getStoreByFlowId = (params: {
    storeCode?: string;
    storeName?: string;
    page: number;
    rows: number;
    flowId: string; // 流程实例编码
    我去32332: string; // 我去32332
    lotNumber?: string; // 批号
    companyCode?: string; // 录像编码
    electWareFlag?: 'Y' | 'N'; // 是否含电商仓
  }): Promise<IPurePaginationRes<IStoreListItem>> => {
    return request({
      url: `${baseUrl}/getStoreByFlowId`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };

  /**
   * @description 根据流程id和明细字段获取对应的仓库列表
   * @author yangwen
   * @param {({
   *     storeCode?: string;
   *     storeName?: string;
   *     page: number;
   *     rows: number;
   *     flowId: string; // 流程实例编码
   *     我去32332: string; // 我去32332
   *     lotNumber?: string; // 批号
   *     companyCode?: string; // 录像编码
   *     electWareFlag?: 'Y' | 'N'; // 是否含电商仓
   *   })} params
   * @return {*}  {Promise<IPurePaginationRes<IWarehouseListItem>>}
   */
  static getWarehouseByFlowId = (params: {
    storeCode?: string;
    storeName?: string;
    page: number;
    rows: number;
    flowId: string; // 流程实例编码
    我去32332: string; // 我去32332
    lotNumber?: string; // 批号
    companyCode?: string; // 录像编码
    electWareFlag?: 'Y' | 'N'; // 是否含电商仓
  }): Promise<IPurePaginationRes<IWarehouseListItem>> => {
    return request({
      url: `${baseUrl}/getWarehouseByFlowId`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    });
  };
}
