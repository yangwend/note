## window.requestAnimationFrame()

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

### 语法
window.requestAnimationFrame(callback);

1. 参数：<br/>
callback: 下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数传参 DOMHighResTimeStamp 参数，该参数与 performance.now() 的返回值相同，它表示 requestAnimationFrame()  开始去执行回调函数的时刻。

2. 返回值：<br/>
一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

3. [兼容性](https://caniuse.com/#search=requestAnimationFrame)

4. 举例：<br/>

```js
var start = null;

// 缓动函数--优化动画
window['requestAnimFrame'] = (function() {
    return window['requestAnimationFrame'] || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || window['msRequestAnimationFrame'] || function(callback) {
        // 16.7 = 1000 / 60, 即每秒60帧--setTimeout 定时器推荐最小值
        window.setTimeout(callback, 1000 / 60);
    };
})();

// 动画
function step(timestamp) {
    if (!start) {
        start = timestamp;
    }

    var progress = timestamp - start;

    if (progress < 2000) {
        console.log(progress);
        window['requestAnimFrame'](step);
    } else {
        console.log('window requestAnimFrame end!');
    }
}

window['requestAnimFrame'](step);

// 滚动函数（从当前位置滚动到页面顶部再滚动到当前位置）
function scrollUpAndDown() {
    var nowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var flag = "up";
    var funScroll = function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        if (flag == "up") {
            top -= 20;
            if (top <=0) {
                top = 0;
                flag = "down";
            }
        } else if (flag == "down") {
            top += 20;
            if(top >= nowScroll) {
                top = nowScroll;
                flag = "stop";
            }
        } else {
            return;
        }
        document.body.scrollTop = top;
        document.documentElement.scrollTop = top;
        window['requestAnimFrame'](funScroll);
    };
    if (nowScroll) {
        funScroll();
    }
}
```

[demo1：打印 0 到 2000 的数字](https://codepen.io/yangwend/pen/ZZjzgj)<br/>
[demo2：利用 requestAnimationFrame 改变盒子宽度](https://codepen.io/yangwend/pen/GLBJVZ)<br/>
[demo3：实现帧动画](https://zhaolyang.github.io/blogBlogBlog/javascript/requestAnimationFrame/animation/index.html)


### 参考文档
1. [window​.request​Animation​Frame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

2. [CSS3动画那么强，requestAnimationFrame还有毛线用？](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)

3. [你需要知道的requestAnimationFrame](https://juejin.im/post/5a82f0626fb9a06358657c9c)

4. [用requestAnimationFrame和cancelAnimationFrame取代定时器setTimeout和clearTimeout](https://blog.csdn.net/zyz00000000/article/details/82759641)

5. [理解requestAnimationFrame和cancelAnimationFrame](https://blog.csdn.net/lhjuejiang/article/details/80720394)