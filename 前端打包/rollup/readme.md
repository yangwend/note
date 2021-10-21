参考文档：<br/>
1. [10分钟快速入门rollup.js](https://www.imooc.com/article/262083)

2. [10分钟快速进阶rollup.js](https://www.imooc.com/article/263597)

3. [10分钟快速精通rollup.js——前置学习之基础知识篇](https://www.imooc.com/article/264075)

4. [10分钟快速精通rollup.js——前置学习之rollup.js插件篇](https://www.imooc.com/article/264076)

5. [rollup.js 中文文档](https://www.rollupjs.com/guide/zh)

总结：<br/>
> rollup.js是Javascript的ES模块打包器。<br/>
rollup.js可以提供资源打包，但rollup.js更专注于Javascript类库打包。<br/>
rollup.js默认采用ES模块标准，我们可以通过rollup-plugin-commonjs插件使之支持CommonJS标准。<br/>
rollup.js的插件采用可拔插设计。<br/>
ES模块的tree-shaking机制：动态地清除没有被使用过的代码，使得代码更加精简，从而可以使得我们的类库获得更快的加载速度（容量小了，自然加载速度变快）。<br/>
CommonJS模块不能支持tree-shaking特性，建议大家使用rollup.js打包时，尽量使用ES模块，以获得更精简的代码。<br/>
UMD模块与CommonJS类似，也是不能够支持tree-shaking特性的<br/>
在 package.json 文件的 main 属性中指向当前编译的版本。如果你的 package.json 也具有 module 字段，像 Rollup 和 webpack 2 这样的 ES6 感知工具(ES6-aware tools)将会直接导入 ES6 模块版本。<br/>

rollup-plugin-node-resolve：集成外部模块<br/>
rollup-plugin-commonjs：支持CommonJS模块，将 CommonJS 转换成 ES2015 模块<br/>
rollup-plugin-babel：编译ES6语法，使低版本浏览器可以识别<br/>
rollup-plugin-uglify：代码最小化打包（不支持ES模块）<br/>
rollup-plugin-terser：代码压缩，取代uglify，支持ES模块。<br/>
rollup-plugin-alias插件：替换模块路径中的别名；<br/>
rollup-plugin-flow-no-whitespace插件：去除flow静态类型检查代码；<br/>
rollup-plugin-replace插件：替换代码中的变量为指定值；<br/>
