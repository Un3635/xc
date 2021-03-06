/* eslint no-console: 0 */

import Cookies from 'js-cookie'
import UaParser from 'ua-parser-js'

// D2Admin 版本
const version = process.env.VUE_APP_ICE_VERSION

const util = {
  cookies: {}
}

// /**
//  * @description 存储 cookie 值
//  * @param {String} name cookie name
//  * @param {String} value cookie value
//  * @param {Object} setting cookie setting
//  */
// util.cookies.set = function cookiesSet (name = 'default', value = '', setting = {}) {
//   const cookieSetting = {
//     expires:1
//   }
//   Object.assign(cookieSetting, setting)
//   // Cookies.set(`d2admin-ice-${version}-${name}`, value, cookieSetting)
//   Cookies.set(`d2admin-ice-${version}-${name}`, value) //不设置过期时间，浏览器关闭cookie过期
// }

// /**
//  * @description 拿到 cookie 值
//  * @param {String} name cookie name
//  */
// util.cookies.get = function cookiesGet (name = 'default') {
//   return Cookies.get(`d2admin-ice-${version}-${name}`)
// }

// /**
//  * @description 拿到 cookie 全部的值
//  */
// util.cookies.getAll = function cookiesGetAll () {
//   return Cookies.get()
// }

// /**
//  * @description 删除 cookie
//  * @param {String} name cookie name
//  */
// util.cookies.remove = function cookiesRemove (name = 'default') {
//   return Cookies.remove(`d2admin-ice-${version}-${name}`)
// }


/************************************************hellen********************************************************************/
/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
util.cookies.set = function cookiesSet (name = 'default', value = '', setting = {}) {
  const cookieSetting = {
    expires:1
  }
  Object.assign(cookieSetting, setting)
  Object.assign(value, cookieSetting);
  // Cookies.set(`d2admin-ice-${version}-${name}`, value, cookieSetting)
  if(typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(`d2admin-ice-${version}-${name}`, value);

  // Cookies.set(`d2admin-ice-${version}-${name}`, value) //不设置过期时间，浏览器关闭cookie过期
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
util.cookies.get = function cookiesGet (name = 'default') {
  return localStorage.getItem(`d2admin-ice-${version}-${name}`);
  // return Cookies.get(`d2admin-ice-${version}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
util.cookies.getAll = function cookiesGetAll () {
  return null;
  // return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
util.cookies.remove = function cookiesRemove (name = 'default') {
  return localStorage.removeItem(`d2admin-ice-${version}-${name}`);
  // return Cookies.remove(`d2admin-ice-${version}-${name}`)
}

/********************************************************************************************************************/

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function title (titleText) {
  window.document.title = `${process.env.VUE_APP_TITLE}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 获取所有的 UA 信息
 */
util.ua = function ua () {
  return new UaParser().getResult()
}

/**
 * @description 判断是否在其内
 * @param {*} ele element
 * @param {Array} targetArr array
 */
util.isOneOf = function isOneOf (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  }
  return false
}

/**
 * @description 打印一个 “胶囊” 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 */
util.logCapsule = function logCapsule (title, info) {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#29384b; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
    'background:#3488ff; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
}

/**
 * @description 显示版本信息
 */
util.showInfo = function showInfo () {
  util.logCapsule('meet', `v${version}`)
  console.log('Github https://github.com/d2-projects/d2-admin')
  console.log('Doc    http://d2admin.fairyever.com/zh/')
}

export default util
