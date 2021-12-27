/**
 * 生成随机字符
 */

/**
 * @description
 * @param {number} [len]
 * @param {number} [radix]
 * @returns {string}
 */
export const uuidGen = (len?: number, radix?: number): string => {
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const chars = CHARS;
  const uuid = [];
  let i;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * (radix || chars.length))];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};
