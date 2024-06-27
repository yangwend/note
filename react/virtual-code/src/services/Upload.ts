import request from './request';
import APIConfig from '@/config';

const uploadBaseUrl = `${APIConfig.getApiPrefix}/xxx`;

export default class UploadService {
  /**
   * @description 获取文件上传签名信息
   * @author yangwen
   * @static
   * @param {{ fileName: string }} data
   * @memberof UploadService
   */
  static loadSignatureApi = async (data: { fileName: string }): Promise<any> => {
    return request({
      url: `${uploadBaseUrl}/xxx`,
      method: 'POST',
      data,
      isFilterResData: false,
    });
  };

  /**
   * @description 上传到xxx
   * @author yangwen
   * @static
   * @param {{ url: string; formData: FormData }} { url, formData }
   * @memberof UploadService
   */
  static FileUploadApi = ({ url, formData }: { url: string; formData: FormData }) => {
    return request({
      url,
      method: 'POST',
      data: formData,
      submitDataType: 'form',
      credentials: null,
    });
  };

  /**
   * @description 企微 根据 mediaId 获取最终 xx 地址
   * @author yangwen
   * @static
   * @param {string} mediaId
   * @memberof UploadService
   */
  static uploadByMediaId = (mediaId: string): Promise<string> => {
    return request({
      url: `sdsdsdsdsdsd`,
      method: 'POST',
      data: { mediaId },
      isFilterResData: false,
      isShowErrorMessage: false,
    }) as Promise<string>;
  };
}
