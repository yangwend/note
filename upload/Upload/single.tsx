import { FC, useState, useEffect } from 'react';
import { ImageUploader, Image } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { ImageAssets } from '@/assets';
import UploadUtil from '../UploadUtil';
import styles from './index.module.scss';

interface IUploadSingleProps {
  value?: string;
  onChange?: (val?: string) => void;
  cellSize?: number;
  limitSize?: number; // 文件大小(M)
  tip?: string | React.ReactNode; // 底部文案提示
  header?: string | React.ReactNode; // 顶部文案提示
}

const UploadSingle: FC<IUploadSingleProps> = ({
  value,
  onChange,
  cellSize = 70, // 注意，尺寸过小后上传loading展示会不居中
  limitSize = 10,
  tip,
  header,
}) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  useEffect(() => {
    if (value) {
      setFileList([{ url: value }]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const onUploadChange = (items: ImageUploadItem[]) => {
    console.log('upload items->', items);
    if (items && items.length === 1 && items[0].url) {
      setFileList(items);
      onChange?.(items[0].url);
    } else {
      setFileList([]);
      onChange?.(undefined);
    }
  };

  return (
    <>
      {header}
      <ImageUploader
        style={{ '--cell-size': `${cellSize}px` }}
        value={fileList}
        onChange={onUploadChange}
        upload={UploadUtil.normalUpload}
        beforeUpload={(file) => UploadUtil.beforeUpload(file, limitSize)}
        maxCount={1}
        className={styles.upload}>
        <Image src={ImageAssets.common.icon_upload} width={cellSize} fit='cover' />
      </ImageUploader>
      {tip && <div className={styles.uploadTip}>{tip}</div>}
    </>
  );
};

export default UploadSingle;
