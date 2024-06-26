## 禁止 ios 浏览器双指放大缩小页面的行为

ios 手机有一个特性，通过双指或三指同时在屏幕上操作，即可触发放大或缩小页面的行为。那这种效果有时候会对我们前端的开发极为不利。

我们该如何去禁止呢？以下是解决方案：

### 方法一

在 iOS 10 之前，iOS 和 Android 都可以通过一行 meta 标签来禁止页面缩放：

```html
<meta
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
  name="viewport"
/>
```

但是在 ios 版本 10 以上就不兼容这个 meta 标签的方法了。——————有待确认，按我开发的验证，上述是 OK 的。

### 方法二

在 index.html 页面直接加入以下代码：

```js
// 解决ios10以上不兼容meta标签禁止缩放功能
window.onload = function () {
  // 阻止双击放大
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    'touchend',
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );

  // 阻止双指放大
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
};
```

### 方法三

给 index.html 页面 body 设置 css 样式：

```css
/* 禁止页面缩放 */
body {
  touch-action: pan-x pan-y;
  user-scalable: no;
}
```

### 参考链接

1. [禁止 iOS 浏览器在手指下滑并加入另一个手指时放大页面的行为](https://blog.csdn.net/weixin_58737883/article/details/131211223)
