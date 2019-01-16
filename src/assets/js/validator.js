const regexp = {
  phone: /^1\d{10}$/,
  email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
  isNum : /^\d+(\.\d+)?$/,
  pwd: /^[0-9a-zA-Z]+$/
}
const validators = {
  checkPhone: (rule, value, callback) => {
    if(value && value !== ''){
      if(value.match(regexp.phone)){
        callback();
      }else{
        callback(new Error('请输入正确的手机号'));
      }
    } else {
      callback();
    }
  },
  checkEmail: (rule,value ,callback) =>{
    if(value && value !== '') {
      if (value.match(regexp.email)) {
        setTimeout(() => {
          callback();
        }, 1000);
      } else {
        callback('请输入正确的邮箱格式')
      }
    } else {
      callback();
    }
  },
  checkPwd: (rule,value ,callback) =>{
    if(value && value !== '') {
      if (value.match(regexp.pwd)) {
        setTimeout(() => {
          callback();
        }, 1000);
      } else {
        callback('密码只能包含字母和数字')
      }
    } else {
      callback();
    }
  }
}
export default validators;