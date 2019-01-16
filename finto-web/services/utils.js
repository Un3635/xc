import Vue from 'vue';

export const EventBus = new Vue();

// 是否是客户端
export const isClient = process.client;

/**
 * 存储localStorage
 * @param {string}  key
 * @param {string|Object} val
 */
export const setStore = (key, val) => {
  if (!isClient && !key) return;
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
  if (!isClient) {
    return null;
  }
  return localStorage.getItem(key);
};

/**
 * 移除localStorage
 * @param {string} key
 */
export const removeStore = key => {
  if (!isClient && !key) return;
  localStorage.removeItem(key);
};

/**
 * 是否为手机
 * @type {boolean}
 */
export const isMobile = isClient && /(iPhone|(?=.*\bAndroid\b)(?=.*\bMobile\b)|Windows\sPhone|BlackBerry)/i.test(window.userAgent || navigator.userAgent);

/**
 * 将值转化为promise
 * @param {*} validateResult 待转化的值
 * @return {*}
 */
export const toPromise = validateResult => {
  if (validateResult) {
    return validateResult;
  }
  return Promise.reject(null);
};

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

/**
 * 倒计时器
 * @param {number} seconds 倒计时时长
 * @returns {*}
 * @constructor
 */
export function CountDown(seconds) {
  return {
    timer: null,
    _endHandler: null,
    start(fn) {
      let self = this;
      fn && fn(seconds);
      self.timer = setInterval(function () {
        seconds--;
        fn && fn(seconds);
        if (seconds === 0) {
          self._endHandler && self._endHandler();
          self.cancel();
        }
      }, 1000);
      return self;
    },
    end(fn) {
      this._endHandler = fn;
      return this;
    },
    cancel() {
      clearInterval(this.timer);
      return this;
    }
  };
}


/**
 * 全角英数字转换为半角英文数字
 * @param {String} str - 待转换字符串
 * @example
 * toCBD('abｃAＢC12３');　// abcABC123
 * @return {String}
 */
export function toCDB(str) {
  let code, i = str.length,
    result = '';
  while (i--) {
    code = str.charCodeAt(i);
    //　【！】～【～】范围
    if (0xFF01 <= code && code <= 0xFF5E) {
      result += String.fromCharCode(code - 0xFEE0);
    } else if (code === 0x3000) { //全角空格
      result += String.fromCharCode(0x0020);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 半角英数字转全角英数字
 * @param {String} str - 待转换字符串
 * @example
 * toDBC('abｃAＢC12３');　// ａｂｃＡＢＣ１２３
 * @return {String}
 */
export function toDBC(str) {
  let code, i = str.length,
    result = '';
  while (i--) {
    code = str.charCodeAt(i);
    if (0x0021 <= code && code <= 0x007E) {
      result += String.fromCharCode(code - 0xFEE0);
    } else if (code === 0x0020) { //全角空格
      result = String.fromCharCode(0x3000);
    } else {
      result += str[i];
    }
  }
  return result;
}
