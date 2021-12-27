/**
 * 浏览器缓存处理
 */

/**
 * @description 设置localStorage
 * @param {string} key
 * @param {*} value
 */
export const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    console.error(`设置localStorage失败：${error}`);
  }
};

/**
 * @description 获取localStorage
 * @param {string} key
 * @returns
 */
export const getLocalStorage = (key: string) => {
  try {
    const localData = window.localStorage.getItem(key);
    if (!localData) {
      return localData;
    }
    const result = JSON.parse(localData);
    return result;
  } catch (error: any) {
    console.error(`获取localStorage失败：${error}`);
    return null;
  }
};

/**
 * @description 移除localStorage
 * @param {string} key
 */
export const removeLocalStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error: any) {
    console.error(`移除localStorage失败：${error}`);
  }
};

/**
 * @description 设置localStorage + 过期时间
 * @param {string} key
 * @param {*} value
 * @param {number} [expire=1000 * 60 * 60 * 24 * 7]
 */
export const setLocalStorageByExpire = (key: string, value: any, expire = 1000 * 60 * 60 * 24 * 7) => {
  try {
    const finalValue = {
      data: value,
      time: Date.now(),
      expire,
    };
    window.localStorage.setItem(key, JSON.stringify(finalValue));
  } catch (error: any) {
    console.error(`设置localStorage加过期时间失败：${error}`);
  }
};

/**
 * @description 获取localStorage + 过期时间
 * @param {string} key
 * @returns
 */
export const getLocalStorageByExpire = (key: string) => {
  try {
    const localData = window.localStorage.getItem(key);
    if (!localData) {
      return localData;
    }
    const result = JSON.parse(localData);

    if (result.time && result.expire) {
      if (Date.now() - result.time > result.expire) {
        removeLocalStorage(key);
        return null;
      } else {
        return result.data;
      }
    }
    return null;
  } catch (error: any) {
    console.error(`获取localStorage加过期时间失败：${error}`);
    return null;
  }
};

/**
 * @description 设置sessionStorage
 * @param {string} key
 * @param {*} value
 */
export const setSessionStorage = (key: string, value: any) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    console.error(`设置sessionStorage失败：${error}`);
  }
};

/**
 * @description 获取sessionStorage
 * @param {string} key
 * @returns
 */
export const getSessionStorage = (key: string) => {
  try {
    const sessionData = window.sessionStorage.getItem(key);
    if (!sessionData) {
      return sessionData;
    }
    const result = JSON.parse(sessionData);
    return result;
  } catch (error: any) {
    console.error(`获取sessionStorage失败：${error}`);
    return null;
  }
};

/**
 * @description 移除sessionStorage
 * @param {string} key
 */
export const removeSessionStorage = (key: string) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error: any) {
    console.error(`移除sessionStorage失败：${error}`);
  }
};
