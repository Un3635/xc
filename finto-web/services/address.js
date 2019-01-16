/**
 * Created by admin on 2018/7/16.
 */
import api from './api';
import {AppConfig} from './config';
import TokenAPI from './token-api';

/**
 * 获取用户收货地址
 */
const getAddressList = () => TokenAPI.getValid().then(token => api.$get(AppConfig.getAddressList, {params: {token}}));
/**
 * 新增用户收货地址
 * @param {string|number} postcode 邮编
 * @param {string|number} prefecture  都道府县
 * @param {string|number} address 收货地址
 * @param {string|number} mobile 收货人手机号码
 * @param {string|number} name 收货人名字
 * @param {string|number} addressId 地址ID
 * @param {string|number} setDefault 设置为默认地址, 默认不设置(false)
 *  @param {string|number} type  修改地址的时候采用的操作状态 1修改 0删除
 */
const saveAddress = (postcode, prefecture, address, mobile, name, addressId, type, setDefault = false) => TokenAPI.getValid().then(token => api.$post(AppConfig.saveAddress,
  {
    token,
    postcode,
    prefecture,
    address,
    mobile,
    name,
    addressId,
    setDefault,
    type
  }));
/**
 * 修改用户收货地址
 * @param {string|number} postcode 邮编
 * @param {string|number} prefecture  都道府县
 * @param {string|number} address 收货地址
 * @param {string|number} mobile 收货人手机号码
 * @param {string|number} name 收货人名字
 * @param {string|number} addressId 地址ID
 * @param {string|number} setDefault 设置为默认地址, 默认不设置(false)
 *  @param {string|number} type  修改地址的时候采用的操作状态 1修改 0删除
 */
const updateAddress = (postcode, prefecture, address, mobile, name, addressId, type, setDefault = false) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateAddress, {
  token,
  postcode,
  prefecture,
  address,
  mobile,
  name,
  addressId,
  setDefault,
  type
}));
/**
 * 更改地址的默认状态
 * @param {string|number} setDefault 是否设置为默认,默认为true(进行设置默认地址)
 * @param {string|number} token 用户Token
 * @param {string|number} addressId 地址ID
 */
const updateStatus = (addressId, setDefault = true) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateStatus, {
  token,
  setDefault,
  addressId
}));
/**
 * 根据邮编获取城市信息
 * @param {string|number} code 邮编
 */
const getCityByCode = (code) => api.$get(AppConfig.getCityByCode, {
  params: {
    code
  }
});
export default {
  getAddressList,
  saveAddress,
  updateAddress,
  updateStatus,
  getCityByCode
};
