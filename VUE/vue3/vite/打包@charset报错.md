## `<stdin>:132:1: warning: "@charset" must be the first rule in the file`
使用vite搭建 vite + vue3 + ts + element-plus 项目时，打包会出现warning：`<stdin>:132:1: warning: "@charset" must be the first rule in the file`

### warning log
```
> <stdin>:7775:0: warning: "@charset" must be the first rule in the file
    7775 │ @charset "UTF-8";
         ╵ ~~~~~~~~
   <stdin>:7741:0: note: This rule cannot come before a "@charset" rule
    7741 │ @-webkit-keyframes nprogress-spinner {
         ╵ ^


 > <stdin>:7775:0: warning: "@charset" must be the first rule in the file
    7775 │ @charset "UTF-8";
         ╵ ~~~~~~~~
   <stdin>:7745:0: note: This rule cannot come before a "@charset" rule
    7745 │ @keyframes nprogress-spinner {
```

### 出现原因
postcss给含有中文的scss 加了个@charset "UTF-8"; 但是这个是放在头部的 多个合并的时候放在了这个放在了中间 esbuild就提示了个waring。
```css
/* purgecss end ignore *//* purgecss start ignore */
span[data-v-196bc3b8]{
  color: #ffffff !important;
}
div[data-v-196bc3b8]{
  color: #ffffff !important;
}
h6[data-v-196bc3b8]{
  color: #ffffff !important;
}

/* purgecss end ignore */
/*purgecss start ignore*/
@charset "UTF-8"; // 这里有问题
.patrol .card-item[data-v-196bc3b8] {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 41.875rem;
  height: auto;
  padding: 1rem;
  background: linear-gradient(90deg, rgba(70, 173, 255, 0.38) 0%, rgba(97, 194, 255, 0.5) 0%, rgba(70, 173, 255, 0.38) 100%);
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
  /*中文注释*/
}
.patrol .card-item .not-expanded[data-v-196bc3b8] {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
```

### 解决办法
1. 最简单的方法 : 在 /node_models/vite/dist/node/chunks/* 下面搜minifyCSS，加一行这个
```js
css = css.replace(/@charset "UTF-8";/ig,'')
```
```js
async function minifyCSS(css, config) {
    css = css.replace(/@charset "UTF-8";/ig,'')
    const { code, warnings } = await esbuild.transform(css, {
        loader: 'css',
        minify: true,
        target: config.build.cssTarget || undefined
    });
    if (warnings.length) {
        const msgs = await esbuild.formatMessages(warnings, { kind: 'warning' });
        config.logger.warn(source.yellow(`warnings when minifying css:\n${msgs.join('\n')}`));
    }
    return code;
}
```

2. 把含有中文的scss都去掉

3. modify vite.config.js：
```js
css: {
  postcss: {
    plugins: [
      {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          }
        }
      }
    ],
  },
}
```

### 参考链接
1. [warning: "@charset" ](https://github.com/vitejs/vite/issues/5655)

2. [build includes @charset problem.](https://github.com/vitejs/vite/issues/5833)