const fs = require('fs');
const koaRouter = require('koa-router');
const router = new koaRouter();
// 或者
// const router = require('koa-router')();

router.get('/index/:name', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = fs.createReadStream('./views/index.html');
    // ctx.body = `I am ${ctx.params.name}!`;
});

module.exports = router;