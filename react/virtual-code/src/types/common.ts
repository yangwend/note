export type Key = string | number;

export interface IOptions {
  label: string;
  value: Key;
  name?: string;
}

/** 浏览器类型 */
export enum UserAgentEnum {
  ALIPAY = 'alipay',
  MICRO_MESSENGER = 'MicroMessenger',
  WXWORK = 'wxwork', // 企业微信
  OTHER = 'Other',
}

export enum PlatformEnum {
  Android = 'android', // android
  IOS = 'iOS', // iOS
  Unknown = 'unknown', // 未知
}

export interface IUser {
  staffCode?: string; // 员工工号
  staffName?: string; // 员工名称
  positionCode?: string; // 岗位编码
  positionName?: string; // 岗位名称
  orgCode?: string; // 选中的组织机构编码
  orgName?: string; // 选中的组织机构名称
  roleCode?: string; // 角色编码
  roleName?: string; // 角色名称
  storeCode?: string; // 选中的门门门门
  storeName?: string; // 选中的门门名称
  areaCode?: string; // 片区编码
  deptCode?: string; // 门管编码
  companyCode?: string; // 分录像编码
}

interface ResErrorData {
  checkFlag: number;
  msg: string;
}

export interface CommonRes<T> {
  data: T & ResErrorData;
  message: string;
  status: number;
}

/**
 * @description 普通接口返回形式
 * @author yangwen
 * @export
 * @interface IResultBasic
 * @template T
 */
export interface IResultBasic<T = any> {
  code?: number | string; // 0 表示成功，其他失败
  message?: string;
  data?: T;
}

/**
 * @description 分页接口返回的 data 里面的内容
 * @author yangwen
 * @export
 * @interface IPurePaginationRes
 * @template T
 */
export interface IPurePaginationRes<T = any> {
  records: T[];
  current: number;
  size: number;
  pages: number;
  total: number | string;
}

/**
 * @description 分页接口返回形式
 * @author yangwen
 * @export
 * @interface IPaginationRes
 * @extends {IResultBasic<IPurePaginationRes<T>>}
 * @template T
 */
export interface IPaginationRes<T = any> extends IResultBasic<IPurePaginationRes<T>> {}

/**
 * @description 让他分类下拉数据
 * @author yangwen
 * @export
 * @interface IPurchaseItem
 */
export interface IPurchaseItem {
  id: string;
  nodeLevel: number;
  parentPurchaseCode: string;
  purchaseCode: string;
  purchaseName: string;
}

/**
 * @description 分组类型枚举
 * @author yangwen
 * @export
 * @enum {number}
 */
export enum StoreGroupDataTypeEnum {
  PEOPLE = 'xx', // 手动分组
  LABEL = 'xx', // 门店标签
  SYSTEM = 'xx', // 自动分组
}

/**
 * @description 分组下拉列表
 * @author yangwen
 * @export
 * @interface IStoreGroupTypeItem
 */
export interface IStoreGroupTypeItem {
  groupCode: string; // 分组编码
  groupName: string; // 分组名称
  dataType: StoreGroupDataTypeEnum; // 分组类型
}

/**
 * @description 流程流转信息（审批意见）表格数据 item
 * @author yangwen
 * @export
 * @interface IFlowInfoTableItem
 */
export interface IFlowInfoTableItem {
  nodeId: string;
  nodeName: string;
  operateDate: string;
  operateDateTime: string;
  operateTime: string;
  operateType: string;
  operatorDept: string;
  operatorId: string;
  operatorName: string;
  receivedPersons: string;
  remark: string;
  [key: string]: any;
}

/**
 * @description 搜索栏组件 props
 * @author yangwen
 * @export
 * @interface ISearchBarProps
 */
export interface ISearchBarProps {
  onSearch: () => void; // 点击搜索触发
  onSet: (value: string) => void; // 搜索条件赋值
  searchInputValue: string; // 搜索条件值
  onClear?: () => void; // 清空搜索条件触发
  showClear?: boolean; // 输入框是否可以清除
  placeholder?: string;
  maxLength?: number;
  showSearchIcon?: boolean; // 是否展示搜索图标
  children?: React.ReactNode;
  showSearchText?: boolean; // 是否展示搜索按钮
  inputRef?: React.Ref<any>;

  isLandscape: boolean; // 是否横屏展示
  clientWidth: number; // 动态监听屏幕宽度
  clientHeight: number; // 动态监听屏幕高度
}
