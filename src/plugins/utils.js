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
 * 存储sessionStorage
 * @param {string}  key
 * @param {string|Object} val
 */
export const setSessionStore = (key, val) => {
  if (!key && !isClient) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }
  window.sessionStorage.setItem(key, val);
};

/**
 * 获取sessionStorage
 * @param {string} key
 * @return {string | null | void}
 */
export const getSessionStore = key => {
  if (!isClient) return;
  return window.sessionStorage.getItem(key);
};

/**
 * 移除sessionStorage
 * @param {string} key
 */
export const removeSessionStore = key => {
  if (isClient && key) {
    window.sessionStorage.removeItem(key);
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
 * 是否为微信环境
 * @type {boolean}
 */
export const isWeChat = isClient && /MicroMessenger/i.test(window.userAgent || navigator.userAgent);

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

export const parseUrl = url => {
  if (!url) {
    return;
  }
  let aEl = document.createElement('a');
  aEl.href = url;
  return {
    protocol: aEl.protocol.replace(':', ''),
    host: aEl.hostname,
    port: aEl.port,
    query: (function () {
      if (aEl.search) {
        return aEl.search;
      }
//    兼容http://xxxx/#/id=xxx这种格式
      if (url.indexOf('?') !== -1) {
        return url.substring(url.indexOf('?'));
      }
      return '';
    })(),
    params: (function () {
      let ret = {};
      let seg = aEl.search;
//    兼容http://xxxx/#/id=xxx这种格式
      if (!seg && url.indexOf('?') !== -1) {
        seg = url.substring(url.indexOf('?'));
      }
      seg = seg.replace(/^\?/, '').split('&');
      let len = seg.length;
      let s;
      for (let i = 0; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (aEl.pathname.match(/\/([^/?#]+)$/i) || [null, ''])[1],
    hash: aEl.hash.replace('#', ''),
    path: aEl.pathname.replace(/^([^/])/, '/$1'),
    relative: (aEl.href.match(/tps?:\/\/[^/]+(.+)/) || [null, ''])[1],
    segments: aEl.pathname.replace(/^\//, '').split('/')
  };
};
