// 文件上传
// koa-body ：还可以用来处理文件上传

const Koa = require('koa');
const koaBody = require('koa-body');
const os = require('os');
const fs = require('fs');
const path = require('path');
const app = new Koa();

const main = async (ctx, next) => {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createReadStream(filePath);
        reader.pipe(writer);
        filePaths.push(filePath);
    }

    ctx.response.body = filePaths;
}

app.use(koaBody({multipart: true}));
app.use(main);
app.listen(3000);

// $ curl --form upload=@./README.md http://127.0.0.1:3000
// ["C:\\Users\\lenovo\\AppData\\Local\\Temp\\README.md"]