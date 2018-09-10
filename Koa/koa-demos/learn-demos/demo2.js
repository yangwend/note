// Koa 提供 Context 对象，表示一次会话的上下文（包括HTTP请求和HTTP回复）。
// Context.response.body ：发送给用户的内容
// Context.response ：HTTP Response
// Context.request  ：HTTP Request
// 通过修改 Context.response.body 可以用来控制返回给用户的内容
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.response.body = 'hello world';
}

app.use(main); // app.use() 加载 main 函数
app.listen(3000);