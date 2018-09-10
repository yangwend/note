// koa-route 模块
// 可以使用封装好的 koa-route 模块

const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<h3>我是 index 页面</h3><br><a href="/about">About Page</a>';
}

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<h3>我是 about 页面</h3><br><a href="/">Index Page</a>';
}

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.listen(3000);