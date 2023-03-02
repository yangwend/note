/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable spellcheck/spell-checker */
export default class ImageUtil {
  /**
   * @description base64 转换为 blob 流
   * @author yangwen
   * @static
   * @param {string} base64Data
   * @memberof ImageUtil
   */
  static dataURItoBlob = (base64Data: string) => {
    // base64 解码
    const byteString = atob(base64Data);
    // 创建视图
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: '',
    });
    return URL.createObjectURL(blob);
  };

  /**
   * @description blob 流 转换为 base64
   * @author yangwen
   * @static
   * @param {Blob} blob
   * @memberof ImageUtil
   */
  static blobToDataURI = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      return (e as any).target.result;
    };
  };

  /**
   * @description base64 转换为 file
   * @author yangwen
   * @static
   * @param {string} dataUrl
   * @param {string} fileName
   * @memberof ImageUtil
   */
  static dataURItoFile = (dataUrl: string, fileName: string) => {
    const arr = dataUrl.split(',');
    const mime = arr.length > 1 ? (arr[0].match(/:(.*?);/) || [])[1] || '' : '';
    const bstr = arr.length > 1 ? atob(arr[1]) : atob(arr[0]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  /**
   * @description jpeg格式的图片压缩
   * @author yangwen
   * @static
   * @param {File} file 文件(类型是图片格式)
   * @param {number} widthScale 文件压缩比例，比例越小，宽度越小，字节越小
   * @param {number} [quality=0.9] quality 值越小，所绘制出的图像越模糊
   * @memberof ImageUtil
   */
  static jpegImgCompress = (file: File, widthScale: number, quality = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
      const ready = new FileReader();
      ready.readAsDataURL(file);
      ready.onload = (e: any) => {
        const path = e.target.result;
        const img = new Image();
        img.src = path;
        img.onload = (e: any) => {
          const that = e.target || {};
          // 默认按比例压缩
          let w = that.width;
          let h = that.height;
          if (widthScale < 1) {
            w = w * widthScale;
            h = h * widthScale;
          }
          // 生成 canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          // 创建属性节点
          const anw = document.createAttribute('width');
          anw.nodeValue = w;
          const anh = document.createAttribute('height');
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx?.drawImage(that, 0, 0, w, h);
          // quality 值越小，所绘制出的图像越模糊
          const base64Codes = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回 base64 的值
          resolve(base64Codes);
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
      ready.onerror = (error) => {
        reject(error);
      };
    });
  };

  /**
   * @description 多次循环压缩至 limitSize及以下
   * @author yangwen
   * @static
   * @param {File} file
   * @param {number} [limitSize=10]
   * @memberof ImageUtil
   */

  static imgCompress = async ({
    file,
    widthScale,
    limitSize = 10,
    quality = 0.9,
  }: {
    file: File;
    widthScale: number;
    limitSize?: number;
    quality?: number;
  }): Promise<File> => {
    const base64Codes = await ImageUtil.jpegImgCompress(file, widthScale, quality);
    const newFile = ImageUtil.dataURItoFile(base64Codes, file.name);
    if (newFile.size > limitSize * 1024 * 1024) {
      return await ImageUtil.imgCompress({
        file: newFile,
        widthScale,
        limitSize,
        quality,
      });
    }
    return newFile;
  };
}
