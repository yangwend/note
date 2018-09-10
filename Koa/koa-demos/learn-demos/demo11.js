// 中间件栈
// 多个中间件形成一个栈结构（middle stack），“先进后出”（first-in-last-out）顺序执行
// 1. 最外层的中间件首先执行（洋葱圈--一层一层往里面执行）
// 2. 调用 next 函数，把执行权交给下一个中间件
// 3. 最内层的中间件最后执行。
// 4. 执行结束后，把执行权交回上一层的中间件
// 5. 最外层的中间件收回执行权后，执行 next 函数后面的代码。
// 如果中间件没有执行 next 函数，那么执行权就不会继续传递

const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
    console.log('>> one'); // 1
    next();
    console.log('<< one'); // 6
}

const two = (ctx, next) => {
    console.log('>> two'); // 2
    next();
    console.log('<< two'); // 5
}

const three = (ctx, next) => {
    console.log('>> three'); // 3
    next();
    console.log('<< three'); // 4
}

app.use(one);
app.use(two);
app.use(three);
app.listen(3000);