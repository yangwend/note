/* eslint-disable spellcheck/spell-checker */
/*
 * 通用上传图片服务
 */
import { UploadService, CommonService } from '@/services';
import { Toast } from 'antd-mobile';
import ImageUtil from './ImageUtil';
import ToolUtil from './ToolUtil';

interface IUploadOption {
  maxSize?: number;
  count?: number;
}

export default class UploadUtil {
  /**
   * @description 上传方法，入参是需要被上传的文件对象，经过异步处理之后，返回上传结果
   * @author yangwen
   * @static
   * @param {File} file
   * @memberof UploadUtil
   */
  static normalUpload = async (file: File) => {
    try {
      // 设置 uuid + 后缀 作为文件名
      const nameList = file.name.split('.');
      const result = await UploadService.loadOssSignatureApi({
        fileName: `${nameList[0] || ''}-${ToolUtil.uuidGen()}.${nameList[nameList.length - 1] || ''}`,
      });
      const formdata = new FormData();
      formdata.append('name', file.name);
      formdata.append('key', result.key);
      formdata.append('policy', result.policy);
      formdata.append('OSSAccessKeyId', result.accessId);
      formdata.append('signature', result.signature);
      formdata.append('file', file);
      await UploadService.ossFileUploadApi({ url: result.host, formData: formdata });
      return { url: result.url };
    } catch (error) {
      return { url: '' };
    }
  };

  /**
   * @description 文件读取前的回调函数，返回 null 可终止文件读取，支持返回 Promise
   * @author yangwen
   * @static
   * @param {File} file
   * @param {number} limitSize
   * @memberof UploadUtil
   */
  static beforeUpload = async (file: File, limitSize: number) => {
    console.log('file-->', file, file.type, file.name);
    if (['image/jpeg', 'image/jpg'].includes(file.type) && file.size > limitSize * 1024 * 1024) {
      console.log(`图片压缩前大小为-->${file.size / 1024 / 1024}M`);
      try {
        const newFile = await ImageUtil.imgCompress({
          file,
          widthScale: 4 / 5,
          limitSize,
        });
        console.log(`图片压缩后大小为-->${newFile.size / 1024 / 1024}M`);
        return newFile;
      } catch (error) {
        Toast.show('图片上传失败，请重试');
        return null;
      }
    }
    return file;
  };

  /**
   * @description 通过 serverId 获取最终的 oss 地址
   * @author yangwen
   * @static
   * @param {string} serverId
   * @memberof UploadUtil
   */
  static uploadImgToOss1 = async (serverId: string): Promise<string> => {
    try {
      const url: string = await UploadService.uploadByMediaId(serverId);
      console.log(`url=`, url);
      return url;
    } catch (error) {
      throw new Error('图片上传失败');
    }
  };

  /**
   * @description 通过 serverId 获取最终的 oss 地址
   * @author yangwen
   * @static
   * @param {string} serverId
   * @memberof UploadUtil
   */
  static uploadImgToOss = async (serverId: string): Promise<string> => {
    try {
      const base64Str = await CommonService.getImage(serverId);
      console.log('base64Str->', base64Str);
      if (base64Str) {
        const newFile = ImageUtil.dataURItoFile(`data:image/jpeg;base64,${base64Str}`, `xxx.jpeg`);
        // const file = ImageUtils.dataURLtoFile(
        //   `data:image/png;base64,${base64Str}`,
        //   `xxx.png`,
        // );
        console.log(`图片大小为-->${newFile.size / 1024 / 1024}M`);
        const res = await UploadUtil.normalUpload(newFile);
        if (!res.url) {
          throw new Error('图片上传失败');
        }
        return res.url as string;
      } else {
        throw new Error('图片上传失败');
      }
    } catch (error) {
      throw new Error('图片上传失败');
    }
  };

  /**
   * @description 拍照或选择图片
   * @author yangwen
   * @static
   * @param {number} [count=1]
   * @memberof UploadUtil
   */
  static chooseImage = async (count: number = 1): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sizeType: ['compressed'], // 指定压缩图
        sourceType: ['album'], // 指定来源为相册
        success: (res: {
          sourceType: string; // weixin album camera
          localIds: string[];
          errMsg: string;
        }) => {
          console.log('res->', res);
          const localIds: string[] = res.localIds;
          if (localIds && localIds.length > 0) {
            resolve(localIds);
          } else {
            reject('图片获取失败');
          }
        },
        cancel: () => {
          console.log('取消上传');
        },
      });
    });
  };

  /**
   * @description 图片上传
   * @author yangwen
   * @static
   * @param {string} localId
   * @memberof UploadUtil
   */
  static uploadImage = async (localId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
        localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: ({ serverId }: { serverId: string }) => {
          resolve(serverId);
        },
        fail: (err: any) => {
          reject(err);
        },
        cancel: (err: any) => {
          reject(err);
        },
      });
    });
  };

  /**
   * @description 图片组件上传
   * @author yangwen
   * @static
   * @param {IUploadOption} [{ count = 1 }={}]
   * @memberof UploadUtil
   */
  static upload = async ({ count = 1 }: IUploadOption = {}): Promise<string[]> => {
    try {
      const localIds: string[] = await UploadUtil.chooseImage(count);
      console.log(`localIds=`, localIds);
      Toast.show({ content: '上传中', duration: 0, icon: 'loading', maskClickable: false });
      const serverIds = await Promise.all(localIds.map((localId: string) => UploadUtil.uploadImage(localId)));
      console.log(`serverIds=`, serverIds);
      const urls: string[] = await Promise.all(
        serverIds.map((serverId: string) => UploadUtil.uploadImgToOss(serverId))
      );
      console.log(`urls=`, urls);
      Toast.clear();
      return urls;
    } catch (error) {
      console.log('error->', error);
      Toast.clear();
      Toast.show((error as any)?.message ?? '系统错误');
      return [];
    }
  };
}
