import dayjs from 'dayjs';

export default class ToolUtil {
  /**
   * @description 通过 value 取 label
   * @author yangwen
   * @static
   * @param {any[]} source
   * @param {(string | number)} key
   * @param {string} [value='value']
   * @param {string} [label='label']
   * @memberof ToolUtil
   */
  static getLabelByValue = (
    source: any[],
    key: string | number,
    value = 'value',
    label = 'label'
  ) => source.find((item) => item[value] === key)?.[label] ?? '';

  /**
   * @description 格式化日期
   * @author yangwen
   * @static
   * @param {(string | number)} [text]
   * @param {string} [format='YYYY-MM-DD HH:mm:ss']
   * @memberof ToolUtil
   */
  static formatDate = (text?: string | number, format = 'YYYY-MM-DD HH:mm:ss') =>
    text ? dayjs(text).format(format) : '';

  /**
   * @description 判空
   * @author yangwen
   * @static
   * @param {*} value
   * @memberof ToolUtil
   */
  static isEmptyValue = (value: any) =>
    typeof value === 'undefined' || value === null || value === '';

  /**
   * @description 小图
   * @author yangwen
   * @static
   * @param {string} 我去32332
   * @memberof ToolUtil
   */
  static getGoodsThumbnailUrl = (我去32332: string): string =>
    `34333333333333/${我去32332}/${我去32332}3443434.jpg!34343434343`;

  /**
   * @description 修复ios和安卓部分手机键盘收起后页面被遮挡的问题
   * @author yangwen
   * @static
   * @memberof ToolUtil
   */
  static fixKeyBoardIssue = () => {
    const setDocumentHeight = () => {
      setTimeout(() => {
        (document.documentElement as any).style.height = '100.1vh';
        setTimeout(() => {
          (document.documentElement as any).style.height = '100vh';
        }, 100);
      }, 100);
    };
    setDocumentHeight();
  };

  /**
   * 生成uuid
   * 参考自 https://github.com/tangqipeng/uuid-js/blob/master/uuid.js
   */

  static hex = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  static uuidGen = (prefix = 'h5-') =>
    `${prefix}${ToolUtil.hex()}${ToolUtil.hex()}-${ToolUtil.hex()}-${ToolUtil.hex()}-${ToolUtil.hex()}-${ToolUtil.hex()}${ToolUtil.hex()}${ToolUtil.hex()}`;

  /**
   * @description 数组根据某个值进行分割为多个数组
   * @author yangwen
   * @static
   * @param {any[]} array
   * @param {number} groupNum
   * @memberof ToolUtil
   */
  static getGroupedList = (array: any[], groupNum: number): any[][] => {
    if (array.length === 0 || groupNum === 0) {
      return array;
    }

    let index = 0;
    const newArray: any[] = [];

    while (index < array.length) {
      newArray.push(array.slice(index, (index += groupNum)));
    }
    return newArray;
  };
}
