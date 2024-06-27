/**
 * 正则表达式工具
 */

export default class RegUtil {
  static phoneRegx = /^1[3-9]{1}[0-9]{9}$/;

  static phoneRegx86 = /^((\+?86)|(\(\+?86\)))?1[3456789]\d{9}$/;

  static phoneFilterRegx = /[()+-\s]/g;

  static regCheckPwd = /^[0-9A-Za-z]{8,16}$/; // 验证密码 数字或字母

  // const regCheckPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/ //验证密码 数字和字母
  static regNum = /^\d*$/; // 全数字

  /**
   * 验证手机号码
   * @param phoneNum
   * @returns {boolean}
   */
  static validMobileNumber = (phoneNum: string) => RegUtil.phoneRegx.test(phoneNum);

  /**
   * 检测手机号码 兼容86
   * @param {bool} phoneNum
   */
  static checkPhoneNum86 = (phoneNum: string) => RegUtil.phoneRegx86.test(phoneNum);

  /**
   * 过滤手机号码中特殊字符
   * @param {string} phoneNum
   */
  static filterPhoneNumber = (phoneNum: string) =>
    phoneNum.replace(RegUtil.phoneFilterRegx, '').slice(-11);

  /**
   * 简单校验银行卡号
   * @param cardNumber
   * @returns {boolean}
   */
  static checkBankCardNum = (cardNumber: string) => {
    const cardNumberTrim = cardNumber.replace(/\s/g, '');
    if (cardNumberTrim === '') {
      return false;
    }
    if (cardNumberTrim.length < 16 || cardNumberTrim.length > 19) {
      return false;
    }
    return RegUtil.regNum.test(cardNumber);
  };

  /**
   * 过滤字符串
   * @param str 原始字符串
   * @param reg 要过滤的字符
   * @returns {string}
   */
  static filterAll = (str: string, reg: string) => {
    if (!str) {
      return '';
    }
    return str.replace(new RegExp(reg, 'gm'), '');
  };

  /**
   * 取掉字符串前后空格
   * @param str
   * @returns {string}
   */
  static trim = (str: string) => {
    if (!str) {
      return '';
    }
    return str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, '');
  };

  /**
   * 验证密码是否符合规范
   * @param password
   * @returns {*}
   */
  static checkPassword = (password: string) => {
    if (!password) {
      return undefined;
    }

    const regPwd = new RegExp(RegUtil.regCheckPwd);
    return regPwd.test(password);
  };

  // 限制2位小数
  static normalPriceRegex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
}
