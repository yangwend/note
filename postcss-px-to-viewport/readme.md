# postcss-px-to-viewport

将 px 单位转换为视口单位的 (vw, vh, vmin, vmax) 的 [PostCSS](https://github.com/postcss/postcss) 插件。

## postcss-px-to-viewport-8-plugin

[postcss-px-to-viewport-8-plugin](https://github.com/lkxian888/postcss-px-to-viewport-8-plugin)

其他功能与 `postcss-px-to-viewport` 保持一致。

### 问题

使用 `postcss-px-to-viewport` 控制台报以下代码：

```
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration
```

### 解决

`postcss-px-to-viewport` 替换 `postcss-px-to-viewport-8-plugin`。注意对应库版本：

```
  "postcss": "^8.3.8", // 8.0.0版本都不会转单位
  "postcss-loader": "^6.1.1",
```

## 注意

### 使用特殊的注释来忽略单行的转换

1. `/* px-to-viewport-ignore-next */` — 在单独的行上，防止在下一行上进行转换。
2. `/* px-to-viewport-ignore */` — 在右边的属性之后，防止在同一行上进行转换。

```scss
/* example input: */
.class {
  /* px-to-viewport-ignore-next */
  width: 10px;
  padding: 10px;
  height: 10px; /* px-to-viewport-ignore */
  border: solid 2px #000; /* px-to-viewport-ignore */
}

/* example output: */
.class {
  width: 10px;
  padding: 3.125vw;
  height: 10px;
  border: solid 2px #000;
}
```

### 与 PostCss 配置文件一起使用

在 `postcss.config.cjs/postcss.config.js` 文件添加如下配置

```js
const postcssPxToViewport = require('postcss-px-to-viewport-8-plugin');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes')(),
    require('postcss-preset-env')(),
    require('postcss-nested')(),
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    postcssPxToViewport({
      unitToConvert: 'px', // 要转换的（字符串）单位，默认为px
      viewportWidth: 375, // （数字）视口的宽度
      viewportHeight: 667, // （数字）视口的高度
      unitPrecision: 5, // （数字）允许大众单位增加的十进制数字
      propList: ['*'], // （数组）可以从px更改为vw的属性
      viewportUnit: 'vw', // （字符串）预期单位
      fontViewportUnit: 'vw', // （字符串）字体的预期单位
      selectorBlackList: ['keep-px'], // （数组）要忽略的选择器，保留为px
      minPixelValue: 1, //  （数字）设置要替换的最小像素值
      mediaQuery: false, // （布尔值）允许在媒体查询中转换px
      replace: true,
      exclude: [], // （数组或正则表达式）忽略某些文件
      // exclude: [/node_modules/],
      include: [/src/],
      landscape: true, // 处理横屏情况
      landscapeUnit: 'vw', // （字符串）landscape选项的预期单位
      landscapeWidth: 667, // （数字）用于横向定向的视口宽度
      landscapeHeight: 375, // （数字）用于横向定向的视口高度
    }),
  ],
};
```

### vite 使用

在 `vite.config.ts` 文件添加如下配置

```ts
import { defineConfig } from 'vite';
const postcssPxToViewport = require('postcss-px-to-viewport-8-plugin');
const cssnano = require('cssnano');

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('postcss-flexbugs-fixes')(),
        require('postcss-preset-env')(),
        require('postcss-nested')(),
        cssnano({
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        }),
        postcssPxToViewport({
          unitToConvert: 'px', // 要转换的（字符串）单位，默认为px
          viewportWidth: 375, // （数字）视口的宽度
          viewportHeight: 667, // （数字）视口的高度
          unitPrecision: 5, // （数字）允许大众单位增加的十进制数字
          propList: ['*'], // （数组）可以从px更改为vw的属性
          viewportUnit: 'vw', // （字符串）预期单位
          fontViewportUnit: 'vw', // （字符串）字体的预期单位
          selectorBlackList: ['keep-px'], // （数组）要忽略的选择器，保留为px
          minPixelValue: 1, //  （数字）设置要替换的最小像素值
          mediaQuery: false, // （布尔值）允许在媒体查询中转换px
          replace: true,
          exclude: [], // （数组或正则表达式）忽略某些文件
          // exclude: [/node_modules/],
          include: [/src/],
          landscape: true, // 处理横屏情况
          landscapeUnit: 'vw', // （字符串）landscape选项的预期单位
          landscapeWidth: 667, // （数字）用于横向定向的视口宽度
          landscapeHeight: 375, // （数字）用于横向定向的视口高度
        }),
      ],
    },
  },
});
```

## 参考链接

1. [postcss-px-to-viewport 中文文档](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)

2. [postcss-px-to-viewport-8-plugin 中文文档](https://github.com/lkxian888/postcss-px-to-viewport-8-plugin)
