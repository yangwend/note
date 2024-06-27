import { FC, useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { ImageUploader, Image } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { ImageAssets } from '@/assets';
import { UploadUtil } from '@/utils';
import styles from './index.module.scss';

interface IMagicUploadProps {
  value?: string[];
  onChange?: (val: string[]) => void;
  cellSize?: number;
  limitSize?: number; // 文件大小(M)
  tip?: string | React.ReactNode; // 底部文案提示
  header?: string | React.ReactNode; // 顶部文案提示
  maxCount?: number; // 最多上传几张图片，超出数量会自动隐藏上传按钮，0 表示不做限制
  multiple?: boolean; // 是否支持选择多张图片
}

const MagicUpload: FC<IMagicUploadProps> = ({
  value = [],
  onChange,
  cellSize = 70, // 注意，尺寸过小后上传loading展示会不居中
  limitSize = 10,
  tip,
  header,
  maxCount = 1,
  multiple = false,
}) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  useDeepCompareEffect(() => {
    if ((value ?? [])?.length > 0) {
      setFileList(value?.map((valueItem) => ({ url: valueItem })) ?? []);
    } else {
      setFileList([]);
    }
  }, [value]);

  const onUploadChange = (items: ImageUploadItem[]) => {
    console.log('upload items->', items);
    const finalItems = items.filter((item) => !!item.url);
    setFileList(finalItems);
    onChange?.(finalItems.map((item) => item.url));
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
        maxCount={maxCount}
        multiple={multiple}
        className={styles.upload}
      >
        <Image src={ImageAssets.common.icon_upload} width={cellSize} fit="cover" />
      </ImageUploader>
      {tip && <div className={styles.uploadTip}>{tip}</div>}
    </>
  );
};

export default MagicUpload;
