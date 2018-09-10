// 处理错误的中间件
// 采用 try catch 捕获
// 让最外层的中间件负责所有中间件的错误处理

const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
}

const main = ctx => {
    ctx.throw(404);
}

app.use(handler);
app.use(main);
app.listen(3000);