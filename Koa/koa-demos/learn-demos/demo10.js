// 中间件：
// 像如下的 logger 函数就叫做 “中间件”(middleware)
// 处于 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。
// app.use() 用来加载中间件

// Koa 所有的功能都是通过中间件实现的，前面例子里面的main也是中间件
// 每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是 next 函数。
// 只要调用next函数，就可以把执行权转交给下一个中间件。

const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url} ${ctx.request.path}`);
    next();
}

const main = ctx => {
    ctx.response.body = '我在开始学习中间件哦';
}

app.use(logger);
app.use(main);
app.listen(3000);