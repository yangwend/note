// 异步中间件
// 若异步操作时，需要使用 async await 
// fs.readFile 为异步操作

const Koa = require('koa');
const fs = require('fs.promised');
const app = new Koa();

const main = async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./learn-demos/template.html', 'utf-8');
}

app.use(main);
app.listen(3000);