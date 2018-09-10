// HTTP Response 的类型
// Koa 默认返回的类型是 text/plain
// 可以根据 ctx.request.accepts 去判断客户端需要返回什么类型
// 从而指定 ctx.response.type 为什么类型

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    if (ctx.request.accepts('xml')) {
        ctx.response.type = 'xml';
        ctx.response.body = '<Settings><Person>Zhang San</Person></Settings>';
    } else if (ctx.request.accepts('json')) {
        ctx.response.type = 'json';
        ctx.response.body = {data: 'hello world'};
    } else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html';
        ctx.response.body = '<div class="container"><span>你好，世界</span></div>';
    } else {
        ctx.response.type = 'text';
        ctx.response.body = 'hello world';
    }
}

app.use(main); // 加载 main 函数
app.listen(3000); // 监听 3000 端口