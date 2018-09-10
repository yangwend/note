// 重定向
// 服务器需要重定向（redirect）访问请求
// ctx.response.redirect() 发出一个302跳转，重定向到另一个路由。

const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
    ctx.response.redirect('/');
}

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/redirect">About Page</a>';
}

app.use(route.get('/', main));
app.use(route.get('/redirect', redirect));
app.listen(3000);