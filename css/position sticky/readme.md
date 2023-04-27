## position sticky

`css position` 属性用于指定一个元素在文档中的定位方式。`top、right、bottom、left`属性决定了该元素的最终位置。

`position sticky`：
粘性定位元素。元素根据正常的文档流进行定位，然后相对它的*最近滚动祖先*和*最近块级祖先*，基于`top、right、bottom、left`值进行偏移。偏移不会影响任何其他元素的位置。

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

注意，一个 `sticky` 元素会“**固定**”在离它最近的一个拥有“**滚动机制**”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为。

### 如何探测 sticky 定位的元素是否处于 **固定定位** 状态

我们在给某个元素增加了 sticky 定位以后，在某些情况下，我们需要判断该元素是否处在 sticky 状态，然后增加额外样式的需求，比如说加一个阴影效果。

**注意：目前无法通过 css 来知道 sticky 是否处于固定定位的状态**

因此，需要通过 js 来实现。

#### 原理

通过 `IntersectionObserver` 来监听该元素与父元素的位置关系，通过判断该元素与父元素的位置关系是否交叉来实现。

每当目标 (target) 元素与设备视窗或者其他指定元素发生交集的时候执行。设备视窗或者其他元素我们称它为根元素或根 (root)。

目标 (target) 元素与根 (root) 元素之间的交叉度是交叉比 (intersection ratio)。这是目标 (target) 元素相对于根 (root) 的交集百分比的表示，它的取值在 0.0 和 1.0 之间。

**root**

**intersectionRatio：**监听阈值的列表，按升序排列。

**threshold：**监听阈值的列表或某个值（0.0-1.0 之间）。
阈值为 1.0 意味着目标元素完全出现在 root 选项指定的元素中可见时，回调函数将会被执行。

#### demo

参考 `sticky-demo.html`和`sticky-demo2.html`

### 参考链接

1. [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
2. [带阴影的 CSS Sticky](https://zhuanlan.zhihu.com/p/81249133)
3. [IntersectionObserver MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
4. [How to Detect When a Sticky Element Gets Pinned](https://davidwalsh.name/detect-sticky)
