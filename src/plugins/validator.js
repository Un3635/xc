import VeeValidate from 'vee-validate';
import AppConfig from '../config/index';

VeeValidate.Validator.extend('phone', (val) => {
  return AppConfig.regex.phone.test(val);
});
VeeValidate.Validator.extend('code', (val) => {
  return AppConfig.regex.code.test(val);
});
VeeValidate.Validator.extend('password', (val) => {
  return AppConfig.regex.password.test(val);
});
VeeValidate.Validator.extend('bankcard', (val) => {
  return AppConfig.regex.card.test(val);
});
VeeValidate.Validator.extend('bank', (val) => {
  return AppConfig.regex.bank.test(val);
});
VeeValidate.Validator.extend('idCard', (val) => {
  return AppConfig.regex.idCard.test(val);
});

export default VeeValidate;
