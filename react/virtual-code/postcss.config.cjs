
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
