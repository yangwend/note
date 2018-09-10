// 中间件的合成 : koa-compose

const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url} ${ctx.request.path}`);
    next();
    console.log('我打印出来了^_^');
}

const main = ctx => {
    ctx.response.body = 'hello world';
}

const middlewares = compose([logger, main]);
app.use(middlewares);
app.listen(3000);


