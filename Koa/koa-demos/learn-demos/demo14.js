// 如果代码运行发生错误，需要把错误信息返回给用户。
// http 协议规定此时返回 500 。
// ctx.throw() 可以抛出错误

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.throw(413); // 500 等
}

app.use(main);
app.listen(3000);