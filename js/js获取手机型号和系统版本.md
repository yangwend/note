## js 获取手机型号和系统版本

在很多情况下，前端需要获取手机的型号和系统版本号，用来协助排查问题，尤其是在排查手机兼容性问题时。

### 方案

前端浏览器获取设备信息和系统信息只能通过 `navigator.userAgent` 来获取。

`navigator.userAgent` 例如：

小米 9：

```
"Mozilla/5.0 (Linux; Android 9; MI 9 Build/PKQ1.181121.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044904 Mobile Safari/537.36 MMWEBID/9234 MicroMessenger/7.0.6.1500(0x2700063E) Process/tools NetType/WIFI Language/zh_CN"
```

one plus：

```
Mozilla/5.0 (Linux; Android 12; PGZ110 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.141 Mobile Safari/537.36 XWEB/5305 MMWEBSDK/20220903 MMWEBID/2954 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64
```

苹果 7 plus

```
Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 Safari/601.1 wechatdevtools/1.02.1907300 MicroMessenger/7.0.4 Language/zh_CN webview/15693784144112003 webdebugger port/58531
```

通过上述 `navigator.userAgent` 可以得知：

1. 手机型号：只有安卓可以获取，苹果只能知道是 iPhone 还是 iPad，无法知道具体型号。
2. 系统版本：两者皆可获取。
3. 微信版本：两者皆可获取。在微信浏览器打开时，可以获取对应的微信的版本。

```ts
/** 浏览器类型 */
export enum UserAgentEnum {
  ALIPAY = 'alipay',
  MICRO_MESSENGER = 'MicroMessenger',
  WXWORK = 'wxwork', // 企业微信
  OTHER = 'Other',
}

export enum PlatformEnum {
  Android = 'android', // android
  IOS = 'iOS', // iOS
  Unknown = 'unknown', // 未知
}

// 获取userAgent
const getUserAgent = () => {
  const { userAgent: agent } = navigator;
  if (-1 !== agent.indexOf('MicroMessenger')) {
    if (agent.indexOf('wxwork') !== -1) {
      return UserAgentEnum.WXWORK;
    }
    return UserAgentEnum.MICRO_MESSENGER;
  } else if (-1 !== agent.indexOf('Alipay')) {
    return UserAgentEnum.ALIPAY;
  } else {
    return UserAgentEnum.OTHER;
  }
};

// 是否微信环境
const isWeixinEnv = () => {
  return navigator.userAgent.indexOf('MicroMessenger') !== -1;
};

// 是否是企微环境
const isWXWorkEnv = () => {
  return navigator.userAgent.indexOf('MicroMessenger') !== -1 && navigator.userAgent.indexOf('wxwork') !== -1;
};

// 是否是企微小程序环境
const isWXWorkMiniProgramEnv = () => {
  return isWXWorkEnv() && /miniprogram/.test(navigator.userAgent.toLowerCase());
};

// 获取客户端平台类型
const getPlatform = () => {
  const agent = navigator.userAgent; // 客户端类型
  const isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1; // android终端
  const isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    return PlatformEnum.Android;
  } else if (isIOS) {
    return PlatformEnum.IOS;
  }
  return PlatformEnum.Unknown;
};

// 获取系统版本
const getSystem = () => {
  let system = undefined;
  const agent = navigator.userAgent; // 客户端类型
  const platform = getPlatform();
  if (platform === PlatformEnum.Android) {
    // 这里的 (?=;) 是指到分号为止，但不包括分号。第一个问号，就是 /Android.*?(?=;)/ 是指匹配第一个后面括号里的内容，也就是匹配第一个分号。
    const m1 = agent.match(/Android.*?(?=;)/);
    if (m1 && m1.length > 0) {
      system = m1[0]; // Android 9
    }
  }
  if (platform === PlatformEnum.IOS) {
    // 和上面一样，只是匹配空格。
    let m1 = agent.match(/iPhone OS .*?(?= )/);
    if (m1 && m1.length > 0) {
      system = m1[0]; // iPhone OS 10_2
    }
  }
  return system;
};

// 获取微信版本
const getMicroMessenger = () => {
  let wechat = undefined;
  const agent = navigator.userAgent; // 客户端类型
  let m1 = agent.match(/MicroMessenger.*?(?= )/);
  if (m1 && m1.length > 0) {
    wechat = m1[0]; // MicroMessenger/7.0.4
  }
  return wechat;
};

// 获取手机型号(安卓)
const getDevice = () => {
  let device = undefined;
  const agent = navigator.userAgent; // 客户端类型
  let m1 = agent.match(/Android.*; ?(.*(?= Build))/);
  if (m1 && m1.length > 1) {
    device = m1[1]; // MI 9
  }
  return device;
};
```

### 参考链接

1. [js 获取手机型号和系统版本](https://codeleading.com/article/89842239966/#google_vignette)
