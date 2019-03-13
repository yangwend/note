# window.open 或者 form 表单提交（新开页签）被浏览器拦截
在写 js 代码时，通常会遇到浏览器阻止 js 写的 window.open 代码，但是不是必现的（只会阻止特定情况下的 window.open）。

## 观察浏览器对 window.open 的阻止情况
```
浏览器不会阻止用户主动发起的window.open方法；浏览器一般都会阻止非用户主动发起的window.open。

其中需要区分两个概念，即何为用户主动发起和非主动发起：
1. 用户主动发起：<a href="window.open('http://www.baidu.com','_blank');">百度</a>
2. 用户非主动发起：<a href="javascript:setTimeout(function(){window.open('http://www.baidu.com','_blank')},2000);">百度</a>

即用户通过异步方式执行再触发 window.open 则会被浏览器阻止，因为浏览器认为不是用户主动发起的，而是通过 js 代码发起的（其中也包括 form 表单新开页面提交）
```

## 解决方案
1. 通过同步方式：
```javascript
$.ajax({
    async: false, //就是设置这个最为关键的 ajax 同步
    type: 'POST',
    url: 'xxx',
    data: {},
    success: function(data){
        result = data;
    }
});
```
2. 需要在异步 ajax 请求中打开新窗口的可以使用请求前打开新窗口，请求拿到结果后再修改窗口地址的方式。
```javascript
window.open("about:blank", "alipay"); //打开新窗口，地址为"about:blank"，窗口名为"alipay"
ajax.then((res)=>{
    window.open(null,'alipay').location.href = res.data.data.alipayUrl;
}) //回调函数的返回值赋值给名为"alipay"的窗口
```
3. 在当前页新开页签，在新开页签中进行ajax请求并在新开页签中提交form表单（无需target="_blank"），但是此时接口请求失败就不在当前页展示，在新开的页签中展示了

4. 需要在键盘回车事件中打开新窗口的推荐使用 form 表单包装并添加 button 的方式，回车触发默认的 submit 事件进行新窗口的打开。