import Vue from 'vue';
import {Validator, install as VeeValidate} from 'vee-validate/dist/vee-validate.esm';
import {required} from 'vee-validate/dist/rules.esm';
import {AppConfig} from '../services/config';

Validator.extend('required', required);
Validator.extend('account', (val) => {
  return AppConfig.regExp.phone.test(val) || AppConfig.regExp.email.test(val);
});
Validator.extend('password', (val) => {
  return AppConfig.regExp.password.test(val);
});
Validator.extend('code', (val) => {
  return AppConfig.regExp.code.test(val);
});
Validator.extend('zipCode', (val) => {
  return AppConfig.regExp.zipCode.test(val);
});
Validator.extend('zipCodeNum', (val) => {
  return AppConfig.regExp.zipCodeNum.test(val);
});
Validator.extend('phone', (val) => {
  return AppConfig.regExp.phone.test(val);
});
Validator.extend('addressPhone', (val) => {
  return AppConfig.regExp.addressPhone.test(val);
});
Validator.extend('bankcard', (val) => {
  return AppConfig.regExp.bankcard.test(val);
});
Validator.extend('creditCard', (val) => {
  return AppConfig.regExp.creditCard.test(val);
});
Vue.use(VeeValidate, AppConfig.validateConfig);
