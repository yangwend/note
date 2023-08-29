## html2canvas

例子：

```tsx
html2canvas(shareEle.current, {
  useCORS: true,
  backgroundColor: 'transparent',
  scale: window.devicePixelRatio,
}).then((canvas: HTMLCanvasElement) => {
  const img = new Image();
  img.src = canvas.toDataURL('image/png');

  setState({
    shareImgUrl: img.src,
    shareVisible: true,
  });
});
```

### 在 react 中使用

```tsx
import React, { useRef } from 'react';
import { Button } from 'antd';
import printPage from 'html2canvas';

const Index = () => {
  const printElement = useRef() as React.MutableRefObject<any>;

  const onPrintPage = async () => {
    const ele = printElement.current as HTMLDivElement;
    const canvas = await printPage(ele);
    const dataImg = new Image();
    dataImg.src = canvas.toDataURL('image/png');
    const aTag = document.createElement('a');
    aTag.href = dataImg.src;
    aTag.download = '统计报告.png';
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  };

  return (
    <>
      <Button onClick={onPrintPage}>点击下载</Button>
      <div ref={printElement}>下载区域内容</div>
    </>
  );
};

export default Index;
```

### 使用 bug

以下是使用过程中出现的 bug 和坑

#### 图片跨域

配置 useCORS: true

给每个图片设置允许跨域：crossOrigin=“anonymous”

<div style="color: red">
注意：如果图片的分辨率过大（高度大于 5000），则图片转成 base64 时会失败。
解决办法：在转化为 base64 时判断图片分辨率，大于 5000 的压缩。
</div>

#### 暂不支持的 css 样式

background-blend-mode
background-clip: text
box-decoration-break
repeating-linear-gradient()
font-variant-ligatures
mix-blend-mode
writing-mode
border-image
box-shadow
filter
zoom
transform（有限支持）
object-fit

<div style="color: red">
注意：有一些 css 样式没有办法直接识别，比如新增的 css，渐变，或者是 border-radius: 50%; 是没有效果的，必须要写成固定的数值才可以，正确写法：border-radius: 50px
</div>

#### 生成的图片中出现线条，特别是图片之间

原因：元素之间有间距；父级元素加 font-size: 0px 就能消除间距，同时 **图片不能使用背景图片(会产生多余的线条，原因未知)，需使用 img 标签**。

<div style="color: red">
注意：需要生成 html2canvas 的 dom 最好不要使用背景图片，不然会模糊，而且仅 相对路径下的图片 可以显示，网络图片和线上图片都会因为跨域而丢失。
</div>

#### 隐藏 dom 实现截图

给最外层盒子偏离可视区域，-999999999px 让元素处于隐藏状态。。。
margin-top: -999999999px;

#### 定位影响截图

1. 在弹窗中实现截图，最外层使用 fixed 之后需要使用定位，最好使用 absolute（使用 fixed 容易出现截图不全或白边）
2. 使用旋转属性 transform: translate(-50%，-50%）；translate 不要使用第三个（容易出现出现截图不全或白边）
3. 当前截图中使用背景图片生成的图片背景很模糊时【background: url(xxx)、background-image: url()】 解决方案：不用背景图采用 img 标签

#### 解决生成图片模糊不清楚

第一种：

```js
// 本地的 html2canvas 版本为  "^0.5.0-beta4",
import html2canvas from 'html2canvas';
   DPR() { // 获取设备dpi
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
      }
      return 1;
    },
    drawCanvas() {
        setTimeout(() => {
          // 获取想要转换的 DOM 节点
          const dom = document.querySelector('.report');
          const box = window.getComputedStyle(dom);
          // DOM 节点计算后宽高
          const width = parseInt(box.width, 10);
          const height = parseInt(box.height, 10);
          // 获取像素比
          const scaleBy = this.DPR();
          // 创建自定义 canvas 元素
          const canvas = document.createElement('canvas');
          // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
          canvas.width = width * scaleBy;
          canvas.height = height * scaleBy;
          // 设定 canvas css宽高为 DOM 节点宽高
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          // 获取画笔
          const context = canvas.getContext('2d');
          // 将所有绘制内容放大像素比倍
          context.scale(scaleBy, scaleBy);
          // 将自定义 canvas 作为配置项传入，开始绘制
          html2canvas(dom, {canvas, background: '#ffffff'}).then((imgDom) => {
            let url= imgDom.toDataURL();
               console.log(url) // 此时的url是图片的base64格式，可直接赋值到img的src上
          })
        }, 2000);
    },

```

第二种：

```js
import '@/assets/js/html2canvas.js'; // 引入刚刚自己下载的js文件
// 调用的方法
html2canvas(document.querySelector('.report'), {
  // 以下字段可选
  width: 490, // canvas宽度
  height: 240, // canvas高度
  x: 0, // x坐标
  y: 0, // y坐标
  foreignObjectRendering: true, // 是否在浏览器支持的情况下使用ForeignObject渲染
  useCORS: true, // 是否尝试使用CORS从服务器加载图像
  async: false, // 是否异步解析和呈现元素
  // 以下字段必填
  background: '#ffffff', // 一定要添加背景颜色，否则出来的图片，背景全部都是透明的
  scale: 2, // 处理模糊问题
  dpi: 300, // 处理模糊问题
  onrendered: function (canvas) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
    // let url = canvas.toDataURL('image/png', 1.0)
    let url = canvas.toDataURL();
    console.log(url);
  },
});
```

<div style="color: red">
注意：如果项目的背景色默认是白色的，你自己也没有给项目添加颜色，生成后的图片就是带透明效果，所以要给 html 添加一个白色背景颜色
</div>

### 参考链接

1. [关于 html2canvas 的 bug 总结](https://blog.csdn.net/Gemini_7S/article/details/125640709)
2. [在 React 中，使用 html2canvas，进行截屏下载](https://blog.csdn.net/ly18314524152/article/details/124303687)
3. [关于 Html2canvas 使用及注意事项，解决背景图片模糊等问题](https://blog.csdn.net/qq_35260798/article/details/125144004)
4. [html2canvas 生成图片模糊 不清楚？两种解决方法](https://blog.csdn.net/weixin_44309374/article/details/106924138)
