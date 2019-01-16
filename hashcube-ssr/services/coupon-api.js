import API from './api';
import TokenAPI from './token-api';
import AppConfig from '../config';

/**
 * 获取商品优惠券
 * @param {string|number}  goodsId      商品Id
 * @param {string|number}  goodsType    商品类型(1:矿机 2:算力)
 * @returns {Promise<*>}
 */
const couponInfoList = (goodsId, goodsType) => TokenAPI.getValid()
  .then((token) => API.$post(AppConfig.couponInfoList, {
    token,
    goodsType,
    channelType: AppConfig.appTag,
    goodsId
  }));


/**
 * 查询当前账户优惠劵
 * @param {string|number} status  优惠券状态
 * @param {string|number} type    优惠券类型
 * @param {string|number} [coupon]  优惠券筛选参数
 * @returns {Promise<*>}
 */
const couponList = (status, type, coupon) => TokenAPI.getValid()
  .then(token => API.$post(AppConfig.couponList, {
    status,
    type,
    coupon,
    token
  }));

/**
 * 优惠券转入信息
 * @param {string|number} couponInfoId 优惠券Id
 * @param {string} expiryDateStart     优惠券起始有效期
 * @param {string} expiryDateEnd       优惠券终止日期
 * @returns {Promise<*>}
 */
const couponShiftList = (couponInfoId, expiryDateStart, expiryDateEnd) => TokenAPI.getValid()
  .then(token =>
    API.$post(AppConfig.couponShiftList, {
      token,
      couponInfoId,
      expiryDateStart,
      expiryDateEnd
    }));

/**
 * 优惠券转出信息
 * @param {string|number} couponInfoId 优惠券Id
 * @param {string} expiryDateStart     优惠券起始有效期
 * @param {string} expiryDateEnd       优惠券终止日期
 * @returns {Promise<*>}
 */
const couponOutList = (couponInfoId, expiryDateStart, expiryDateEnd) => TokenAPI.getValid()
  .then(token =>
    API.$post(AppConfig.couponOutList, {
      token,
      couponInfoId,
      expiryDateStart,
      expiryDateEnd
    }));

/**
 * 优惠券转出
 * @param {object} params
 * @param {string|number} params.account      接受者账户
 * @param {number} params.count               转出数量
 * @param {string|number} params.couponInfoId 优惠券Id
 * @param {string} params.expiryDateStart     优惠券开始日期
 * @param {string} params.expiryDateEnd       优惠券终止日期
 * @param {string} params.code                验证码
 * @param {string} params.codeToken           验证码识别码
 * @returns {Promise<*>}
 */
const couponTransfer = (params) => TokenAPI.getValid()
  .then(token => API.$post(AppConfig.couponTransfer, {
    token,
    ...params
  }));

/**
 * 两张优惠券是否相同
 * @param {obj} c1
 * @param {obj} c2
 * @returns {boolean}
 */
const isEquals = (c1, c2) => c1.couponInfoId === c2.couponInfoId && c1.startTime === c2.startTime && c1.endTime === c2.endTime;

/**
 * 领取优惠券
 * @param {string}   couponId   优惠券id
 * @returns {Promise<*>}
 */
const getCoupon = couponId => TokenAPI.getValid().then(token => API.$post(AppConfig.getCoupon, {
  couponId,
  token
}));

/**
 * 获取优惠券活动信息(双11)
 * @returns {Promise<*>}
 */
const getActivityCouponInfo = () => API.$post(AppConfig.getActivityCouponInfo);

const CouponAPI = {
  CouponStatus: {
    UNAVAILABLE: 0,  // 暂不可用
    AVAILABLE: 1,    // 可用
    BIND: 2,         // 已绑定
    USED: 3,         // 已使用
    EXPIRED: 4,      // 已过期
    TRANSFER_OUT: 5  // 已转出
  },
  CouponType: {
    ALL: 0,           // 全部
    MINER_VOUCHER: 1, // 矿机抵用券
    HASH_VOUCHER: 2,  // 算力抵用券
    MINER_DISCOUNT: 3,// 矿机折扣券
    HASH_DISCOUNT: 4  // 算力折扣券
  },
  CouponFilters: {
    NEW: 0,           // 新到账
    TRANSFER: 1,      // 可转出
    CLOSE_EXPIRE: 2   // 即将到期
  },
  isEquals,
  couponList,
  couponShiftList,
  couponTransfer,
  couponOutList,
  couponInfoList,
  getCoupon,
  getActivityCouponInfo
};

export default CouponAPI;
