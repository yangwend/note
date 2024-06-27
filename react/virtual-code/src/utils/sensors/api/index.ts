/* eslint-disable camelcase */
import sensors from 'sa-sdk-javascript';
import * as SensorTypes from './types';

export default class SensorApi {
  /**
   * @description 使用工号进行登录
   * @author yangwen
   * @static
   * @param {string} id
   * @memberof SensorApi
   */
  static login = (id: string) => {
    sensors.login(id);
  };

  /**
   * @description 手动上报页面浏览事件
   * @author yangwen
   * @static
   * @memberof SensorApi
   */
  static autoTrack = () => {
    sensors.quick('autoTrackSinglePage');
  };

  /**
   * @description 设置用户属性
   * @author yangwen
   * @static
   * @param {SensorTypes.IProfileParams} value
   * @memberof SensorApi
   */
  static setProfile = (value: SensorTypes.IProfileParams) => {
    sensors.setProfile(value);
  };

  /**
   * @description 自定义事件采集
   * @author yangwen
   * @static
   * @param {string} name
   * @param {*} [params]
   * @memberof SensorApi
   */
  static trackEvent = (name: string, params?: any) => {
    sensors.track(name, params);
  };

  /**
   * @description HTTP 接口请求超时
   * @author yangwen
   * @static
   * @param {SensorTypes.IHttpTimeoutParams} {
   *     req_params = '',
   *     ...restParams
   *   }
   * @memberof SensorApi
   */
  static trackHttpTimeoutEvent = ({
    req_params = '',
    ...restParams
  }: SensorTypes.IHttpTimeoutParams) => {
    SensorApi.trackEvent('api_http_timeout', {
      ...restParams,
      // req_params: JSON.stringify(req_params), // 记录请求参数，暂时不上报
    });
  };

  /**
   * @description HTTP 接口请求失败
   * @author yangwen
   * @static
   * @param {SensorTypes.IHttpErrorParams} {
   *     req_params = '',
   *     req_error = '',
   *     ...restParams
   *   }
   * @memberof SensorApi
   */
  static trackHttpErrorEvent = ({
    req_params = '',
    req_error = '',
    ...restParams
  }: SensorTypes.IHttpErrorParams) => {
    SensorApi.trackEvent('api_http_error', {
      ...restParams,
      // req_params: JSON.stringify(req_params), // 记录请求参数，暂时不上报
      req_error: JSON.stringify(req_error), // 记录请求失败的 Error 报错
    });
  };

  /**
   * @description 企微 JSSDK 注册失败
   * @author yangwen
   * @static
   * @param {SensorTypes.IWxConfigErrorParams} {
   *     config_error = '',
   *     ...restParams
   *   }
   * @memberof SensorApi
   */
  static trackWxConfigErrorEvent = ({
    config_error = '',
    ...restParams
  }: SensorTypes.IWxConfigErrorParams) => {
    SensorApi.trackEvent('wx_config_error', {
      ...restParams,
      config_error: JSON.stringify(config_error), // 记录注册失败的 Error 报错
    });
  };
}
