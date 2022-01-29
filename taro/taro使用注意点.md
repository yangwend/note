## taro 使用注意点

以下文档汇总了 taro 在使用过程中的遇到的注意点：

### config/dev.js | config/prod.js

```js
module.exports = {
  env: {
    NODE_ENV: '"development"', // 注意：这里需要这样写：JSON.stringify('development')
  },
  h5: {
    devServer: {
      open: true,
      openPage: 'http://127.0.0.1:8281/index.html#/pages/welcome/index',
      port: 8281,
      useLocalIp: true,
    },
  },
};
```

### 支持一套代码打包多个不同渠道下的 weapp 小程序

1. 在 package.json 中，提供不同 weapp 下打包命令

```json
"scripts": {
  "start-weapp:test": "yarn run build-weapp:test --watch",
  "start-weapp:prod": "yarn run build-weapp:prod --watch",
  "build-weapp:test": "cross-env TARO_APP_ENV=test TARO_APP_SOURCE_ENV=SOME taro build --type weapp",
  "build-weapp:prod": "cross-env TARO_APP_ENV=prod TARO_APP_SOURCE_ENV=SOME taro build --type weapp",
  "start-weapp-okzf:test": "yarn run build-weapp-okzf:test --watch",
  "start-weapp-okzf:prod": "yarn run build-weapp-okzf:prod --watch",
  "build-weapp-okzf:test": "cross-env TARO_APP_ENV=test TARO_APP_SOURCE_ENV=OKZF taro build --type weapp",
  "build-weapp-okzf:prod": "cross-env TARO_APP_ENV=prod TARO_APP_SOURCE_ENV=OKZF taro build --type weapp",
  "start-h5:test": "cross-env TARO_APP_ENV=test TARO_APP_PUBLIC_PATH=/ taro build --type h5 --watch",
  "start-h5:prod": "cross-env TARO_APP_ENV=prod TARO_APP_PUBLIC_PATH=/ taro build --type h5 --watch",
  "build-h5:test": "cross-env TARO_APP_ENV=test TARO_APP_PUBLIC_PATH=./ node build-h5.js",
  "build-h5:prod": "cross-env TARO_APP_ENV=prod TARO_APP_PUBLIC_PATH=./ node build-h5.js",
  "build:test": "yarn run build-weapp:test & yarn run build-weapp-okzf:test & yarn run build-h5:test",
  "build:prod": "yarn run build-weapp:prod & yarn run build-weapp-okzf:prod & yarn run build-h5:prod",
  "lint": "eslint --fix --ext .js,.ts,.tsx ./src ./config && prettier --loglevel=error --write **/*.{js,ts,tsx,css,scss,json}",
  "postinstall": "node script/index.js",
  "clean": "rimraf dist node_modules"
},
```

2. config/index.js 中，

```js
const getProjectConfigName = () => {
  if (process.env.TARO_ENV !== 'weapp') {
    return undefined;
  }
  switch (process.env.TARO_APP_SOURCE_ENV) {
    case 'OKZF':
      return 'project-okzf.config.json';
    default:
      return 'project.config.json';
  }
};

const config = {
  // 项目名称
  projectName: 'Awesome Next',
  // 项目创建日期
  date: '2020-6-2',
  // 设计稿尺寸
  designWidth: 750,
  // 设计稿尺寸换算规则
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  // 项目源码目录
  sourceRoot: 'src',
  // 项目产出目录
  outputRoot: 'dist',
  // Taro 插件配置
  plugins: [],
  // 全局变量设置
  defineConstants: {},
  // 文件 copy 配置
  copy: {
    patterns: [],
    options: {},
  },
  // 框架，react，nerv，vue, vue3 等
  framework: 'react',
  // 小程序端专用配置
  mini: {
    projectConfigName: getProjectConfigName(), // 在这里给它赋值
    postcss: {
      autoprefixer: {
        enable: true,
      },
      // 小程序端样式引用本地资源内联配置
      url: {
        enable: true,
        config: {
          limit: 10240,
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    // 自定义 Webpack 配置
    webpackChain(chain, webpack) {},
  },
  // H5 端专用配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    // 自定义 Webpack 配置
    webpackChain(chain, webpack) {},
    devServer: {},
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
```

3. 需要提供 project-okzf.config.json 和 project.config.json 文件，appid 需要自行申请

### Taro.addInterceptor(callback)

可以使用拦截器在请求发出前或发出后做一些额外操作。

```ts
// request.ts
import setInterceptor from './interceptor';

setInterceptor();
export default async (url: string, params: IRequestParams): Promise<any> => {
  const { requestTaskName: taskName } = params;

  const newOpts = {
    isOpenXHeader: true,
    timeout: 30000,
    ...params,
    header: {
      'content-type': 'application/json',
      ...params.header,
    },
    url,
  };

  try {
    let result: any;
    if (process.env.TARO_ENV === 'h5') {
      const controller = new AbortController();
      const { signal } = controller;
      Object.assign(newOpts, { signal });
      // 任务加入队列
      setRequestTask(taskName, controller);
      const requestTask = request(newOpts);
      // timeout support
      let timer: NodeJS.Timeout | null = null;
      const timerPromise = new Promise((_resolve, reject) => {
        timer = setTimeout(() => {
          timer = null;
          reject(new Error('request:fail timeout'));
        }, newOpts.timeout);
      });
      result = await Promise.race([requestTask, timerPromise]);
      if (timer) {
        clearTimeout(timer);
      }
    } else {
      const requestTask = request(newOpts);
      // 任务加入队列
      setRequestTask(taskName, requestTask);
      result = await requestTask;
    }
    const { statusCode, data = {} } = result;
    if (statusCode >= 200 && statusCode < 400) {
      removeRequestTask(taskName);
      return data;
    }
    const error = new Error();
    (error as any).status = statusCode;
    (error as any).data = data;
    throw error;
  } catch (error) {
    const err = await parseError(error, { url });
    if ((err as any)?.status !== CANCEL_HTTP_STATUS) {
      // 非abort请求，则任务从队列移除
      removeRequestTask(taskName);
    }
    throw err;
  }
};
```

```ts
// interceptor.ts
import { addInterceptor, Chain, RequestParams } from '@tarojs/taro';
import { omit } from 'lodash';

// 请求头自动添加 _openx_head 拦截器
const requestParamsInterceptor = (chain: Chain): Promise<any> => {
  const { requestParams } = chain;
  const { method, isOpenXHeader } = requestParams;
  // 自动携带openXHeader
  if (method === 'POST' && isOpenXHeader) {
    const {
      auth: {
        customer: { id: memberCode = '' } = {},
        source: { env: sourceEnv, shopCode = '' } = {},
        thirdUser: { envId = '' },
      },
    } = store.getState() as IRootState;
    requestParams.data = {
      ...requestParams.data,
      _openx_head: {
        memberCode,
        openId: envId,
        shopCode,
        scene: sourceEnv,
      },
    };
    requestParams.header = {
      ...requestParams.header,
      author: JSON.stringify({ memberCode, shopCode, openId: envId }),
    };
  }
  const newParams = omit(requestParams, ['requestTaskName', 'isOpenXHeader']) as RequestParams;
  // 拦截器内最后需要调用 chain.proceed(requestParams) 以调用下一个拦截器或发起请求。
  return chain.proceed(newParams);
};

export default () => {
  // 添加拦截器，拦截器的调用顺序遵循洋葱模型。
  addInterceptor(requestParamsInterceptor);
  if (process.env.TARO_APP_ENV !== 'prod') {
    addInterceptor(loggerInterceptor);
  }
  addInterceptor(umaReportInterceptor);
};
```
