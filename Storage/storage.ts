import localforage from 'localforage';

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

/**
 * @description 设置localforage
 * @param {string} key
 * @param {*} value
 */
export const setLocalForage = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
  } catch (error: any) {
    console.error(`设置localForage失败：${error}`);
  }
};

/**
 * @description 获取localforage
 * @param {string} key
 * @return {*}
 */
export const getLocalForage = async (key: string) => {
  try {
    const result = await localforage.getItem(key);
    return result;
  } catch (error: any) {
    console.error(`获取localForage失败：${error}`);
    return null;
  }
};

/**
 * @description 移除localForage
 * @param {string} key
 */
export const removeLocalForage = async (key: string) => {
  try {
    await localforage.removeItem(key);
  } catch (error: any) {
    console.error(`移除localForage失败：${error}`);
  }
};

/**
 * @description 设置localforage + 过期时间
 * @param {string} key
 * @param {*} value
 * @param {number} [expire=1000 * 60 * 60 * 24 * 7]
 */
export const setLocalForageByExpire = async (key: string, value: any, expire = 1000 * 60 * 60 * 24 * 7) => {
  try {
    const finalValue = {
      data: value,
      time: Date.now(),
      expire,
    };
    await localforage.setItem(key, finalValue);
  } catch (error: any) {
    console.error(`设置localForage加过期时间失败：${error}`);
  }
};

/**
 * @description 获取localforage + 过期时间
 * @param {string} key
 * @return {*}
 */
export const getLocalForageByExpire = async (key: string) => {
  try {
    const result: any = await localforage.getItem(key);
    if (!result) {
      return result;
    }

    if (result.time && result.expire) {
      if (Date.now() - result.time > result.expire) {
        await removeLocalForage(key);
        return null;
      } else {
        return result.data;
      }
    }
    return null;
  } catch (error: any) {
    console.error(`获取localForage加过期时间失败：${error}`);
    return null;
  }
};
