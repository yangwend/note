export default class ToolUtils {
  /**
   * @description 判断是否支持 webp 格式
   * @author yangwen
   * @static
   * @memberof ToolUtils
   */
  static checkWebpSupport = () => {
    const isWebp = window.document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return isWebp;
  };

  /**
   * @description 图片质量压缩，输出压缩和模糊后的图片 url
   * @author yangwen
   * @static
   * @param {string} [imgUrl]
   * @param {{ w?: number; h?: number }} [{ w = 600, h = 0 }={}]
   * @memberof ToolUtils
   */
  static getImgUrlWithOssSuffix = (imgUrl?: string, { w = 600, h = 0 }: { w?: number; h?: number } = {}) => {
    if (!imgUrl) {
      return '';
    }

    if (!/^https?:\/\//.test(imgUrl)) {
      return imgUrl;
    }

    const isWebp = !!window.localStorage.getItem('__SUPPORT_WEBP_KEY');
    const format = isWebp ? 'webp' : undefined;
    const resizeOptions = [...(w > 0 ? [`w_${w}`] : []), ...(h > 0 ? [`h_${h}`] : [])];
    const resizeStr = resizeOptions.length > 0 ? `resize,${resizeOptions.join(',')}` : undefined;
    const formatStr = !!format ? `format,${format}` : undefined;
    const returnUrl = `${imgUrl}${imgUrl.indexOf('?') > -1 ? '&' : '?'}x-oss-process=image/${[
      resizeStr,
      'quality,q_80',
      formatStr,
    ]
      .filter((item) => !!item)
      .join('/')}`;
    return returnUrl;
  };
}
