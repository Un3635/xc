import api from './api';
import TokenAPI from "./token-api";
import AppConfig from "../config";

/**
 * 获取用户地址列表
 * @returns {Promise<*>}
 */
const addressList = () => TokenAPI.getValid().then(token => api.$get(AppConfig.getAddressList, {params: {token}}));

/**
 * 保存地址
 * @param {string}  address   地址信息字符串
 * @param {string}  mobile    用户手机号码
 * @param {string}  name      收货人姓名
 * @param {boolean} setDefault 设为默认
 * @returns {Promise<*>}
 */
const addressSave = (address, mobile, name, setDefault = false) => TokenAPI.getValid().then(token => api.$post(AppConfig.saveAddress, {
  address,
  mobile,
  name,
  setDefault,
  token
}));

/**
 * 地址更新
 * @param {string|number}   addressId   地址ID
 * @param {string}          address     地址信息字符串
 * @param {string}          mobile      收货人手机号
 * @param {string}          name        收货人姓名
 * @param {boolean}         setDefault  设为默认
 * @returns {Promise<*>}
 */
const addressUpdate = (addressId, address, mobile, name, setDefault = false) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateAddress, {
  addressId,
  mobile,
  name,
  address,
  setDefault,
  type: 1,
  token
}));

/**
 * 地址删除
 * @param {string|number}   addressId   地址ID
 * @param {string}          address     地址信息字符串
 * @param {string}          mobile      收货人手机号
 * @param {string}          name        收货人姓名
 * @returns {Promise<*>}
 */
const addressDelete = (addressId, address, mobile, name) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateAddress, {
  addressId,
  mobile,
  name,
  address,
  type: 0,
  token
}));

/**
 * 更新默认收货地址
 * @param {string} addressId  地址Id
 * @param {boolean} isDefault 是否为默认
 * @return {Promise<*>}
 */
const updateDefaultAddress = (addressId, isDefault = true) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateDefaultAddress, {
  token,
  addressId,
  setDefault: isDefault
}));

const AddressAPI = {
  delete: addressDelete,
  update: addressUpdate,
  add: addressSave,
  get: addressList,
  updateDefault: updateDefaultAddress
};

export default AddressAPI;
