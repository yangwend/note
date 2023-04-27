## 移动端 1px 处理

有时候在画移动端页面的 UI 时，我们会给某个边框设置 `border-top: 1px solid red` 的情况。在电脑上展示是没有问题的，但是到了手机上，就不行了，因为手机的设备像素比不一致，所以看起来有的粗有的细。

解决：使用伪元素 + CSS3 缩放的方式

```scss
.border-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e4e6ee;
  transform: scaleY(0.5);
  transform-origin: 0 0;
  content: '';
}

.border-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e4e6ee;
  transform: scaleY(0.5);
  transform-origin: 0 0;
  content: '';
}

// 需要用到的元素
.wrap {
  position: relative;
  padding: 0 15px 15px;

  &::before {
    @extend .border-bottom;
  }
}
```

### 参考链接

1. [最后一次探究 1px](https://juejin.cn/post/6870691193353666568)
