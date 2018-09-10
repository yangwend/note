// 释放 error 事件
// 若采用 try catch 事件捕获，则不会触发 error事件。
// 采用 ctx.app.emit() 手动释放 error 事件，让监听函数生效。

const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>wrong</p>';
        ctx.app.emit('error', err, ctx); // 释放 error 事件，可以监听 error 
    }
}

const main = ctx => {
    ctx.throw(500);
}

app.on('error', (err, ctx) => console.log('server error', err))

app.use(handler);
app.use(main);
app.listen(3000);