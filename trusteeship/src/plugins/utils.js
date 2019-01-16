/**
 * 存储localStorage
 * @param {string}  key
 * @param {string|Object} val
 */
import {BankInfo} from '../config/constants';

export const setStore = (key, val) => {
  if (!key) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }
  localStorage.setItem(key, val);
};

/**
 * 获取localStorage
 * @param {string} key
 * @return {string | null}
 */
export const getStore = key => {
  return localStorage.getItem(key);
};

/**
 * 移除localStorage
 * @param {string} key
 */
export const removeStore = key => {
  if (!key) return;
  localStorage.removeItem(key);
};

/**
 * 是否为手机
 * @type {boolean}
 */
export const isMobile = /(iPhone|(?=.*\bAndroid\b)(?=.*\bMobile\b)|Windows\sPhone|BlackBerry)/i.test(window.userAgent || navigator.userAgent);

/**
 * 显示第一位数字，后面用指定的replaceValue来代替
 * @param {number|string} price
 * @param {string} replaceValue
 * @return {string}
 */
export const showFirstNumber = (price, replaceValue = '?') => (price + '').substring(0, 1) + (price + '').substring(1).replace(/./g, replaceValue);


/**
 * 将值转化为promise
 * @param {*} validateResult 待转化的值
 * @return {*}
 */
export const toPromise = validateResult => {
  if (validateResult) {
    return Promise.resolve(validateResult);
  }
  return Promise.reject(null);
};

/**
 * 根据银行简称获取银行基本信息
 * @param {string} code  银行简称
 * @return {*}
 */
export const getBankInfo = code => BankInfo.find(item => item.code === code);


/**
 * 根据给定的数值值返回一个hash转换函数
 * @param {number} value   给定值
 * @param {number} decimal 小数数位
 * @returns {function(*, *=): string}
 */
export const getHashFormatter = (value, decimal = 2) => {
  const unit2hash = [
    {unit: 'Q', bound: 1e18},
    {unit: 'E', bound: 1e15},
    {unit: 'P', bound: 1e12},
    {unit: 'T', bound: 1e9},
    {unit: 'G', bound: 1e6},
    {unit: 'K', bound: 1e3},
    {unit: 'H', bound: 1}
  ];

  const {unit, bound} = unit2hash.find(item => item.bound <= value);
  return (val) => (val / (bound || 1)).toFixed(decimal) + (unit || 'H');
};

// /**
//  * 图表x轴lastHour初始化
//  * @param firstHour  x轴初始时间，即x轴的第一条数据
//  * @param interval  x轴间隔时间
//  * @return {*}
//  */
// export function lastHourUnit(firstHour, interval) {
//   firstHour = new Date(firstHour.replace(new RegExp(/-/gm), '/')).getHours();
//   let lastHour = firstHour % interval === 0 ? firstHour - interval : firstHour >= 24 - interval ? -1 * interval : firstHour - firstHour % interval;
//   console.log(lastHour);
//   return lastHour;
// }
//
// /**
//  * 图表x轴格式化
//  * @param value
//  * @param lastHour  上次显示时间
//  * @param interval  x轴间隔时间
//  * @return {*}
//  */
// export function xAxisFormat(value, lastHour, interval) {
//   value = value.replace(new RegExp(/-/gm), '/');// 兼容ie和其它浏览器（Date）
//   let date = new Date(value);
//   let hour = date.getHours();
//   let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
//   if (hour % interval === 0) {
//     if (minute.toString() === '00' && hour !== lastHour) {
//       lastHour = hour === 24 - interval ? -1 * interval : hour;
//       return {curHour: '' + hour, lastHour: lastHour};
//     } else if (hour === lastHour + interval) {
//       lastHour = hour === 24 - interval ? -1 * interval : hour;
//       return {curHour: '' + hour, lastHour: lastHour};
//     }
//   }
// }

/**
 * 使用给定字符替换指定位置间的每个字符
 * @param {String} sourceStr  源字符
 * @param {String} replaceStr 替换字符
 * @param {number} start      开始位置，默认从开头开始替换
 * @param {number} end        结束位置，默认为最大值
 * @returns {string}  替换后的字符串
 */
export function replacePos(sourceStr = '', replaceStr = '*', start = 0, end = Number.MAX_SAFE_INTEGER) {
  return sourceStr
    .split('')
    .map((value, index) => (index >= start && index < end) ? replaceStr : value)
    .join('');
}

/**
 * 邮箱脱敏处理
 *
 * @param {String}  email 待脱敏邮箱
 * @returns {string} 脱敏后的邮箱
 */
export function hideEmail(email) {
  let arr = email.split('@');
  return replacePos(arr[0], '*', 3) + '@' + arr[1];
}

/**
 * 获取给定字符串最后len字符
 * @param {string} str 给定字符串
 * @param {number} [len] 获取的长度,默认为1
 * @returns {string}
 */
export function last(str = '', len = 1) {
  if (!str) return '';
  return str.substr(str.length - len, len);
}

/**
 * 删除给定字符串末尾len个字符
 * @param {string} str 给定字符串
 * @param {number} [len] 单位位数,默认一位
 * @returns {string}
 */
export function deleteLast(str = '', len = 1) {
  if (!str) return '';
  return str.substr(0, str.length - len);
}
