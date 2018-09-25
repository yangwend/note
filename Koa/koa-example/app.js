const Koa = require('koa');
const fs = require('fs');
const static = require('koa-static');
const app = new Koa();
const main = static(__dirname + '/public');
const index = require('./routes/index');

// allowedMethods 用于校验请求的方法
app.use(index.routes(), index.allowedMethods());
app.use(main);

app.listen(4000);
console.log('http://localhost:4000/ 启动');