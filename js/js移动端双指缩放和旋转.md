## js 移动端双指缩放和旋转

在 iOS 上有一组双指事件 gesturestart、gesturechange、gestureend。

gesturestart 触发条件是当屏幕上有两根或以上手指并且第二根手指放在当前元素上，当两根手指移动时触发 gesturechange，可以得到两个值：
event.scale 缩放比例
event.rotation 旋转角度
但是这一组事件只能在 iOS 上使用，安卓上是没有的。在安卓上需要用 touchstart、touchmove、touchend 去实现。

### 实现

**原理：**
利用第一组两个点的 x 轴、y 轴坐标求出两个点之间的距离，再得到第二组点的距离相除，得到缩放比例
利用第一组点的夹角与第二组点的夹角相减得到旋转角度

```ts
function setGesture(el) {
  var obj = {}; //定义一个对象
  var istouch = false;
  var start = [];
  el.addEventListener(
    'touchstart',
    function (e) {
      if (e.touches.length >= 2) {
        //判断是否有两个点在屏幕上
        istouch = true;
        start = e.touches; //得到第一组两个点
        obj.gesturestart && obj.gesturestart.call(el); //执行gesturestart方法
      }
    },
    false
  );
  document.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
      if (e.touches.length >= 2 && istouch) {
        var now = e.touches; //得到第二组两个点
        var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例，getDistance是勾股定理的一个方法
        var rotation = getAngle(now[0], now[1]) - getAngle(start[0], start[1]); //得到旋转角度，getAngle是得到夹角的一个方法
        e.scale = scale.toFixed(2);
        e.rotation = rotation.toFixed(2);
        obj.gesturemove && obj.gesturemove.call(el, e); //执行gesturemove方法
      }
    },
    false
  );
  document.addEventListener(
    'touchend',
    function (e) {
      if (istouch) {
        istouch = false;
        obj.gestureend && obj.gestureend.call(el); //执行gestureend方法
      }
    },
    false
  );
  return obj;
}
function getDistance(p1, p2) {
  var x = p2.pageX - p1.pageX,
    y = p2.pageY - p1.pageY;
  return Math.sqrt(x * x + y * y);
}
function getAngle(p1, p2) {
  var x = p1.pageX - p2.pageX,
    y = p1.pageY - p2.pageY;
  return (Math.atan2(y, x) * 180) / Math.PI;
}
```

调用方法

```ts
var box = document.querySelector('#box');
var boxGesture = setGesture(box); //得到一个对象
boxGesture.gesturestart = function () {
  //双指开始
  box.style.backgroundColor = 'yellow';
};
boxGesture.gesturemove = function (e) {
  //双指移动
  box.innerHTML = e.scale + '<br />' + e.rotation;
  box.style.transform = 'scale(' + e.scale + ') rotate(' + e.rotation + 'deg)'; //改变目标元素的大小和角度
};
boxGesture.gestureend = function () {
  //双指结束
  box.innerHTML = '';
  box.style.cssText = 'background-color:red';
};
```

这样在 iOS 和安卓下都可以用这一个方法。

**效果**
先禁止 ios 浏览器双指放大缩小页面的行为，再执行上述操作。然后针对得到的 scale/rotation 对页面做放大缩小或旋转。效果一般，且放大时，整体页面会变得模糊。所以此方案不采纳。

### 参考链接

1. [js 移动端双指缩放和旋转](https://blog.csdn.net/qq_17757973/article/details/54604625)

2. [ios 滑动手势事件 与 cell touchevent 事件\_深入浅出](https://blog.csdn.net/weixin_35348635/article/details/113081326)
