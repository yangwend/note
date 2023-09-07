import { UserAgentEnum, PlatformEnum } from './types';

export default class EnvUtil {
  /**
   * @description 获取userAgent
   */
  static getUserAgent = () => {
    const { userAgent: agent } = navigator;
    if (-1 !== agent.indexOf('MicroMessenger')) {
      if (agent.indexOf('wxwork') !== -1) {
        return UserAgentEnum.WXWORK;
      }
      return UserAgentEnum.MICRO_MESSENGER;
    } else if (-1 !== agent.indexOf('Alipay')) {
      return UserAgentEnum.ALIPAY;
    } else {
      return UserAgentEnum.OTHER;
    }
  };

  /**
   * @description 是否微信环境
   */
  static isWeixinEnv = () => {
    return navigator.userAgent.indexOf('MicroMessenger') !== -1;
  };

  /**
   * @description 是否是企微环境
   * @author yangwen
   * @static
   * @memberof EnvUtil
   */
  static isWXWorkEnv = () => {
    return navigator.userAgent.indexOf('MicroMessenger') !== -1 && navigator.userAgent.indexOf('wxwork') !== -1;
  };

  /**
   * @description 获取客户端平台类型
   */
  static getPlatform = () => {
    const agent = navigator.userAgent; // 客户端类型
    const isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1; // android终端
    const isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      return PlatformEnum.Android;
    } else if (isIOS) {
      return PlatformEnum.IOS;
    }
    return PlatformEnum.Unknown;
  };
}
