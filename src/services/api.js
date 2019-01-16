import axios from "axios";
import qs from 'qs';
import apiConfig from "../config";

function responseFn(res) {
  if (res.data.code === "000000") {
    return Promise.resolve(res);
  }  else if(apiConfig.codes[res.data.code]) {
    return Promise.resolve({
      code: res.data.code,
      msg: apiConfig.codes[res.data.code]
    });
  } else {
    return Promise.reject(res);
  }
}
function errorFn(res) {
  return Promise.reject(res);
}
const API = {
  $get: (url, token, data) => {
    return axios
      .get(
        apiConfig.ip + url, 
        {
          headers: {"token": token || ''},
          params: data
        },
        )
      .then(responseFn)
      .catch(errorFn);
  },
  $post: (url, token, data) => {
    return axios
      .post(
        apiConfig.ip + url, 
        qs.stringify(data),
        {
          headers: {"token": token || ''}
        })
      .then(responseFn)
      .catch(errorFn);
  }
};

/**
 * 兑换记录
 */

const exchange = (token, page, pagesize) => {
  return API.$get(apiConfig.exchange, token, {
    page,
    pagesize
  });
};

/**
 * 提现记录
 */
const withdrawal = (token, page, pagesize) => {
  return API.$get(apiConfig.withdrawal, token, {
    page,
    pagesize
  });
};

/**
 * 钻石收支明细
 */
const diamondDetail = (token, type, page, pagesize) => {
  return API.$get(apiConfig.diamondDetail, token, {
    type,
    page,
    pagesize
  });
}

/**
 * 宝石收支明细
 */
const gemDetail = (token, type, page, pagesize) => {
  return API.$get(apiConfig.gemDetail, token, {
    type,
    page,
    pagesize
  });
}

/**
 *  常见问题
 */

const question = (token) => {
  return API.$get(apiConfig.question, token, {});
}

/**
 * 接收礼包
 * @param {*} token 
 * @param {*} bagId 
 */

const receive = (token, bagId) => {
  return API.$post(apiConfig.bagReceive, token, {
    bagId
  })
}

/**
 * 
 * @param {*} type 
 */
const info = (token, giftBagId) => {
  return API.$get(apiConfig.bagInfo, token, {
    giftBagId
  })
}

/**
 * 邀请提现
 * @param {*} token 
 * @param {*} number 
 * @param {*} account 
 * @param {*} userName 
 */
const insertGemsPutForward = (token, number, account, userName) => {
  return API.$post(apiConfig.insertGemsPutForward, token, {
    number,
    account,
    userName
  })
}

/**
 * 邀请提现明细列表
 * @param {*} token 
 * @param {*} page 
 * @param {*} pagesize 
 */
const inviteForwardList = (token, page, pagesize) => {
  return API.$get(apiConfig.inviteForwardList, token, {
    page,
    pagesize
  })
}

/**
 * 我的战绩记录列表
 * @param {*} token 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 */
const myRecordList = (token, pageIndex, pageSize) => {
  return API.$post(apiConfig.myRecordList, token, {
    pageIndex,
    pageSize
  })
}

/**
 * 邀请注册
 * @param {*} token 
 * @param {*} invitationCode 
 * @param {*} phone 
 * @param {*} code 
 */
const register = (token, invitationCode, phone, code, type) => {
  return API.$post(apiConfig.register, token, {
    invitationCode,
    phone,
    code,
    type
  })
}

/**
 * 获取验证码
 * @param {*} token 
 * @param {*} phone 
 */
const gainSms = (token, phone) => {
  return API.$post(apiConfig.gainSms, token, {
    phone
  })
}

/**
 * 获取版本审核
 * @param {*} token 
 */
const getReviewState = (token) => {
  return API.$get(apiConfig.getReviewState, {
    token
  })
}

const getType = (type) => {
  return apiConfig.details[type + ''];
}
const getPic = (type) => {
  return apiConfig.pic[type];
}

export default {
  exchange,
  withdrawal,
  diamondDetail,
  gemDetail,
  getType,
  getPic,
  question,
  receive,
  info,
  insertGemsPutForward,
  inviteForwardList,
  myRecordList,
  register,
  gainSms,
  getReviewState
};
