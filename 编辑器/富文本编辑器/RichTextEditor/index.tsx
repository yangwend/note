import { FC, useEffect, useRef, useMemo } from 'react';
import { message, Spin } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { useSetState } from 'ahooks';
// 引入 React Quill 组件
import ReactQuill, { Quill } from 'react-quill';
// 引入组件 snow 样式
import 'react-quill/dist/quill.snow.css';
// 图片放大缩小
import ImageResize from 'quill-image-resize-module-react';
import commonHttp from '@/pages/manager/service/common';
import styles from './index.less';

// base64转file对象
const dataURLtoFile = (dataurl: string, filename: string): File => {
  let arr = dataurl.split(',');

  let mime = '';

  if (!arr.length) {
    throw new Error('dataURL error');
  }

  let dataUrlMatch = arr[0].match(/:(.*?);/);

  if (dataUrlMatch && dataUrlMatch.length) {
    mime = dataUrlMatch[1];
  }

  let bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// 定义中文 title 的配置对象
const titleConfig: Record<string, string> = {
  '.ql-bold': '加粗',
  '.ql-color': '颜色',
  '.ql-font': '字体',
  '.ql-code': '插入代码',
  '.ql-italic': '斜体',
  '.ql-link': '添加链接',
  '.ql-background': '背景颜色',
  '.ql-size': '字号',
  '.ql-strike': '删除线',
  '.ql-script[value="super"]': '上标',
  '.ql-script[value="sub"]': '下标',
  '.ql-underline': '下划线',
  '.ql-blockquote': '引用',
  '.ql-header': '标题',
  '.ql-code-block': '代码块',
  '.ql-list[value="ordered"]': '有序列表',
  '.ql-list[value="bullet"]': '无序列表',
  '.ql-indent[value="+1"]': '增加缩进',
  '.ql-indent[value="-1"]': '减少缩进',
  '.ql-direction': '文本方向',
  '.ql-formula': '插入公式',
  '.ql-image': '插入图片',
  '.ql-video': '插入视频',
  '.ql-clean': '清除字体样式',
  '.ql-lineheight': '行高',
  '.ql-align': '文本对齐',
};

/* 图片缩放 start */
/**
 * @description 插件内部选中图片按删除键的时候导致以下报错（报错的原因是里面写了window.Quill.find）：
    Uncaught TypeError: Cannot read property 'find' of undefined
      at HTMLDocument.checkImage (image-resize.min.js:formatted:1)
   因此重写 ImageResize 模块里的checkImage 方法
 * @author yangwen
 * @class PlainResize
 * @extends {ImageResize}
 */
class PlainResize extends ImageResize {
  checkImage = (evt: any) => {
    if (this.img) {
      if (evt.keyCode == 46 || evt.keyCode == 8) {
        Quill.find(this.img).deleteAt(0);
      }
      this.hide();
    }
  };
}
Quill.register('modules/imageResize', PlainResize); // 注册图片缩放
/* 图片缩放 end */

/* 自定义 quill 编辑器的字体 start */
const fontArr = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong']; // 这里的顺序注意一下
const Font = Quill.import('formats/font');
Font.whitelist = fontArr; // 将字体加入到白名单，这里可在 /formats/fonts.js 中了解
Quill.register(Font, true);
/* 自定义 quill 编辑器的字体 end */

/* 自定义行高 start */
const Parchment = Quill.import('parchment');
const lineHeightStyle = new Parchment.Attributor.Style('lineHeight', 'line-height', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1', '1.5', '1.75', '2', '3', '4', '5'],
});
Quill.register({ 'formats/lineHeight': lineHeightStyle }, true);
/* 自定义行高 end */

