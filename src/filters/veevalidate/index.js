import { Validator } from 'vee-validate';

Validator.extend('phone', {
  getMessage: (field, [args]) => `请输入正确的手机号码`,
  validate: value => {
    return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value);
  }
});

Validator.extend('yzcode', {
  getMessage: (field, [args]) => `请输入正确的验证码`,
  validate: value => {
    return /^\d{6}$/.test(value);
  }
});
