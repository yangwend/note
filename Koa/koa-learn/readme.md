### Koa
    Koa -- 基于 Node.js 平台的下一代 web 开发框架
---
#### 1. 介绍
（1）官方链接：https://koa.bootcss.com/  
（2）中文文档：https://github.com/guo-yu/koa-guide  
（3）简介：  
> 由 Express 原班人马打造的 koa，致力于成为一个更小、更健壮、更富有表现力的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。Koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

#### 2. 安装
（1）Koa 需要支持 ES2015 和 `async` function 的 node v7.6.0 或更高版本。
> 可以使用管理工具（npm、nvm、nrm、n）来安装支持的 node 版本<br>
参考链接：  
https://www.jianshu.com/p/461d059c3325 <br>
https://github.com/coreybutler/nvm-windows <br>
```
$ nvm install 7
$ npm i koa
$ node my-koa-app.js
```

#### 3. 应用（Application）
> 一个 Koa Application（以下简称 app）由一系列 generator 中间件组成。按照编码顺序在栈内依次执行。Koa 提供了一种基于底层中间件编写「语法糖」的设计思路，这让设计中间件变得更简单有趣。
```
const Koa = require('koa'); // Koa2
const app = new Koa();

const main = ctx => {
    ctx.response.body = 'hello world';
}

app.use(main);
app.listen(3000);
```

#### 4. 级联代码（Cascading）
> Koa 可以使用多个中间件。多个中间件形成一个栈结构（middle stack），采用“先进后出”（first-in-last-out）的顺序执行：<br>
（1）最外层的中间件首先执行（洋葱圈--一层一层往里面执行，可参照middleware.png）<br>
（2）调用 next 函数，把执行权交给下一个中间件<br>
（3）最内层的中间件最后执行。<br>
（4）执行结束后，把执行权交回上一层的中间件<br>
（5）最外层的中间件收回执行权后，执行 next 函数后面的代码。<br>
（6）如果中间件没有执行 next 函数，那么执行权就不会继续传递。
```
const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
    console.log('>> one'); // 1
    next();
    console.log('<< one'); // 6
}

const two = (ctx, next) => {
    console.log('>> two'); // 2
    next();
    console.log('<< two'); // 5
}

const three = (ctx, next) => {
    console.log('>> three'); // 3
    next();
    console.log('<< three'); // 4
}

app.use(one);
app.use(two);
app.use(three);
app.listen(3000);
```
> 当程序运行到 yield next 时，代码流会暂停执行这个中间件的剩余代码，转而切换到下一个被定义的中间件执行代码，这样切换控制权的方式，被称为 downstream，当没有下一个中间件执行 downstream 的时候，代码将会逆序执行。

#### 5. 应用配置（Settings）
> 应用的配置是 app 实例的属性。目前来说，Koa 的配置项如下：
* app.name 应用名称
* app.env 执行环境，默认是 NODE_ENV 或者 "development" 字符串
* app.proxy 决定了哪些 proxy header 参数会被加到信任列表中
* app.subdomainOffset 被忽略的 .subdomains 列表，详见下方 api

#### 6. 中间件（Middleware）
（1）[koa-router](https://github.com/alexmingoia/koa-router)  
（2）[trie-router](https://github.com/koajs/trie-router)  
（3）[route](https://github.com/koajs/route)  
（4）

#### 7. 常用方法
（1）app.listen(...)：用于启动一个服务的快捷方法
```
var koa = require('koa');
var app = koa();

app.listen(3000);

<===> app.listen 是 http.createServer 的简单包装

var http = require('http');
var koa = require('koa');
var app = koa();

http.createServer(app.callback()).listen(3000);

```
（2）app.callback()：返回一个可被 http.createServer() 接受的程序实例，也可以将这个返回函数挂载在一个 Connect/Express 应用中。  
（3）app.use(function)：将给定的 function 当做中间件加载到应用中
```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.response.body = 'hello world';
}

app.use(main); // app.use() 加载 main 函数
app.listen(3000);
```
（4）app.keys=：设置一个签名 Cookie 的密钥  


### koa 见解
1. [koa2中使用cookie](https://blog.csdn.net/lschange/article/details/81063954)
```
koa 提供了从上下文直接读取 cookie 和写入 cookie 的方法
ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
设置 cookie 或者读取 cookie，是针对于浏览器的 cookie 进行的操作。
```

2. [koa-session学习笔记](https://www.jianshu.com/p/8f4cc45d712e)
```
在使用koa-session的时候用户可以传一个自定义的config，包括：
app.use(session(CONFIG, app));

1. maxAge,这个是确定cookie的有效期，默认是一天。
2. rolling, renew，这两个都是涉及到cookie有效期的更新策略
3. httpOnly，表示是否可以通过javascript来修改，设成true会更加安全
4. signed，这个涉及到cookie的安全性，下面再讨论
5. store，可以传入一个用于session的外部存储(***)


koa-session的基本流程非常简单

1. 根据cookie或者外部存储初始化cookie。
2. 调用next()执行后面的业务逻辑，其中可以读取和写入新的session内容。
3. 调用commit()把更新后的session保存下来。


保存session的情况包括

1. 如果session有变动;
2. 在config里设置了rolling为true，也就是每次都更新session;
3. 在config里设置了renew为true，且有效期已经过了一半，需要更新session;
一旦满足任何一个条件，就会调用save()操作来保存cookie.

```

3. [从koa-session中间件源码学习cookie与session](https://segmentfault.com/a/1190000012412299)

4. [koa-session2](https://www.npmjs.com/package/koa-session2)

5. [数据字典](https://blog.csdn.net/qq_37023388/article/details/79061881)