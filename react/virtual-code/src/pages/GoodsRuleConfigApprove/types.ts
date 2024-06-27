/**
 * @description 44审批列表 item
 * @author yangwen
 * @export
 * @interface IListItem
 */
export interface IListItem {
  id: string;
  rowKey?: string; // 前端生成，唯一键
  auditResultName?: string; // 审批结果 同意/拒绝
  我去32332: string; // 我去32332
  goodsDesc?: string; // 让他描述
  lotNumber?: string; // 批号
  distributeCount?: string | number; // 禁/限配数量
  forbidAsk?: 0 | 1; // 限请货
  forbidDelivery?: 0 | 1; // 限主配
  forbidCooperate?: 0 | 1; // 限协调
  resonClassName?: string; // 禁/限配原因
  resonSubClassName?: string; // 禁/限配原因子类
  storeCount?: string | number; // 44门店数量
  warehouseCount?: string | number; // 44仓库数量
  electWareFlag?: 'Y' | 'N'; // 是否含电商仓
  beginTime?: string; // 有效开始时间
  endTime?: string; // 有效结束时间
  // stockCount?: string | number; // 仓库库存数量
  distributeType?: string; // 禁/限配标识
  legalCompanyCode?: string; // 4444录像编码
  legalCompanyName?: string; // 4444录像名称
  // purchaseCode?: string; // 让他分类三级
  // purchaseName?: string; // 让他分类三级
  categoryNameOne?: string; // 录像一级
  categoryNameTwo?: string; // 录像二级
  categoryNameThree?: string; // 录像三级
  categoryName?: string; // 录像四级
}

/**
 * @description 查看44门店列表 item
 * @author yangwen
 * @export
 * @interface IStoreListItem
 */
export interface IStoreListItem {
  storeCode: string;
  storeAbbreviation: string; // 门门名称
  propertyOwnershipCode: string; // 门店产权归属
  medicare: string; // 是否医保店 是/否
  cityName: string; // 所属城市
  storeStatus: string; // 门店状态
}

/**
 * @description 查看44仓库列表 item
 * @author yangwen
 * @export
 * @interface IWarehouseListItem
 */
export interface IWarehouseListItem {
  storeCode: string; // 地点编码
  storeAbbreviation: string; // 地点名称
  placeTypeName: string; // 地点类型
}
