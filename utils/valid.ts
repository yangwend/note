/**
 * 校验
 */

// 校验是否为大于等于 0 的数字
export const validGreaterOrEqualZeroNum = (str: string) => /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(str);

// 校验是否为数字
export const validNum = (str: string) => /^[+|-]{0,1}(\d+)$|^[+|-]{0,1}(\d+\.\d+)$/.test(str);

// 校验是否为区间
export const validNumRange = (str: string) => {
  if (!str) {
    return false;
  }
  if (!/^(\[|\().*(\]|\))$/.test(str)) {
    return false;
  }
  // 去掉首尾括号
  const newStr = str.replace(/^(\[|\()/, '').replace(/(\]|\))$/, '');
  const newStrArr = newStr.split(',');
  if (newStrArr.length !== 2) {
    return false;
  }
  const [start, end] = newStrArr;
  return validNum(start.trim()) && validNum(end.trim());
};
