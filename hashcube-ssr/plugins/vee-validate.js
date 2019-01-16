import Vue from 'vue';
import {Validator, install as VeeValidate} from 'vee-validate/dist/vee-validate.esm';
import {required} from 'vee-validate/dist/rules.esm';
import AppConfig from '../config';

Validator.extend('required', required);

Validator.extend('phone', (val) => {
  return AppConfig.regex.phone.test(val);
});
Validator.extend('code', (val) => {
  return AppConfig.regex.code.test(val);
});
Validator.extend('password', (val) => {
  return AppConfig.regex.password.test(val);
});
Validator.extend('bankcard', (val) => {
  return AppConfig.regex.card.test(val);
});
Validator.extend('bank', (val) => {
  return AppConfig.regex.bank.test(val);
});
Validator.extend('idCard', (val) => {
  return AppConfig.regex.idCard.test(val);
});
Validator.extend('account', (val) => {
  return AppConfig.regex.allPhone.test(val) || AppConfig.regex.email.test(val);
});

Vue.use(VeeValidate, AppConfig.validateConfig);
