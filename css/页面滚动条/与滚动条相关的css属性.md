## 与滚动条相关的 css 属性

### Scroll Snap

详见 scroll-snap 文件夹。
Scroll Snap 是一个 CSS 独立模块，可以让滚动元素停止的时候有吸附效果，非常容易实现类似 Swiper 这种交互，甚至是那种可以滑来滑去的选项卡交互效果。

### scroll-behavior

`scroll-behavior` 可以让滚动容器出现锚点定位，或者 `JS` 设置 `scrollLeft/scrollTop` 滚动距离时候表现为平滑定位。

```css
.scroll-container {
  scroll-behavior: smooth;
}
```

### 参考链接

1. [介绍 8 个和滚动相关的 CSS 属性](https://www.zhangxinxu.com/wordpress/2022/03/10-css-scroll-scrollbar/#scrollbar-gutter)
2. [还有完没完，怎么又来了个 scrollbar-gutter](https://www.zhangxinxu.com/wordpress/2022/01/css-scrollbar-gutter/)
3. [小 tip:CSS vw 让 overflow:auto 页面滚动条出现时不跳动](https://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/)
