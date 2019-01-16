const regexp = {
  phone: /^1\d{10}$/,
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/,
  // pwd: /^[a-z0-9]{8,18}$/,
  yzPwd: /^\d{6}$/,
  isNum : /^\d+(\.\d+)?$/
}

const validators = {
  checkPhone: (rule, value, callback) => {
    if(value.match(regexp.phone))
    {
      callback();
    }
    else
    {
      callback(new Error('请输入正确的手机号'));
    }
  },
  checkYzPwd: (rule, value, callback) => {
    if(value.match(regexp.yzPwd))
    {
      callback();
    }
    else
    {
      callback(new Error('请输入正确的验证码'));
    }
  },
  checkGooleYzCode: (rule, value, callback) => {
    if(value.match(regexp.yzPwd))
    {
      callback();
    }
    else
    {
      callback(new Error('请输入正确的谷歌验证码'));
    }
  },
  checkPwd: (rule, value, callback) => {
    if(value.match(regexp.pwd))
    {
      callback();
    }
    else
    {
      callback(new Error('请输入合格的密码格式'));
    }
  },
  check: (rule, value, callback) => {
    if(value.match(regexp.pwd))
    {
      callback();
    }
    else
    {
      callback(new Error('请输入合格的密码格式'));
    }
  },

  //我的账户表单验证
  checkAdd : (rule, value, callback) => {
    if (value === '' || !value) {
        callback(new Error('提币地址不能为空'));
    }else{
        callback();
    }
  },
  checkGoog : (rule, value, callback) => {
    if (value.match(regexp.yzPwd)) {
      callback();
    } else {
      callback(new Error('请输入正确的谷歌验证码'));
    }
  }
}
export default validators;
