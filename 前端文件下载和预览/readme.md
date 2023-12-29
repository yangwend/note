https://blog.csdn.net/qq_41619796/article/details/114523103

https://www.jianshu.com/p/792f09b77eae

https://blog.51cto.com/u_15080026/4538467

todo

### vue 版本支持 docx、pdf、excel 预览

1. https://www.npmjs.com/package/@vue-office/excel

### react 版本支持 docx、pdf、excel 预览

2. https://501351981.github.io/vue-office/examples/docs/guide/js-preview.html

```tsx
import { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import { getImgUrlWithOssSuffix } from '@/public/utils/baseTool';

interface IProPreviewModalProps {
  open?: boolean;
  url?: string;
  title?: string;
  onCancel?: () => void;
}

const ImageView: FC<{ url?: string }> = ({ url }) => (
  <div style={{ maxHeight: 'calc(100vh - 240px', overflow: 'auto' }}>
    <img alt='图片' style={{ width: '100%' }} src={getImgUrlWithOssSuffix(url, { w: 0 })} />
  </div>
);

const ProPreviewModal: FC<IProPreviewModalProps> & {
  open: (options: Omit<IProPreviewModalProps, 'open' | 'onCancel'>) => ReactNode;
} = ({ open, url, title = '图片预览', onCancel }) => {
  return (
    <Modal visible={open} title={title} footer={null} onCancel={onCancel} centered>
      <ImageView url={url} />
    </Modal>
  );
};

ProPreviewModal.open = ({ url, title }: Omit<IProPreviewModalProps, 'open' | 'onCancel'>) => {
  Modal.info({
    icon: title ? undefined : null,
    title,
    content: <ImageView url={url} />,
    okText: '确定',
    centered: true,
  });
};

export default ProPreviewModal;
```

```tsx
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable spellcheck/spell-checker */
import { FC, useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import jsPreviewDocx from '@js-preview/docx';
import '@js-preview/docx/lib/index.css';
import jsPreviewExcel from '@js-preview/excel';
import '@js-preview/excel/lib/index.css';
import jsPreviewPdf from '@js-preview/pdf';
import { ProPreviewModal } from '@/pages/manager/component';
import './index.less';

interface IProps {
  open?: boolean;
  url?: string;
  title?: string;
  onCancel?: () => void;
}

/**
 * @description 获取文件后缀
 * @author yangwen
 * @param {string} url
 * @return {*}
 */
const getFileSuffix = (url: string) => {
  if (!url) {
    return '';
  }

  const nameList: string[] = url.split('.').filter((a) => !!a);

  if (nameList.length === 0) {
    return '';
  }

  const suffix = nameList[nameList.length - 1];
  return suffix.toLocaleUpperCase();
};

const ProFilePreview: FC<IProps> = ({ open = false, url = '', title = '文件预览', onCancel }) => {
  const [suffix, setSuffix] = useState<string>('');

  useEffect(() => {
    setSuffix(getFileSuffix(url));
  }, [url]);

  useEffect(() => {
    // docx，支持预览
    if (['DOCX'].includes(suffix)) {
      if (document.getElementById('GOODS_CENTER_UNIQUE_DOCX')) {
        // 初始化时指明要挂载的父元素Dom节点
        const myDocxPreviewer = jsPreviewDocx.init(document.getElementById('GOODS_CENTER_UNIQUE_DOCX')!);
        // 传递要预览的文件地址即可
        myDocxPreviewer
          .preview(url)
          .then((res) => {
            console.log('预览完成');
          })
          .catch((e) => {
            console.log('预览失败', e);
            message.error(`预览失败：${(e as any)?.message}`, 4);
          });
      }
      return;
    }

    // pdf，支持预览
    if (['PDF'].includes(suffix)) {
      if (document.getElementById('GOODS_CENTER_UNIQUE_PDF')) {
        // 初始化时指明要挂载的父元素Dom节点
        const myPdfPreviewer = jsPreviewPdf.init(document.getElementById('GOODS_CENTER_UNIQUE_PDF')!);
        // 传递要预览的文件地址即可
        myPdfPreviewer
          .preview(url)
          .then((res) => {
            console.log('预览完成');
          })
          .catch((e) => {
            console.log('预览失败', e);
            message.error(`预览失败：${(e as any)?.message}`, 4);
          });
      }
      return;
    }

    // excel，支持预览
    if (['XLS', 'XLSX'].includes(suffix)) {
      if (document.getElementById('GOODS_CENTER_UNIQUE_EXCEL')) {
        // 初始化时指明要挂载的父元素Dom节点
        const myExcelPreviewer = jsPreviewExcel.init(document.getElementById('GOODS_CENTER_UNIQUE_EXCEL')!);
        // 传递要预览的文件地址即可
        myExcelPreviewer
          .preview(url)
          .then((res) => {
            console.log('预览完成');
          })
          .catch((e) => {
            console.log('预览失败', e);
            message.error(`预览失败：${(e as any)?.message}`, 4);
          });
      }
      return;
    }
  }, [suffix]);

  if (!url || !suffix) {
    return null;
  }

  // 非图片、docx、pdf、excel，其余都直接走下载方式
  if (!['BMP', 'JPG', 'JPEG', 'PNG', 'GIF', 'DOCX', 'PDF', 'XLS', 'XLSX'].includes(suffix)) {
    window.open(url, '_blank');
    return null;
  }

  // 图片支持预览
  if (['BMP', 'JPG', 'JPEG', 'PNG', 'GIF'].includes(suffix)) {
    return <ProPreviewModal open={open} url={url} onCancel={onCancel} />;
  }

  return (
    <>
      <Modal
        width={1000}
        visible={open}
        title={title}
        footer={null}
        onCancel={onCancel}
        centered
        bodyStyle={{ minHeight: 350, maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
        <div id='GOODS_CENTER_UNIQUE_DOCX'></div>
        <div id='GOODS_CENTER_UNIQUE_PDF'></div>
        <div id='GOODS_CENTER_UNIQUE_EXCEL'></div>
      </Modal>
    </>
  );
};

export default ProFilePreview;
```

