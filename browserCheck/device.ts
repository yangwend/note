const getVersionByUserAgent = (label: string): boolean => {
  // 获取版本号
  if (!window) {
    throw new Error('window is undefined');
  }
  const exp = new RegExp(`${label}/([^\\s\\_\\-]+)`);
  const info = window.navigator.userAgent.toLowerCase().match(exp);
  return !!(info && info.length > 0);
}

// 是否是IOS环境
export const isIOSEnv = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

// 是否是支付宝环境
export const isAlipayEnv = (): boolean => getVersionByUserAgent('alipayclient');

// 是否是微信环境
export const isWeChatEnv = (): boolean => getVersionByUserAgent('micromessenger');

// 是否是微信小程序环境
export const isWeChatMiniProgramEnv = (): boolean => {
  if (!window) {
    throw new Error('window is undefined');
  }
  return isWeChatEnv() && /miniprogram/.test(window.navigator.userAgent.toLowerCase());
};

// 是否为企业微信环境
export const isWeChatWorkEnv = () => isWeChatEnv() && getVersionByUserAgent('wxwork');

// 是否为个人微信环境
export const isWeChatPersonalEnv = () => isWeChatEnv() && !isWeChatWorkEnv();