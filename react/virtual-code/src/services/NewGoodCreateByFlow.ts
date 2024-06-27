/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from './request';
import APIConfig from '@/config';
import {
  Key,
  NewGoodCreateByFlowTypes,
  CommonRes,
  IPurchaseItem,
  IStoreGroupTypeItem,
} from '@/types';

const baseUrl = `${APIConfig.getApiPrefix}/audit`;

const compareUrl = `${APIConfig.getApiPrefix}/compare`;

export default class NewGoodCreateByFlowService {
  /**
   * @description 根据 让他id 查询让他详情
   * @author yangwen
   * @static
   * @param {{
   *     goodsId?: string;
   *   }} params
   * @memberof NewGoodCreateByFlowService
   */
  static listGoodsDetail = (params: {
    goodsId?: string;
  }): Promise<NewGoodCreateByFlowTypes.IGoodsItem> =>
    request({
      url: `${baseUrl}/listGoodsDetail`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<NewGoodCreateByFlowTypes.IGoodsItem>;

  /**
   * @description 校验当前登录人是否是当前节点可以操作的人
   * @author yangwen
   * @static
   * @param {{ flowId: string; openId: string }} params
   * @memberof NewGoodCreateByFlowService
   */
  static checkCanEdit = (params: { flowId: string; openId: string }): Promise<boolean> =>
    request({
      url: `${baseUrl}/checkEditable`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<boolean>;

  /**
   * @description 根据 信息id 或 流程id 查询流程基本信息
   * @author yangwen
   * @static
   * @param {{
   *     id?: string;
   *     flowId?: string;
   *   }} params
   * @memberof NewGoodCreateByFlowService
   */
  static queryBasicInfo = (params: {
    id?: string;
    flowId?: string;
  }): Promise<NewGoodCreateByFlowTypes.IBasicInfo> =>
    request({
      url: `${baseUrl}/queryBasicDetail`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<NewGoodCreateByFlowTypes.IBasicInfo>;

  /**
   * @description 根据让他 id + auditId 查询对比数据
   * @author yangwen
   * @static
   * @param {{
   *     auditId: string;
   *     goodsId: string;
   *     compareType: string; //  1-大数据查询  2-新增
   *   }} params
   * @memberof NewGoodCreateByFlowService
   */
  static getListCompareBasic = (params: {
    auditId: string;
    goodsId: string;
    compareType: string; //  1-大数据查询  2-新增
  }): Promise<Partial<NewGoodCreateByFlowTypes.ICompareItem>[]> =>
    request({
      url: `${compareUrl}/listCompareBasic`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<Partial<NewGoodCreateByFlowTypes.ICompareItem>[]>;

  /**
   * @description 信息信息信息审批时，根据 信息让他id 获取需要展示哪些 tab
   * @author yangwen
   * @static
   * @param {{
   *     auditId: string;
   *     goodsId: Key;
   *   }} params
   * @memberof NewGoodCreateByFlowService
   */
  static getCompareTabsInfo = (params: {
    auditId: string;
    goodsId: Key;
  }): Promise<{
    hasCompare?: boolean; // 是否需要展示 对比数据
    hasPtcn?: boolean; // 是否需要进行 让他分类和让他状态45（暂时不调用，后续按产品的方案来调整）
    hasGoodsType?: boolean; // 是否需要进行 配置状态审批
  }> =>
    request({
      url: `${baseUrl}/hasPtcnAndGoodsType`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<{
      hasCompare?: boolean; // 是否需要展示 对比数据
      hasPtcn?: boolean; // 是否需要进行 让他分类和让他状态45（暂时不调用，后续按产品的方案来调整）
      hasGoodsType?: boolean; // 是否需要进行 配置状态审批
    }>;

  /**
   * @description 信息信息信息审批：对比数据之让他分类和让他状态审批（暂时不调用，后续按产品的方案来调整）
   * @author yangwen
   * @static
   * @param {{
   *     auditId: string;
   *     goodsId: Key;
   *   }} params
   * @memberof NewGoodCreateByFlowService
   */
  static getAuditComparePurchaseInfo = (params: {
    auditId: string;
    goodsId: Key;
  }): Promise<NewGoodCreateByFlowTypes.ICompareItem[]> =>
    request({
      url: `${compareUrl}/listFlowComparePtcn`,
      method: 'POST',
      data: { ...params },
      isFilterResData: true,
    }) as Promise<NewGoodCreateByFlowTypes.ICompareItem[]>;

  /**
   * @description 信息信息信息审批：对比数据查询
   * @author yangwen
   * @static
   * @param {string} auditId
   * @param {string} goodsId
   * @memberof NewGoodCreateByFlowService
   */
  static getListCompareDetails = (
    auditId: string,
    goodsId: string
  ): Promise<NewGoodCreateByFlowTypes.ICompareItem[]> =>
    request({
      url: `${compareUrl}/listCompareDetails`,
      method: 'POST',
      data: { auditId, goodsId },
      isFilterResData: true,
    }) as Promise<NewGoodCreateByFlowTypes.ICompareItem[]>;

  /**
   * @description 查询对比数据配置信息
   * @author yangwen
   * @static
   * @param {string} auditId
   * @param {string} goodsId
   * @memberof NewGoodCreateByFlowService
   */
  static getListCompareType = (
    auditId: string,
    goodsId: string
  ): Promise<Partial<NewGoodCreateByFlowTypes.ICompareItem>[]> =>
    request({
      url: `${compareUrl}/listCompareType`,
      method: 'POST',
      data: { auditId, goodsId },
      isFilterResData: true,
    }) as Promise<Partial<NewGoodCreateByFlowTypes.ICompareItem>[]>;

  /**
   * @description 信息信息信息审批：对比数据之让他分类和让他状态审批 保存(流程)（暂时不调用，后续按产品的方案来调整）
   * @author yangwen
   * @static
   * @param {Array<Partial<NewGoodCreateByFlowTypes.ICompareItem>>} params
   * @memberof NewGoodCreateByFlowService
   */
  static updateAuditComparePurchaseInfo = (
    params: Array<Partial<NewGoodCreateByFlowTypes.ICompareItem>>
  ): Promise<any> =>
    request({
      url: `${compareUrl}/updateFlowComparePtcn`,
      method: 'POST',
      data: params,
      isFilterResData: true,
    }) as Promise<any>;

  /**
   * @description 信息信息信息审批：对比数据之配置状态审批 保存(流程)
   * @author yangwen
   * @static
   * @param {Array<Partial<NewGoodCreateByFlowTypes.ICompareItem>>} params
   * @memberof NewGoodCreateByFlowService
   */
  static updateFlowCompareType = (
    params: Array<Partial<NewGoodCreateByFlowTypes.ICompareItem>>
  ): Promise<any> =>
    request({
      url: `${compareUrl}/updateFlowCompareType`,
      method: 'POST',
      data: params,
      isFilterResData: true,
    }) as Promise<any>;

  /**
   * @description 获取 全部让他分类数据
   * @author yangwen
   * @static
   * @memberof NewGoodCreateByFlowService
   */
  static purchaseListAll = (): Promise<CommonRes<IPurchaseItem[]>> =>
    request({
      url: `${APIConfig.getApiPrefix}/purchase/listAll`,
      method: 'POST',
      data: { param: {} },
      isFilterResData: false,
      isShowErrorMessage: false,
    }) as Promise<CommonRes<IPurchaseItem[]>>;

  /**
   * @description 获取 有门店的门店分组
   * @author yangwen
   * @static
   * @memberof NewGoodCreateByFlowService
   */
  static listStoreGroup = (): Promise<IStoreGroupTypeItem[]> =>
    request({
      url: `${APIConfig.getApiPrefix}/newGoodsAudit/listStoreGroup`,
      method: 'POST',
      data: {},
      isFilterResData: true,
      isShowErrorMessage: false,
    }) as Promise<IStoreGroupTypeItem[]>;

  /**
   * @description 获取 让他配置状态下拉列表
   * @author yangwen
   * @static
   * @memberof NewGoodCreateByFlowService
   */
  static listGoodsTypeDict = (): Promise<CommonRes<{ code: string; name: string }[]>> =>
    request({
      url: `${APIConfig.getApiPrefix}/gcsGoodsTypeAudit/listGoodsTypeDict`,
      method: 'POST',
      data: {},
      isFilterResData: false,
      isShowErrorMessage: false,
    }) as Promise<CommonRes<{ code: string; name: string }[]>>;

  /**
   * @description 获取字典值（返回的 dictName 不带编码）
   * @author yangwen
   * @static
   * @param {string[]} dictTypeList
   * @memberof NewGoodCreateByFlowService
   */
  static dictWithoutCode = (
    dictTypeList: string[]
  ): Promise<CommonRes<{ dictCode: string; dictName: string }[]>> =>
    request({
      url: `${APIConfig.getApiPrefix}/dict/queryByType`,
      method: 'POST',
      data: {
        param: {
          dictTypeList,
        },
      },
      isFilterResData: false,
      isShowErrorMessage: false,
    }) as Promise<CommonRes<{ dictCode: string; dictName: string }[]>>;
}
