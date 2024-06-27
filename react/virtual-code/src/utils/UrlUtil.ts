export default class UrlUtil {
  /**
   * 处理emoji表情相关数据
   * @param paramValue
   * @returns
   */
  static decodeParamValue = (paramValue: string) => {
    if (!paramValue) {
      return undefined;
    }
    const temp = unescape(paramValue.replace(/\\u/g, '%u'));
    return unescape(temp.replace(/\\u/g, '%u'));
  };

  static parseUrlParams = (url: string): Dictionary<string> => {
    if (!url) {
      return {};
    }
    const queryStart = url.indexOf('?');
    if (queryStart < 0) {
      return {};
    }
    const queryStr = url.substring(queryStart + 1);
    const paramPair = queryStr.split('&');
    const urlParams = {};
    paramPair.forEach((pair: string) => {
      const pairArray = pair.split('=');
      // @ts-ignore
      // urlParams[pairArray[0]] = decodeParamValue(pairArray[1]);
      urlParams[pairArray[0]] = decodeURIComponent(pairArray[1]);
    });
    return urlParams;
  };
}
