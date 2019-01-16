

import Vue from 'vue'
let debugText = false

let bus = new Vue()
let allMethods = {
  API: process.env.APP_ROOT,
  ENV: process.env.NODE_ENV,
  phoneReg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9])\d{8}$/,
  passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
  ChineseReg: /^[\u4E00-\u9FA5]{5,}公司$/,
  captchaReg: /^\d{6}$/,
  numberReg: /^[0-9]+$/,

  printmsg: function (a, b) {
    if (debugText) {
      // console.log(a, b)
    }
  },
  GetQueryString: function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  getRealLen: function (arr) {
    let l = 0
    let str = arr.split('')
    for (let i = 0; i < str.length; i++) {
      if (str[i].charCodeAt(0) < 299) {
        l++
      } else {
        l += 2
      }
    }
    this.printmsg('getRealLen len is', l)
    return l
  },
  getLimitNamebyName: function (itemname, num) {
    let name = itemname.slice(0, itemname.lastIndexOf('.'))
    let type = itemname.slice(itemname.lastIndexOf('.'))
    let l = 0
    let str = name.split('')
    let newname = ''
    for (let i = 0; i < str.length; i++) {
      // printmsg('[str i is]',str[i])

      if (str[i].charCodeAt(0) < 299) {
        l++
      } else {
        l = l + 2
      }
      if (l > num) {
        this.printmsg('l is' + l, 'num is ' + num)
        return newname + '...' + type
      }
      newname = newname + str[i]
    }
    return newname + type
  },
  getStatusByrate: function (num) {
    num = Number(num)
    this.printmsg('num is', num)

    if (!(typeof num === 'number') || num < 0.01) {
      this.printmsg('not number or least', num)
      return false
    }
    if (String(num).indexOf('.') !== -1 && String(num).split('.')[1].length > 2) {
      this.printmsg('bigger than 2', num)
      return false
    }
    return true
  },
  gettimestr: function (str) {
    let y = str.slice(0, 4) + '年'
    let m = str.slice(5, 7) + '月'
    let d = str.slice(8, 10) + '日'
    let t = str.slice(11, 19)
    return y + m + d + ' ' + t
  },
  fmoney: function (s, n = 2) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  },
  checktoken(){
    if(!localStorage.getItem('xckz_mall')){
      bus.$emit('isLogin', 'login')
      return false
    }
    return true
  },
  /*
   * @param vm       需要弹框的对象
   * @param tip      提示信息
   * @param type     消息类型，用于显示图标，可选值success / info / warning / error
   * @param callback 回调函数
   * @param title    弹框的标题
   */
  alertTip(vm, tip, type = 'warning', title = '', callback=function (){}){
    vm.$alert(tip, title, {
      confirmButtonText: '确定',
      type:type,
      callback:callback,
    });
  },
}

function getUrlHeader() {

  switch(allMethods.ENV){
    case 'production' || 'prod' || 'product':
      return 'http://www.xiaochong.cn';
    case 'test' || 'testing':
      return '47.96.37.107:8287';
  }
}

export {
  allMethods,
  bus,
  getUrlHeader
}
