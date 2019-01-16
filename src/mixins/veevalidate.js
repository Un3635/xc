
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';
Validator.addLocale(zh);
Validator.extend('username', {
  messages: {
    zh: '请输入大于15小于200'
  },
  validate: value => {
    return /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/.test(value)
  }
});
const dict = {
  zh: {
    custom: {
      username:{
        required: '您还没有填写用户名！',
        username:'用户名为邮箱格式'
      }
    }
  }
};
Validator.updateDictionary(dict);

Vue.use(VeeValidate, {
  locale: 'zh',
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  events: 'input|blur',
  class:true
  // dictionary:{
  //   'zh':{
  //     custom:{
  //       username:{required: '您还没有填写用户名！',username:'用户名不能为空'}
  //     }
  //   }
  // }
});