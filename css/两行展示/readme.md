## 两行展示

设置样式如下：

```scss
// Line clamp
// http://dropshado.ws/post/1015351370/webkit-line-clamp
@mixin line-clamp($lines: 2, $line-height: 1.3em) {
  display: -webkit-box;
  max-height: $line-height * $lines;
  overflow: hidden;
  line-height: $line-height;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
}

.title {
  font-weight: 400;
  font-size: 14px;
  color: #000;

  @include line-clamp(2, 20px);
}
```

### 注意

使用时，如果出现展示出第三行的一点点的问题，原因可能有：

1. 需要检查一下是否设置了 `height`，去掉 `height` 设置
2. 外框容器如果使用 `padding` 也会出现，如果需要设置距离可以使用 `margin` 属性或者在父元素上设置。

### 参考链接

1. [CSS WebKit 浏览器超过两行自动截断显示省略号](https://docsxyz.com/wiki/css/css-webkit-line-clamp)
2. [超出隐藏使用了 -webkit-line-clamp: 2; 为什么第三行也展示出了一部分？](https://segmentfault.com/q/1010000042233810)
