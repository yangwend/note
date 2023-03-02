import { Toast } from 'antd-mobile';
import ImageUtil from './imageUtil';

const beforeUpload = async (file: File, limitSize = 10) => {
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
