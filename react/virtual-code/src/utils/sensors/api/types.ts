/* eslint-disable camelcase */
export interface IProfileParams {
  companyName?: string; // 录像名称
  staffCode?: string; // 员工工号
  staffName?: string; // 员工名称
  orgName?: string; // 选中的组织机构名称
  positionName?: string; // 岗位名称
  roleName?: string; // 角色名称
}

export interface IHttpTimeoutParams {
  req_url?: string;
  req_params?: any;
}

export interface IHttpErrorParams {
  req_url?: string;
  req_params?: any;
  req_error?: any;
}

export interface IWxConfigErrorParams {
  user_agent?: string;
  config_error?: any;
}
