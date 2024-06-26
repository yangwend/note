## position sticky 的兼容性问题

position: sticky 是 CSS3 新增的定位属性，可以让元素在滚动到特定位置时固定在屏幕上方或下方。但是，它的兼容性存在一些问题。

### 相关问题

#### position:sticky 不生效

position:sticky 属性在某些情况下可能不会生效。以下是一些常见原因和解决方法：

1. 父级元素没有设置高度：position:sticky 需要一个确定的高度才能正常工作。如果父级元素没有设置高度，则 sticky 定位将无法生效。请**确保父级元素具有适当的高度**，或者使用 min-height 属性来设置最小高度。

2. 没有设置 top、bottom、left 或 right 值：position:sticky 需要设置一个 top、bottom、left 或 right 值来确定元素的粘性位置。如果没有设置这些值，元素将无法正确地定位。请**确保设置了正确的定位值**。

3. 元素不在滚动容器内：position:sticky 只能在滚动容器内生效。如果元素不在任何滚动容器内，sticky 定位将无法工作。请**确保元素位于一个具有滚动功能的父级容器内**。

4. 滚动容器的 overflow 属性不是 scroll 或 auto：**滚动容器必须具有 scroll 或 auto 的 overflow 属性才能使 position:sticky 生效**。如果滚动容器的 overflow 属性设置为 hidden 或 visible，sticky 定位将无法正常工作。请确保滚动容器的 overflow 属性设置正确。

5. 浏览器兼容性问题：某些旧版本的浏览器可能不支持 position:sticky 属性，例如在 IE11 及以下版本中不支持 position: sticky 属性，需要使用 JavaScript 或 polyfill 进行兼容处理。。**请确保您的浏览器支持该属性，或者考虑使用其他方法实现类似的效果（如使用 JavaScript）**。

6. 在安卓手机上，transform 属性并不会影响 position: sticky 属性。**在 Safari 中，如果父元素设置了 transform 属性，则 position: sticky 会失效。经验证，只会针对 设置了 right 的失效，left 的无影响（top 和 bottom 未验证，未知）**。

#### position:sticky 出现抖动

对于 position: sticky 出现抖动的问题，有一些常见的原因和解决方法。以下是一些可能的原因和对应的解决方案：

1. 父元素高度不足：当使用 position: sticky 时，父元素的高度应大于或等于 sticky 元素的高度。如果父元素高度不够，sticky 元素可能会在滚动时出现抖动。您可以通过设置父元素的高度或添加额外的内边距来解决此问题。

2. 滚动容器属性设置不正确：滚动容器的属性设置也可能导致 sticky 元素抖动。确保滚动容器具有适当的高度和 overflow 属性设置。例如，**您可以将滚动容器设置为：overflow: auto;或 overflow: scroll;**。

3. Sticky 元素与其他 CSS 属性冲突：某些 CSS 属性可能与 position: sticky 冲突，导致抖动。**检查是否存在与 sticky 元素相关的其他 CSS 属性或伪类（例如 z-index、transform、opacity 等**）。尝试调整这些属性以解决问题。

4. 低版本浏览器不支持：position: sticky 在一些较旧的浏览器版本中可能不受支持或存在兼容性问题。您可以**检查浏览器兼容性，并在必要时使用 polyfill 或其他解决方案**来解决问题。

### 参考链接

1. [position：sticky 的兼容性问题](https://wenku.csdn.net/answer/1a65jmnk32)

2. [position: fixed 因为上层有 transform 导致失效解决方式](https://blog.51cto.com/u_15127593/4283983)
