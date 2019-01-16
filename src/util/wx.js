import {parseUrl, setStore, getStore} from '../plugins/utils';
import {AppId} from '../config';
import weChatApi from '../services/wechat-api';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  // 已经授权, 存在openid且未过期
  let wxInfo = JSON.parse(getStore('wx_info') || '{}');
  if (wxInfo && wxInfo.openid && Date.now() < wxInfo.expires_in) {
    return;
  }
  // 初次进入
  let {code, hashName} = parseUrl(window.location.href).params;
  if (code) {
    let jumpHref = window.location.href;
    // 删除code、state、hashName参数 (防止code重复使用)
    jumpHref = jumpHref.replace(/(\\?|\\&)(code=)([^&]*)&*/gi, function (parame, a) {
      return a;
    }).replace(/(\\?|\\&)(state=)([^&]*)&*/gi, function (parame, a) {
      return a;
    });
    if (hashName) {
      jumpHref = jumpHref.replace(/(\\?|\\&)(hashName=)([^&]*)&*/gi, function (parame, a) {
        return a;
      }).replace('?', '#' + hashName + '?');
    }
    if (jumpHref.substr(jumpHref.length - 1) === '?') {
      jumpHref = jumpHref.substring(0, jumpHref.length - 1);
    }
    weChatApi.getOpenidByCode(code)
      .then(res => JSON.parse(res.result || '{}'))
      .then(res => {
        if (res.errcode) {
          return Promise.reject(res);
        } else {
          return Promise.resolve(res);
        }
      })
      .then(res => {
        let wxInfo = Object.assign(res, {
          expires_in: Date.now() + res.expires_in * 1000  // 过期时间
        });
        setStore('wx_info', wxInfo);
        window.location.href = jumpHref;
      })
      .catch(error => {
        window.alert(`微信授权失败\n errcode: ${error.errcode} \n errmsg: ${error.errmsg}`);
        console.error('微信授权失败...', error);
        window.location.href = jumpHref;
      });
  } else {
    let currentHref = window.location.href;
    // let currentHref = 'http://xiaochongtestcubemm.hc.top';
    let redirectUri = window.encodeURIComponent(currentHref);
    let jumpHref = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    window.location.href = jumpHref;
  }
};
