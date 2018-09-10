// 静态资源
// koa-static 模块封装请求用于处理静态资源（图片、字体、样式表、脚本等）

const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const app = new Koa();

const main = serve(path.join(__dirname));

app.use(main);
app.listen(3000);

// 通过访问路径： http://127.0.0.1:3000/demo7.js 可直接获得对应脚本