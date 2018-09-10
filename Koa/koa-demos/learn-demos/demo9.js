// 中间件（Koa 特色，重要设计）
// Logger（日志打印） 

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url} ${ctx.request.path}`);
    ctx.response.body = 'hello';
}

app.use(main);
app.listen(3000);
