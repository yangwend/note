# Lerna 独立模式下如何优雅的发包

```js
// util.js
import { exec } from 'child_process';
import colors from 'colors-console';

const setTaskStartLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log('🎉', colors('green', `『${taskName}』开始执行`));
};

const setTaskFailLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log('❎', colors('red', `『${taskName}』执行失败`));
};

const setTaskSuccessLogUtil = (taskName) => {
  if (!taskName) {
    return;
  }
  console.log('✅', colors('blue', `『${taskName}』执行成功`));
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
      console.log('stdout: ' + data.toString());
    });

    ls.stderr.on('data', (data) => {
      console.log('stderr: ' + data.toString());
    });
  });

export { setTaskStartLogUtil, setTaskFailLogUtil, setTaskSuccessLogUtil, execUtil };
```

```js
// build-independent.js
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import inquirer from 'inquirer';
import handlebars from 'handlebars';
import { execUtil } from './util.js';

// 获取 __dirname 的 ESM 写法
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 读取 packages 下所有的第一级目录的文件名
const getPackagePath = () => {
  return fs.readdirSync(path.join(__dirname, '..', 'packages'));
};

// 对话框选择需要打包的包
const choosePackage = async (packages) => {
  const answer = await inquirer.prompt({
    type: 'checkbox',
    name: 'packages',
    message: '选择你要打包的包',
    choices: [...packages],
  });
  return answer;
};

// 重写 lerna.json
const reWriteLerna = (packages) => {
  const jsonContent = fs.readFileSync(path.join(__dirname, '..', 'lerna-template.txt'), 'utf-8');
  const jsonResult = handlebars.compile(jsonContent)(packages);
  fs.writeFileSync(path.join(__dirname, '..', 'lerna.json'), jsonResult);
};

const publish = async () => {
  const packages = getPackagePath();
  const publishPackages = await choosePackage(packages);
  if (publishPackages.packages.length !== 0) {
    reWriteLerna(publishPackages);
    await execUtil('lerna run build'); // 有调整
  } else {
    console.log('没有选择包');
  }
};

publish();
```

### 参考链接

https://juejin.cn/post/7012622147726082055#heading
