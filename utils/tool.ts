
/**
 * @description 向下取整截取小数点后2位
 * @param {number} num
 * @returns
 */
export const mathFloor = (num: number) => {
  if (!num) {
    return 0;
  }
  return Math.floor(num * 100) / 100;
}

/**
 * @description 向上取整截取小数点后2位
 * @param {number} num
 * @returns
 */
export const mathCeil = (num: number) => {
  if (!num) {
    return 0;
  }
  return Math.ceil(num * 100) / 100;
}

/**
 * @description 四舍五入截取小数点后2位
 * @param {number} num
 * @returns
 */
export const mathRound = (num: number) => {
  if (!num) {
    return 0;
  }
  return Math.round(num * 100) / 100;
}

