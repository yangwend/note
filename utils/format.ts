/**
 * 数据展示格式化
 */

/**
 * @description 个位补0
 * @param {number} num
 */
export const fixZero = (num: number) => (num > 9 ? `${num}` : `0${num}`);
