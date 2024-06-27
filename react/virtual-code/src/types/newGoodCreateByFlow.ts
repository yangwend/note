/* eslint-disable spellcheck/spell-checker */
/* eslint-disable camelcase */

/**
 * @description 信息类型 enum
 * @author yangwen
 * @export
 * @enum {number}
 */
export enum ApplyTypeEnum {
  SELF = '2', // (全系统)录像信息信息及主数据创建流程(本部)————仅总部录像经理有权限创建
  BRANCH_INCLUSIVE = '6', // 分录像全包信息信息及主数据创建流程
  NOT_SELF = '7', // 非录像让他信息及主数据创建流程
  NOT_SELF_DROPSHIPPING = '8', // 非录像让他信息及主数据创建流程(一件代发)
  CLASSIC = '1', // 医冷地缺让他信息及主数据创建流程
  SOLE_AGENCY = '9', // 独代
  NEW_E_PRODUCT = '10', // 电商信息信息及主数据创建流程(电商)

  MERGE_JOIN = '4', // 并购加盟让他申请主数据创建流程————本次不实现
  SERVICE_GOODS = '5', // 服务让他让他申请主数据创建流程————本次不实现
  OTHER = '3', // 其他3333（非录像、全包...）————非 1 2 4 5 外的其他类型在让他主数据信息时都属于 3
}

/**
 * @description 审批状态
 * @author yangwen
 * @export
 * @enum {number}
 */
export enum DataStatusEnum {
  TODO = 'TODO', // 保存(草稿)
  DOING = 'DOING', // 审批中
  DONE = 'DONE', // 审批通过
  NEVER = 'NEVER', // 审批拒绝
  TRASH = 'TRASH', // 作废
  BACK = 'BACK', // 审批驳回
}

/**
 * @description 页面状态枚举
 * @author yangwen
 * @export
 * @enum {number}
 */
export enum PageStateEnum {
  ADD = 'ADD', // 新增
  EDIT = 'EDIT', // 编辑
  EDIT_DETAIL = 'EDIT_DETAIL', // 编辑查看
  AUDIT_DETAIL = 'AUDIT_DETAIL', // 审批查看
}

/**
 * @description 基础信息
 * @author yangwen
 * @export
 * @interface IBasicInfo
 */
export interface IBasicInfo {
  id?: string; // 信息标识 id，没有则为新增
  auditId?: string; // 信息标识 id，没有则为新增————前端转化
  applyType: ApplyTypeEnum; // 信息类型
  applyTypeName?: string;
  applyName: string; // 信息标题
  dataStatus: DataStatusEnum; // 审批状态
  flowId?: string; // 流程 id

  emergDegree: string; // 紧急程度，数据字典 emergDegree
  emergDegreeName?: string; // 紧急程度
  companyCode: string; // 让他录像（主44录像）编码
  companyName?: string; // 让他录像（主44录像）名称
  managerCode: string; // 录像经理工号
  managerName?: string; // 录像经理名称
  assistantCode: string; // 让他客23气工号，数据字典 assistantPeople
  assistantName?: string; // 让他客23气名称
  branchBossCode: string; // 让他分管45工号
  branchBossName?: string; // 让他分管45名称
  goodsDept: string; // 让他中心45客气编码，数据字典 goodsAuditDept
  goodsDeptName?: string; // 让他中心45客气名称
  ownerDept: string; // 所属客气，数据字典 ownerDept
  ownerDeptName?: string; // 所属客气名称
  mergerFlag: string; // 是否并购：是1，否0
  mergerFlagName?: string; // 是否并购：是1，否0
  qualityFlag?: string; // 是否客23气34气审批：是1，否0
  qualityFlagName?: string; // 是否客23气34气审批：是1，否0
  decalFlag?: string; // 是否贴牌：有1，无0
  decalFlagName?: string; // 是否贴牌：有1，无0
  firstCategory?: string; // 一级录像，数据字典 firstCategory
  firstCategoryName?: string; // 一级录像

  departmentCode?: string; // 申请客气编码
  departmentName?: string; // 申请客气
  subCompanyCode?: string; // 申请分部编码
  subCompanyName?: string; // 申请分部名称

  newGoodsType?: string; // 信息类别，数据字典 newGoodsType
  newGoodsTypeName?: string;