const RichTextEditor: FC<{
  ukey?: string;
  value?: string;
  onChange?: (val?: string) => void;
}> = ({ ukey, value = '', onChange }) => {
  const quillRef = useRef<any>(null);
  const [state, setState] = useSetState<{
    uploadStartLoading: boolean; // 上传开始 loading
  }>({
    uploadStartLoading: false,
  });

  // 给工具栏添加属性
  const addTitle = () => {
    // 获取工具栏的容器元素
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      // 遍历配置对象的键值对
      for (let key in titleConfig) {
        if (titleConfig.hasOwnProperty(key)) {
          // 获取对应的按钮元素
          const button: HTMLButtonElement | null = toolbar.querySelector(key);
          // 判断是否存在
          if (button) {
            // 给按钮元素添加 title 属性，值为配置对象的值
            button.title = titleConfig[key];
          }
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => addTitle(), 100);
  }, []);

  // 上传图片至oss
  const prepareUploadWithOss = (file: RcFile, cb: (url: string) => void) => {
    if (!ukey) {
      message.error('请先登录!');
      setState({
        uploadStartLoading: false,
      });
      return;
    }

    const fileName = file.name;
    let fileUrl = ''; // 最终的OSS文件地址

    // 获取签名
    commonHttp
      .getOssSignature({
        fileName: fileName ? fileName : '',
      })
      .then((res: any) => {
        if (res.status === -1) {
          throw new Error(res.message);
        }
        // 上传文件
        const formData = new FormData();
        formData.append('OSSAccessKeyId', res.data.accessId);
        formData.append('policy', res.data.policy);
        formData.append('signature', res.data.signature);
        formData.append('key', res.data.key);
        formData.append('expire', res.data.expire);
        formData.append('file', file);
        fileUrl = res.data.url;

        fetch(res.data.host, {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            // 错误
            if (res.status >= 400) {
              setState({
                uploadStartLoading: false,
              });
              message.error(res.statusText);
              return;
            }

            // 图片地址回调
            cb(fileUrl);

            setState({
              uploadStartLoading: false,
            });
          })
          .catch((err) => {
            message.error(err.message || '图片上传失败');
            setState({
              uploadStartLoading: false,
            });
          });
      })
      .catch((res) => {
        message.error(res.message || '图片上传失败');
        setState({
          uploadStartLoading: false,
        });
      });
  };

  // 图片上传至oss && 插入图片
  const uploadToOssAndInsert = (file: RcFile) => {
    prepareUploadWithOss(file, (fileUrl: string) => {
      const quillEditor = quillRef.current?.getEditor(); // 获取到编辑器本身
      const range = quillEditor.getSelection();
      // 拖拽上传图片的时候，编辑器初始化时没有 focus index 就不存在，range为空
      if (range) {
        quillEditor.insertEmbed(range.index, 'image', fileUrl); // 插入图片
        quillEditor.setSelection(range.index + 1); // 光标位置加1
      } else {
        // 获取内容的总长度（取最后的位置插入图片）
        let valLength = quillRef.current?.unprivilegedEditor?.getLength();
        if (!valLength) {
          valLength = 0;
        }
        quillEditor.insertEmbed(valLength, 'image', fileUrl); // 插入图片
        quillEditor.setSelection(valLength + 1); // 光标位置加1
      }
    }); // 上传图片至oss
  };

  // 点击图片触发的操作
  const handleImageClick = () => {
    // 模拟 input file 点击选择图片及后续操作
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        console.log('点击图片icon触发->', file);
        uploadToOssAndInsert(file as RcFile);
      }
    };
  };

  // 复制粘贴
  const handleImagePaste = (e: any) => {
    let blob;

    if (e.clipboardData) {
      if (!e.clipboardData.items) {
        return;
      }
      const types = e.clipboardData.types || [];

      for (let i = 0; i < types.length; i++) {
        if (types[i] === 'Files') {
          blob = e.clipboardData.items[i];
          break;
        }
      }
      if (blob && blob.kind === 'file') {
        // 取消插件的默认事件
        e.preventDefault();
        if (blob.type.match(/^image\//i)) {
          const file = blob.getAsFile();
          console.log('复制粘贴触发 file->', file);
          uploadToOssAndInsert(file as RcFile);
        } else {
          message.warning('仅支持上传图片！');
        }
      }
    }
  };

  // 拖拽
  const handleImageDrop = (e: any) => {
    // 取消插件的默认事件
    e.preventDefault();
    // 获取到第一个上传的文件对象
    const file = e.dataTransfer.files[0];

    if (file.type.match(/^image\//i)) {
      console.log('拖拽触发 file->', file);
      uploadToOssAndInsert(file as RcFile);
    } else {
      message.warning('仅支持上传图片！');
    }
  };

  // 富文本编辑配置（里面加了handlers方法处理，不用useMemo会导致页面报错编辑器展示不出来）
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ font: fontArr }], // 自定义字体
          [{ size: [] }], // 字体大小设置
          [{ lineheight: ['1', '1.5', '1.75', '2', '3', '4', '5'] }], // 自定义行高
          ['bold', 'italic', 'underline', 'strike'], // 加粗、斜体、下划线、删除线
          [{ align: [] }], // 文本对齐
          [{ direction: 'rtl' }], // 文字输入方向
          [{ color: [] }, { background: [] }], // 颜色、背景色
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // 有序无序列表、减少缩进、增加缩进
          [{ script: 'super' }, { script: 'sub' }], // 上角标、下角标
          ['blockquote', 'code-block'], // 引用、代码块
          ['link', 'image'], // a 链接、图片
          ['clean'], // 清除样式
        ],
        handlers: {
          image: handleImageClick, // 自定义图片上传
          lineheight: (value: string) => {
            // 自定义行高
            if (value) {
              const quillEditor = quillRef.current?.getEditor(); // 获取到编辑器本身
              quillEditor.format('lineHeight', value);
            }
          },
        },
      },
      clipboard: {
        matchers: [[]],
      },
      imageResize: {
        // 调整图片尺寸
        displayStyles: {
          border: 'none',
        },
        parchment: Quill.import('parchment'),
        // 先不要 Toolbar 这个图片位置调整的按钮，下次初始化编辑的时候会导致 style 样式丢失
        // modules: ['Resize', 'DisplaySize', 'Toolbar'],
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    []
  );

  const handleChange = (
    value: string,
    delta: any,
    source: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const delta_ops = delta.ops;
    const quillContent = editor.getContents();
    if (delta_ops && delta_ops.length) {
      quillContent?.ops?.map((item) => {
        if (item.insert) {
          const imgStr = item.insert.image;
          // 若图片粘贴后为base64，则转换为文件形式后再上传到服务器
          if (
            imgStr &&
            ['data:image/png;base64', 'data:image/jpg;base64', 'data:image/jpeg;base64'].includes(
              imgStr
            )
          ) {
            const file = dataURLtoFile(imgStr, '');
            prepareUploadWithOss(file as RcFile, (fileUrl: string) => {
              item.insert.image = fileUrl;
              onChange?.(value);
            });
          } else {
            onChange?.(value);
          }
        }
      });
    }

    onChange?.(value);
  };

  return (
    // 在ReactQuill的父容器加复制粘贴和拖拽事件，ReactQuill没有暴露这些事件
    // 不用dom监听方法，避免dom有重复，导致监听重复
    // document.getElementById(mdEditorDomId).addEventListener('paste', handlerImagePaste, false);
    // document.getElementById(mdEditorDomId).addEventListener('drop', handlerImageDrop, false);
    <Spin spinning={state.uploadStartLoading}>
      <div onPaste={handleImagePaste} onDrop={handleImageDrop}>
        <ReactQuill
          className={styles.editArea}
          placeholder='请输入'
          ref={quillRef}
          theme='snow'
          value={value}
          onChange={handleChange}
          modules={modules}
        ></ReactQuill>
      </div>
    </Spin>
  );
};

export default RichTextEditor;
