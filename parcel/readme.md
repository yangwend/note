## Parcel

> 这是一个零配置的构建工具，能够处理 `the web`、`JavaScript`、`CSS`、`HTML`、`TypeScript`、`React`、`images`、`SASS`、`SVG`、`Vue`、`libraries`、`Less`、`CoffeeScript`、`Node`、`Stylus`、`Pug`、`Electron`、`Elm`、`WebGL`、`extensions`、`GraphQL`、`MDX`、`XML`。

### 安装

```bash
yarn add --dev parcel
## or
npm install --save-dev parcel
```

### 运行

`Parcel` 内置了一个**开发服务器**，当你修改文件时，它将**自动重新构建你的应用程序**。要启动该开发服务器，请运行 `parcel` 的命令行工具，并将入口文件作为参数传递给它：

src/index.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My First Parcel App</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

```bash
yarn parcel src/index.html
## or
npx parcel src/index.html
```

现在在浏览器中打开 http://localhost:1234/ 地址并查看前面所创建的 HTML 文件。

### 参考链接

1. [parcel 官网](https://v2.parceljs.cn/)