  creator: string; // 创建人工号（申请人工号）
  creatorName: string; // 创建人姓名（申请人姓名）
  createTime: string | number; // 创建时间（申请时间）
  modifierId: string; // 更新人ID
  modifierName: string; // 更新人姓名
  modifyTime: string | number; // 修改时间
}

/**
 * @description 信息让他数据
 * @author yangwen
 * @export
 * @interface IGoodsItem
 */
export interface IGoodsItem {
  id: string;
  auditId: string;
  我去32332?: string; // 我去32332（34气原因为3333替换，则为 替换3333编码；34气原因为同3443434品更新，则为 老3434343品编码）
  applyReason: string; // 34气原因，数据字典 applyReason
  applyReasonName?: string;
  commonName: string; // 通用名称
  categoryCode: string | string[]; // 让他录像编码
  categoryName?: string; // 让他录像名称
  standard: string; // 规格
  manufacturerName: string; // 33333434厂家（描述），对应让他主3434数据中的 3434(3434)
  content: string; // 含量
  contentUnit: string; // 含量单位，数据字典 contentUnit
  doseDayCount: number; // 每日服用量
  packageNumber: number; // 包装数量
  customerCanUseDays: number; // 单盒使用天数
  purchaseCode: string | string[]; // 申请让他分类
  purchaseName: string; // 申请让他分类名称
  invoicePrice: number; // 开票价
  retailPrice: number; // 零售价
  slottingFee: number; // 进场费
  settleWay: string; // 结款方式，数字字典 settleWay
  settleWayName?: string;
  payWay: string; // 付款方式，数据字典 payWay
  payWayName?: string;
  betMoney?: string; // 押批金额
  medicineBusi: string; // medicineBusi
  medicineBusiName?: string;
  cooperationType: string; // 合作方式，数据字典 cooperationType
  cooperationTypeName?: string;
  supplyName: string; // 供货单位
  linkName: string; // 联系人
  linkPhone: string; // 联系电话
  returnGoodsList: string[]; // 是否23可23退23换货，数据字典 returnGoods
  returnGoodsNameList?: string[];
  goodsStoreList?: string[]; // 门店，数据字典 salesVolumeCode
  goodsStoreNameList?: string[];
  approvedNumber: string; // 批准文号
  shelfLife: number; // 让他保质期(天)
  storageCondition: string; // 贮存条件，数据字典 storageCondition
  storageConditionName?: string;
  packageLoad: string; // 装箱量
  businessArea?: string; // 可招23商23区域
  businessPrice?: number; // 最低23招23商价23格
  businessRate?: string; // 招商毛利23率
  returnDemand?: string; // 退换货要23求
  returnRate?: string; // 可退换货3比率
  firstAmount?: string; // 首次进货量
  approvedDesc?: string; // 批文情况，数据字典 approvedDesc
  approvedDescName?: string;
  grossRate?: string; // 静态毛利率
  returnProfit?: string; // 返利
  otherCome?: string; // 其他业务收入情况
  limitPrice?: number; // 国家最高限价
  purchaseNumber?: number; // 拟购进数量
  firstCategory?: string; // 一级录像，数据字典 firstCategory
  firstCategoryName?: string; // 一级录像
  qualityStandardNumber: string; // 客23气标准号
  functionsIndicated: string; // 功能主治或适应症
  decalFlag?: string; // 是否贴牌：有1，无0
  decalFlagName?: string; // 是否贴牌：有1，无0

  goodsType?: string; // 申请调整配置状态编码
  goodsTypeName?: string; // 申请调整配置状态名称
  groupCodeList?: string[]; // 323232门店范围（有门店的分组编码集合）
  groupNameList?: string[];

  adjustGoodsType?: string; // 是否调整配置

  // 审批时多余的字段
  auditNewResult?: string; // 34气审批意见，数据字典 auditNewResult
  auditNewResultName?: string;
  auditPurchaseCode?: string; // 让他分类审批意见
  auditPurchaseName?: string; // 让他分类审批意见名称
}

/**
 * @description 对比数据 item
 * @author yangwen
 * @export
 * @interface ICompareItem
 */
