## window.print 实现打印功能

有时候我们会遇到需要打印和预览某一个页面或者某一块内容的需求。一般来说，我们会通过编写 DOM 和样式来实现预览，打印则基于预览的基础上来生成 PDF 或连接打印机等。

以下是直接调用 `window.print()` 来打印当前窗口的内容。

### 浏览器兼容性

所有主要浏览器都支持 `window.print()` 方法。

### 使用

```js
function printpage() {
  window.print();
}
```

### 打印样式

默认情况下，基于页面上的内容，会将元素、布局、样式都进行打印。如果仅想设置打印时候的样式，可以通过以下几种方式（**注意：设置的都是在打印时生效的样式**）：

1. 使用 **打印样式表**

```html
<link href="print.css" media="print" rel="stylesheet" />
```

2. 使用媒体查询

```css
@media print {
  p {
    color: lavender;
    background: #ccc;
  }
  h1 {
    color: lightblue;
    background: #ccc;
  }
}
```

3. 使用内联 `media` 属性

```html
<style media="print">
  p {
    color: lavender;
    background: #ccc;
  }
  h1 {
    color: lightblue;
    background: #ccc;
  }
</style>
```

默认情况下，元素的背景色不会被打印，可通过设置属性来支持：

```css
div {
  // Chrome、Safari 等 webkit 浏览器内核
  -webkit-print-color-adjust: exact;
  // 火狐
  print-color-adjust: exact;
  color-adjust: exact;
}
```

### 打印指定区域内容

默认情况下，调用 `window.print()` 会对整个 `document.body` 进行打印，当需要打印指定容器内容时，可以通过以下几种方式：

1. 对容器进行打印

```html
<body>
  <div id="container">
    <p>这是一个段落</p>
    <h1>这是一个标题</h1>
  </div>
  <input type="button" value="打印此页面" onclick="printpage()" />
  <script>
    const printpage = () => {
      let newstr = document.getElementById('container').innerHTML;
      let oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      document.body.innerHTML = oldstr;
    };
  </script>
</body>
```

2. 对容器内的部分内容进行打印（当只需要打印容器内某一部分内容时，可以通过注释标识进行截取。）

```html
<body>
  <div id="container">
    <!--startprint-->
    <p>这是一个段落</p>
    <!--endprint-->
    <h1>这是一个标题</h1>
  </div>
  <input type="button" value="打印此页面" onclick="printpage()" />
  <script>
    const printpage = () => {
      let oldStr = window.document.body.innerHTML; // 获取body的内容
      let start = '<!--startprint-->'; // 开始打印标识, 17个字符
      let end = '<!--endprint-->'; // 结束打印标识
      let newStr = oldStr.substr(oldStr.indexOf(start) + 17); // 截取开始打印标识之后的内容
      newStr = newStr.substring(0, newStr.indexOf(end)); // 截取开始打印标识和结束打印标识之间的内容
      window.document.body.innerHTML = newStr; // 把需要打印的指定内容赋给body
      window.print(); // 调用浏览器的打印功能打印指定区域
      window.document.body.innerHTML = oldStr; // body替换为原来的内容
    };
  </script>
</body>
```

3. 监听打印前后事件（通过监听打印前后事件，对不需要进行打印的元素进行隐藏和放开隐藏。）

```html
<body>
  <div id="container">
    <p>这是一个段落</p>
    <h1 id="title">这是一个标题</h1>
  </div>
  <input type="button" value="打印此页面" onclick="printpage()" />
  <script>
    const printpage = () => {
      window.print();
    };
    window.onbeforeprint = function () {
      // 将一些不需要被打印的元素隐藏
      document.getElementById('title').style.display = 'none';
    };
    window.onafterprint = function () {
      // 放开隐藏的元素
      document.getElementById('title').style.display = 'block';
    };
  </script>
</body>
```

4. iframe
   上面几种方式都在当前窗口进行打印，并且都需要更改 `document.body` 内容，这会出现视图切换，**带来的体验不是太好**。

下面我们借助 `iframe` 来实现打印，并且**不影响当前视窗的内容展示**。

```html
<body>
  <div id="container">
    <p>这是一个段落</p>
    <h1 id="title">这是一个标题</h1>
  </div>
  <input type="button" value="打印此页面" onclick="printpage()" />
  <script>
    const printpage = () => {
      // 判断iframe是否存在，不存在则创建iframe
      var iframe = document.getElementById('print-iframe');
      if (!!iframe) {
        return;
      }
      const printContent = document.querySelector('#container').innerHTML;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'print-iframe');
      iframe.setAttribute('style', 'position: absolute; width: 0; height: 0;');
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentWindow.document;
      // 设置打印展示方式 - 横向展示
      iframeDoc.write('<style media="print">@page {size: landscape;}</style>');
      // 向 iframe 中注入 printContent 样式
      iframeDoc.write(`<link href="./print.css" media="print" rel="stylesheet" />`);
      // 写入内容
      iframeDoc.write('<div>' + printContent + '</div>');
      // 解决第一次样式不生效的问题
      setTimeout(function () {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 50);
    };
  </script>
</body>
```

> 值得注意的是，`iframe` 是一个新的 `window` 窗口，不会复用当前窗口的样式，需要为 `iframe` 注入打印内容所需的样式。


5. `window.open()` 使用新窗口打印
```js
// 获取打印的区域
let newstr = this.$refs.tableRef.innerHTML; 
// 将打印的区域赋值给新窗口body，进行打印
let newWindow = window.open('','');
newWindow.document.write(newstr);
newWindow.window.print();
newWindow.window.close();  // 打印完成后关闭后新窗口
```

### 强行插入分页

当需要自定义打印分页时机时，可通过如下方式将指定 DOM 设为分割点。

1. 在指定元素前添加分页符

```css
@media print {
  h1 {
    page-break-before: always;
  }
}
```

2. 在指定元素后添加分页符

```css
@media print {
  h1 {
    page-break-after: always;
  }
}
```

### 打印设置

1. 设置打印布局

```css
@media print {
  @page {
    /* 纵向展示（高度展示内容更多） */
    /* size: portrait;*/
    /* 横向（宽度展示内容更大） */
    size: landscape;
    /* 打印的边距 上右下左 */
    margin: 1cm 2cm 1cm 2cm;
    /*（上下设置为自动居中，左右边距为0） */
    margin: auto 0mm;
    /* 1. 去除页面模型page的外边距，使其隐藏页眉页脚信息 */
    margin: 0;
  }
  /* 2. 设置 body 元素的 margin 来保证打印出来的页面带有外边距 */
  body {
    margin: 1cm;
  }
}
```

> 注意，一旦设置为 `size: landscape`，在打印时将不能切换展示模式，包括纸张类的设置。

### 参考链接

1. [聊一聊浏览器打印 - window.print](https://blog.csdn.net/web2022050903/article/details/127768277)
