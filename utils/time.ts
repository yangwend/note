/**
 * 时间处理、格式转化
 */

import dayjs from 'dayjs';

/**
 * @description 获取某天的00:00:00
 * @param {*} [day=new Date()]
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @returns
 */
export const getSomeDayZeroStamp = (day = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(new Date(new Date(day).toLocaleDateString()).getTime()).format(format);
};

/**
 * @description 获取某天的23:59:59
 * @param {*} [day=new Date()]
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @returns
 */
export const getSomeDayEndStamp = (day = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(new Date(new Date(day).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).format(format);
};

/**
 * @description 时间转化
 * @param {(string | number)} time
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 */
export const transformTime = (time: string | number, format = 'YYYY-MM-DD HH:mm:ss') =>
  time ? dayjs(time).format(format) : '';
