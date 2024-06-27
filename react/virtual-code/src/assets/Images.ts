/* eslint-disable camelcase */

/**
 * 获取图片资源文件url路径
 */
// const getImageUrl = (path: string) => {
//   // return new URL(`.${path}`, import.meta.url).href;
//   return path;
// };

/**
 * create by dadange 2022-04-12
 * 图片管理类
 */
const ImageAssets = {
  /** 为了区分图片，此处按照不同的功能板块将图片分类 */
  common: {
    icon_close: './assets/images/common/icon_close.svg',
    icon_check_disabled: './assets/images/common/icon_check_disabled.svg',
    icon_checked: './assets/images/common/icon_checked.svg',
    icon_un_check: './assets/images/common/icon_un_check.svg',
    icon_goods_default: './assets/images/common/icon_goods_default.png',
    icon_upload: './assets/images/common/icon_upload.svg',
    icon_question: './assets/images/common/icon_question.svg',
  },
  empty: {
    pic_default_empty: './assets/images/empty/pic_default_empty.png',
  },
  error: {
    pic_default_error: './assets/images/error/pic_default_error.png',
  },
};

export default ImageAssets;