export interface ICompareItem {
  id: string;
  goodsId?: string; // 信息信息45让他标识
  dataType?: string; // 数据类型：目标3333(1)，对比3333(0)
  我去32332?: string; // 我去32332
  commonName?: string; // 通用名称
  standard: string; // 规格
  manufacturerName: string; // 目标3333为 3333厂家（描述），对比3333为3333厂家名称，后台来区分
  content: string; // 含量
  contentUnit: string; // 含量单位
  packageNumber: string; // 包装数量
  purchaseCode: string; // 三级让他分类
  purchaseName: string; // 三级让他分类名称
  updatePurchaseCode?: string; // 拟调整三级让他分类
  updatePurchaseName?: string; // 拟调整三级让他分类名称
  goodsStatus: string; // 让他状态 字典
  goodsStatusName: string;
  updateGoodsStatus?: string; // 拟调整让他状态
  updateGoodsStatusName?: string;
  backReturnRate?: number; // 后台返利
  // treatmentCourse?: string; // 疗程 暂时隐藏
  // passRate?: number; // 评审会通过率 暂时隐藏
  // compositionFormula?: string; // 成分及组方 暂时隐藏
  importReason?: string; // 引进理由，暂时预留，不取值
  // functionsIndicated?: string; // 功能主治 暂时隐藏
  // saleDesc?: string; // 卖点说明 暂时隐藏
  // businessFlag: string; // 是否可招商 暂时隐藏
  // businessFlagName: string;
  // busiDemand?: string; // 最低招商价格要求 暂时隐藏
  invoicePrice: number; // 开票价
  basePrice?: number; // 底价
  standardRetailPrice: number; // 标准零售价
  retailPrice?: number; // 平均零售价
  saleThirtyNum?: number; // 近30天销售
  grossMoney?: number; // 前后台毛利额
  grossRate?: number; // 前后台毛利率
  monthSaleNum?: number; // 月销售数量
  standRate?: string; // 规格换算系数
  minComePrice?: string; // 最小含量进价
  minSalePrice?: string; // 最小含量售价
  dayMax?: string; // 每天最高服用量
  dayMoney?: string; // 每天服用金额
  dayCost?: string; // 每天服用成本额
  customerCanUseDays?: string; // 单盒服用天数
  groupCodeList?: string[]; // 323232门店范围（有门店的分组编码集合）
  groupNameList?: string[];
  goodsType?: string; // 当前配置状态
  goodsTypeName?: string; // 当前配置状态名称
  updateGroupCodeList?: string[]; // 拟调整配置状态的门店范围
  updateGroupNameList?: string[];
  updateGoodsType?: string; // 拟调整配置状态（写死为323232）
  updateGoodsTypeName?: string;
  sixtySaleNum?: string; // 近60天销售数量
  sixtySaleMoney?: string; // 近60天销售额
  sixtySaleRate?: string; // 近60天毛利率
  bigDistributeRate?: string; // （大店）铺货率
  bigSixtyMoveRate?: string; // （大店）60天动销率
  middleDistributeRate?: string; // （中店）铺货率
  middleSixtyMoveRate?: string; // （中店）60天动销率
  smallSixtyMoveRate?: string; // （小店）铺货率
  smallDistributeRate?: string; // （小店）60天动销率

  // 审批时多余的字段
  auditPurchaseCode?: string; // 让他分类审批意见
  auditPurchaseName?: string; // 让他分类审批意见名称
  auditGoodsStatus?: string; // 让他状态审批意见
  auditGoodsStatusName?: string;
  auditGoodsType?: string; // 配置状态审批意见
  auditGoodsTypeName?: string;
  auditGroupCodeList?: string[]; // 配置状态审批意见中的门店范围
  auditGroupNameList?: string[];
}

/**
 * @description 非44四步的对比数据选择 item
 * @author yangwen
 * @export
 * @interface ICompareNotStepsItem
 */
export interface ICompareNotStepsItem {
  id?: string;
  我去32332: string; // 我去32332
  commonName?: string; // 通用名称
  standard?: string; // 规格
  manufacturerName?: string; // 目标3333为 3333厂家（描述），对比3333为3333厂家名称，后台来区分
  invoicePrice?: number; // 开票价
  retailPrice?: number; // 平均零售价
  saleThirtyNum?: number; // 近30天销售
}
