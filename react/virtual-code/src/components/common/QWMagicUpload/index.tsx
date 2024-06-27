import { FC, useCallback, useState } from 'react';
import { Image, ImageViewer } from 'antd-mobile';
import { useDeepCompareEffect } from 'ahooks';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { ImageAssets } from '@/assets';
import { ToolUtil, UploadUtil } from '@/utils';
import styles from './index.module.scss';

interface IQWMagicUploadProps {
  value?: string[];
  onChange?: (val: string[]) => void;
  tip?: string | React.ReactNode; // 底部文案提示
  header?: string | React.ReactNode; // 顶部文案提示
  maxCount?: number; // 最多上传几张图片，超出数量会自动隐藏上传按钮，0 表示不做限制
}

const QWMagicUpload: FC<IQWMagicUploadProps> = ({
  value = [],
  onChange,
  tip,
  header,
  maxCount = 1,
}) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [preview, setPreview] = useState<{
    show: boolean;
    img: string;
  }>({
    show: false,
    img: '',
  });

  useDeepCompareEffect(() => {
    if ((value ?? [])?.length > 0) {
      setFileList(value?.map((valueItem) => ({ url: valueItem, key: ToolUtil.uuidGen() })) ?? []);
    } else {
      setFileList([]);
    }
  }, [value]);

  // 增加图片
  const onAddImg = useCallback(async () => {
    try {
      const urls = await UploadUtil.upload({ count: maxCount - fileList.length });
      const newFileList = [...fileList, ...urls.map((url) => ({ url, key: ToolUtil.uuidGen() }))];
      setFileList(newFileList);
      onChange?.(newFileList.map((fileItem) => fileItem.url));
    } catch (error) {
      console.log('error->', error);
    }
  }, [fileList, maxCount, setFileList, onChange]);

  // 删除图片
  const onDelImg = useCallback(
    (item: ImageUploadItem) => {
      const newFileList = fileList.filter((fileItem) => fileItem.key !== item.key);
      setFileList(newFileList);
      onChange?.(newFileList.map((fileItem) => fileItem.url));
    },
    [fileList, setFileList, onChange]
  );

  return (
    <>
      {header}
      <div className={styles.upload}>
        {fileList.map((fileItem) => (
          <div className={styles.fileItem} key={fileItem.key}>
            <div className={styles.fileItemCell}>
              <Image
                src={fileItem.url}
                className={styles.fileItemImg}
                fit="cover"
                onClick={() => {
                  // 图片预览
                  setPreview({
                    show: true,
                    img: fileItem.url,
                  });
                }}
              />
              <div
                className={styles.fileItemDel}
                onClick={(e) => {
                  e.stopPropagation();
                  // 图片删除
                  onDelImg(fileItem);
                }}
              ></div>
            </div>
          </div>
        ))}
        {fileList.length < maxCount && (
          <div className={`${styles.fileItem} ${styles.addItem}`} key="add">
            <div className={styles.fileItemCell}>
              <Image
                src={ImageAssets.common.icon_upload}
                className={styles.fileItemImg}
                fit="cover"
                onClick={onAddImg}
              />
            </div>
          </div>
        )}
      </div>
      <ImageViewer
        image={preview.img}
        visible={preview.show}
        onClose={() => {
          setPreview({
            show: false,
            img: '',
          });
        }}
      />
      {tip && <div className={styles.uploadTip}>{tip}</div>}
    </>
  );
};

export default QWMagicUpload;