### react 支持很多类型的文件预览

3. https://github.com/Alcumus/react-doc-viewer

```tsx
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable spellcheck/spell-checker */
import { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface IProps {
  open?: boolean;
  url?: string;
  title?: string;
  onCancel?: () => void;
}

/**
 * @description 获取文件后缀
 * @author yangwen
 * @param {string} url
 * @return {*}
 */
const getFileSuffix = (url: string) => {
  if (!url) {
    return '';
  }

  const nameList: string[] = url.split('.').filter((a) => !!a);

  if (nameList.length === 0) {
    return '';
  }

  const suffix = nameList[nameList.length - 1];
  return suffix.toLocaleLowerCase();
};

const ProFilePreview1: FC<IProps> = ({ open = false, url = '', title = '文件预览', onCancel }) => {
  const [suffix, setSuffix] = useState<string>('');

  useEffect(() => {
    setSuffix(getFileSuffix(url));
  }, [url]);

  if (!url || !suffix) {
    return null;
  }

  // 非如下文件类型，都直接走下载方式
  if (
    ![
      'bmp',
      'doc',
      'docx',
      'htm',
      'html',
      'jpg',
      'jpeg',
      'pdf',
      'png',
      'ppt',
      'pptx',
      'tiff',
      'txt',
      'xls',
      'xlsx',
    ].includes(suffix)
  ) {
    window.open(url, '_blank');
    return null;
  }

  return (
    <Modal width={1000} visible={open} title={title} footer={null} onCancel={onCancel} centered>
      <DocViewer
        documents={[{ uri: url, fileType: suffix }]}
        pluginRenderers={DocViewerRenderers}
        style={{ width: '100%', height: 'calc(100vh - 200px)' }}
      />
    </Modal>
  );
};

export default ProFilePreview1;
```
