import request from './request';
import APIConfig from '@/config';
import { APP_ID, MERCHANT_ID } from '@/constant';

const baseUrl = `${APIConfig.getSddSddOUrl}/xxx`;

const materialBaseUrl = `${APIConfig.getSddOUrl}/xxx`;

export default class CommonService {
  static getJsapiSign = async (url: string, params: { agentConfig?: boolean }): Promise<any> => {
    return request({
      url: `${baseUrl}/getJsapiSign`,
      method: 'POST',
      data: {
        merchantId: MERCHANT_ID,
        mpAppId: APP_ID,
        [url]: window.location.href.split('#')[0],
        ...params,
      },
      isFilterResData: false,
    });
  };

  /**
   * @description 获取临时素材图片，返回 base64 地址
   * @author yangwen
   * @static
   * @param {string} materialId
   * @memberof CommonService
   */
  static getImage = async (materialId: string): Promise<string> => {
    return request({
      url: `${materialBaseUrl}/getImage`,
      method: 'POST',
      data: {
        merchantId: MERCHANT_ID,
        mpAppId: APP_ID,
        materialId,
      },
      isFilterResData: false,
    }) as Promise<string>;
  };
}
