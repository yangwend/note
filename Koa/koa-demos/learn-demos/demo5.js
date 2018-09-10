// 路由：
// 原生路由
// 通过 ctx.request.path 可以获取用户请求的路径

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    if (ctx.request.path === '/') {
        ctx.response.type = 'html';
        ctx.response.body = '<span>我在学习Koa路由中的原生路由哟</span>'
    } else if (ctx.request.path === '/about') {
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">我可以点击跳转到首页去哟</a>';
    } else {
        ctx.response.type = 'text';
        ctx.response.body = ctx.request.path;
    }
}

app.use(main);
app.listen(3000);