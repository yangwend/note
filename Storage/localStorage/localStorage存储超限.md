## localStorage 存储超限

之前在优化一个页面时，由于页面中有一个渠道树是缓存在 localStorage 中的（用于缓存数据防止多次请求），测试环境数据量不大，生产环境数据量很大，导致 localStorage 存储超限了，控制台报错，页面也展示不出来这个渠道树。

后面查到，localStorage 在不同浏览器上存储大小是不一样的，但是会有一个限制值。那超了限制值后，就不能进行 `getItem` 和 `setItem` 等 api 操作了，控制台也会打印出错误。

> Uncaught QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'dataURL' exceeded the quota.

其实同一个域名下面可能存在几十上百条业务线，每条业务线都可能因为各种原因往 localStorage 里面塞东西，跨页面传输的数据、缓存、离线化、性能优化等等...5M 看起来很多，其实很快用完了。而**开发时基本无感知，是因为大家都只访问自己的业务，但用户会访问各种业务，时间一久，很容易就存满了，凡是严重依赖 localStorage 的业务流程都存在风险。**

### localStorage 的作用

1. 持久化存储
2. 跨页面传数据

持久化存储不会出问题，存不进去就存不进去，取不出来就去其它地方取，或者不取。问题就出在跨页面传数据上，上一个页面因为 localStorage 存满导致数据没有写入，下一个页面读取数据为空，从而导致错误。

### 可能存在的解决方案

1. localStorage 存满后降级到 sessionStorage 里
   在 app 中打开 h5 页面使用的是新打开 webview 的方式。新打开 webview 等于新打开一个会话，而 sessionStorage 只能存在于同一个会话中，因此 sessionStorage 无法跨页面共享。

2. 降级到 cookie 里
   cookie 一共才 50 个，总大小不超过 4k，作为 backup 过于脆弱，而且还会影响请求的效率。如果后端对请求头大小做了限制，还可能产生 413 错误，导致请求被拦截。

3. 降级到 url 上
   很麻烦。比如有一个交互流程是这样的：页面 A => 页面 B => 页面 C，如果页面 A 的数据要传到页面 C，就得通过页面 B 做一层中转。而且 url 长度也是有限制的。

4. 单页应用
   在不影响业务的情况下，可以直接从 localStorage 里降到 sessionStorage。

5. 后端处理
   求助后端同学，多加几个字段或者几个接口，接口做优化等等。但是这涉及到核心业务流程改造，风险不小，而且还是可能存在超限制问题。

**注意**：safari 在隐私模式下不支持 localStorage 的存取（ios11 以下）。

### 持久化存储问题的解决方案

```js
try {
  var count = 100;
  var message = 'LocalStorageIsNOTFull';
  for (var i = 0; i <= count; count + 250) {
    message += message;
    localStorage.setItem('stringData', message);
    console.log(localStorage);
    console.log(count);
  }
} catch (e) {
  console.log('Local Storage is full, Please empty data');
  // fires When localstorage gets full
  // you can handle error here or empty the local storage
}
```

使用 `try catch` 捕获异常，对错误进行降级处理，做兼容，这样的话 在 localStorage 超限时就不会阻塞页面展示了。

### 理想解决方案

1. 划分域名。各域名下的存储空间由各业务组统一规划使用；

2. 跨页面传数据：考虑单页应用、优先采用 url 传数据；

3. 使用 `try catch`，做错误降级处理；

4. 最后的兜底方案：清掉别人的存储；

### 查询 localStorage 限制的网址

http://dev-test.nemikor.com/web-storage/support-test/

### 参考链接
1. [QuotaExceededError: The quota has been exceeded. localStorage缓存超出限制](https://www.cnblogs.com/gwf93/p/10169373.html)