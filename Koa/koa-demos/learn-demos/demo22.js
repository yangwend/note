
const Koa = require('koa');
const session = require('koa-session');
const app = new Koa();
const path = require('path');
const fs = require('fs');

app.keys = ['some secret hurr'];

const store = {
    get(key) {
        const sessionDir = path.resolve(__dirname, './session');
        const files = fs.readFileSync(sessionDir);

        for (let i = 0; i < files.length; i++) {
            if (files[i].startsWith(key)) {
                const filepath = path.resolve(sessionDir, files[i]);
                delete require.cache[require.resolve(filepath)];
                const result = require(filepath);
                return result;
            }
        }
    },
    set(key, session) {
        const filePath = path.resolve(__dirname, './session', `${key}.js`);
        const content = `module.exports = ${JSON.stringify(session)}`;

        fs.writeFileSync(filePath, content);
    },
    destroy(key) {
        const filePath = path.resolve(__dirname, './session', `${key}.js`);
        fs.unlinkSync(filePath);
    },
};

const CONFIG = {
    key: 'koa:sess',
    maxAge: 1000 * 60 * 60 * 24, // 一天
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    store
};

app.use(session(CONFIG, app));
app.use(ctx => {
    if (ctx.path === './favicon.ico') return;
    debugger;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    if (n >=5) ctx.session = null;
    ctx.body = n + 'views';
});

app.listen(4000);
console.log('listening on port 4000');
