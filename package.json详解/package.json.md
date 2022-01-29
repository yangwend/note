## package.json

### scripts

指定了运行脚本命令的 npm 命令行缩写。

- prepublish：在包发布之前运行，也会在 npm install 安装到本地时运行
- publish、postpublish：包被发布之后运行
- preinstall：包被安装前运行
- install、**postinstall**：包被安装后运行（可以直接执行 yarn 进行更新操作）
- preuninstall、uninstall：包被卸载前运行
- postuninstall：包被卸载后运行
- preversion：bump 包版本前运行
- postversion：bump 包版本后运行
- pretest、test、posttest：通过 npm test 命令运行
- prestop、stop、poststop：通过 npm stop 命令运行
- prestart、start、poststart：通过 npm start 命令运行
- prerestart、restart、postrestart：通过 npm restart 运行

#### postinstall 举例

例子：例如有一个项目，由于使用的依赖包对 H5 环境支持的代码有问题，需要在安装依赖包之后，对某个依赖包中的源码进行修改。我们可以按照如下进行操作：

1. 在 package.json 中 scripts 中添加指令：

```json
"scripts": {
  "postinstall": "node script/index.js",
}
```

2. script 目录下有 3 个文件：
   index.js：

```js
/**
 * 复写源码
 */
const path = require('path');
const fs = require('fs-extra');
const { setTaskStartLogUtil, setTaskFailLogUtil, setTaskSuccessLogUtil } = require('./util');

const start = () => {
  const taskName = 'Rewrite Source Code';
  setTaskStartLogUtil(taskName);
  try {
    // 复制文件从源目录到目标目录，默认会覆盖
    fs.copyFileSync(
      path.resolve(__dirname, '.', 'interaction.js'),
      path.resolve(__dirname, '..', 'node_modules/@tarojs/taro-h5/dist/api/ui/interaction/index.js')
    );
    setTaskSuccessLogUtil(taskName);
  } catch (error) {
    setTaskFailLogUtil(taskName);
    throw error;
  }
};

start();
```

interaction.js

```js
// 修改之后的源码（打包后的源码里面直接修改对应的值）
// xxx
```

util.js--用于日志打印和日志跟踪

```js
const { exec } = require('child_process');

const setTaskStartLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log(`🎉 『${taskName}』开始执行`);
};

const setTaskFailLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log(`❎ 『${taskName}』执行失败`);
};

const setTaskSuccessLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log(`✅ 『${taskName}』执行成功`);
};

const execUtil = (command, taskName) =>
  new Promise((resolve, reject) => {
    setTaskStartLogUtil(taskName);
    const ls = exec(command, (error, stdout, stderr) => {
      if (error) {
        setTaskFailLogUtil(taskName);
        reject(error);
        return;
      }
      setTaskSuccessLogUtil(taskName);
      resolve({ stdout, stderr });
    });

    ls.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    ls.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  });

module.exports = {
  setTaskStartLogUtil,
  setTaskFailLogUtil,
  setTaskSuccessLogUtil,
  execUtil,
};
```

### 参考链接

1. [package.json 详解](https://blog.csdn.net/yichensheng/article/details/79391620)

2. [package.json 是什么？](https://www.cnblogs.com/bydzhangxiaowei/p/8729210.html)
