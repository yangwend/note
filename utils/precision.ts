/**
 * number-precision：处理 number 浮点精度问题
 * 参考 https://github.com/nefe/number-precision
 */

/**
 * @description 把错误的数据转正：strip(0.09999999999999998)=0.1
 * @param {(number | string)} num
 * @param {number} [precision=12]
 * @returns
 */
export const strip = (num: number | string, precision = 12) => {
  return +parseFloat(Number(num).toPrecision(precision));
};
