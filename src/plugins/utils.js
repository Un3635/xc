/**
 * 存储localStorage
 * @param {string}  key
 * @param {string|Object} val
 */
export const setStore = (key, val) => {
  if (!key && !isClient) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }
  window.localStorage.setItem(key, val);
};

/**
 * 获取localStorage
 * @param {string} key
 * @return {string | null | void}
 */
export const getStore = key => {
  if (!isClient) return;
  return window.localStorage.getItem(key);
};

/**
 * 移除localStorage
 * @param {string} key
 */
export const removeStore = key => {
  if (isClient && key) {
    window.localStorage.removeItem(key);
  }
};

/**
 * 是否为客户端
 * @type {boolean}
 */
export const isClient = process.env.VUE_ENV === 'client';

/**
 * 是否为手机
 * @type {boolean}
 */
export const isMobile = isClient && /(iPhone|(?=.*\bAndroid\b)(?=.*\bMobile\b)|Windows\sPhone|BlackBerry)/i.test(window.userAgent || navigator.userAgent);

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
  return Promise.reject(null
  );
};
