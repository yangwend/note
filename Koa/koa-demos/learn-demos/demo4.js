// 网页模板
// 开发中，实际返回给用户的往往写成模板文件。
// Koa 读取模板文件，再返回给用户

const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./learn-demos/template.html');
}

app.use(main);
app.listen(3000);