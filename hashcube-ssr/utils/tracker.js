//PageView统计
const pv = (pageUrl) => _hmt.push(['_trackPageview', pageUrl]);
//Event统计
const ev = (category, action, optLabel, optValue) => _hmt.push(['_trackEvent', category, action, optLabel, optValue]);
/**
 *
 * @param {Object} order
 * @param {string} order.orderId  订单号
 * @param {string|number} order.orderTotal 订单总金额
 * @param {Object[]} order.item  订单包含的商品条目数组
 * @param {string}  order.item[].skuId 商品Id
 * @param {string}  order.item[].skuName 商品名称
 * @param {string}  order.item[].category 商品所属类别
 * @param {string|number} order.item[].Price 商品金额
 * @param {string|number} order.item[].Quantity 商品金额
 * @returns {number}
 */
const trackOrder = (order) => _hmt.push(['_trackOrder', order]);

export default {
  pv,
  ev,
  trackOrder,
  install: (Vue) => {
    Vue.tracker = Vue.prototype.$tracker = {pv, ev, trackOrder};
  }
};
