// error 事件的监听

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.throw(404);
}

app.on('error', (err, ctx) => console.log('server error', err))

app.use(main);
app.listen(3000);