/**
 * 字符串处理工具类
 */

export default class StringUtils {
  /**
   * 检测字符串长度是否符合条件
   */
  static checkStr = (str: string, minLength: number, maxLength: number, notEmpty: boolean) => {
    if (notEmpty && (str === undefined || str === '')) {
      return false;
    }
    const trimStr = StringUtils.trim(str); // 过滤前后空格
    const strLength = trimStr.length;
    return strLength >= minLength && strLength <= maxLength;
  };

  /**
   * 去掉字符串前后空格
   */
  static trim = (str: string | null | undefined): string => {
    if (!str) {
      return '';
    }
    return str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, '');
  };

  /**
   * 去除字符串所有空格
   */
  static trimAll = (str: string | undefined | null) => {
    if (!str) {
      return '';
    }
    return str.replace(/\s*/g, '');
  };

  /**
   * 检测字符串是否为空 -> (str === undefined || str === null)
   */
  static isNullOrUndefined = (str: string | undefined | null) => str === undefined || str === null;

  /**
   * 检测字符串是否为空串 -> '' === str
   */
  static isPureEmptyStr = (str: string | undefined | null) => StringUtils.trimAll(str) === '';

  /**
   * 检测字符串是否null/undefined/''
   */
  static isEmptyStr = (str: string | undefined | null) =>
    StringUtils.isNullOrUndefined(str) || StringUtils.isPureEmptyStr(str);

  /**
   * 检测字符串是否全为空格
   */
  static isAllWhiteSpace = (str: string) => StringUtils.isPureEmptyStr(StringUtils.trimAll(str));
}
