import { UserAgentEnum, WXJSApis } from './types';
import { CommonService } from '@/services';
import EnvUtil from './EnvUtil';

const jsApiList: WXJSApis[] = ['chooseImage', 'uploadImage', 'previewImage', 'downloadImage'];

export default class WeixinUtil {
  static init = (): Promise<boolean> =>
    new Promise((resolve) => {
      // 获取 userAgent
      const userAgent = EnvUtil.getUserAgent();
      // 非 企业微信环境 直接 return
      if (UserAgentEnum.WXWORK !== userAgent) {
        resolve(false);
        return;
      }

      // 后台提供的获取签名的接口
      CommonService.getJsapiSign('currentUrl', {
        agentConfig: false,
      })
        .then((configResult) => {
          console.log('configResult->', configResult);
          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'xxxxxx', // 必填，企业微信的corpID，必须是本企业的corpID，不允许跨企业使用
            timestamp: configResult.timestamp, // 必填，生成签名的时间戳
            nonceStr: configResult.noncestr, // 必填，生成签名的随机串
            signature: configResult.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          });

          wx.ready(() => {
            console.log('wx.config 注册成功');
            resolve(true);
          });
          wx.error((res) => {
            console.log('wx.config 注册失败->', res);
            resolve(false);
          });
        })
        .catch((error) => {
          console.log('error->', error);
          resolve(false);
        });
    });
}
