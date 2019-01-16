export default {
  noEmpty: (rule, value, callback) => {
    if (value === '') {
      callback(new Error(rule.str));
    }
    else {
      callback();
    }
  },
  positiveNum: (rule, value, callback) => {
    var reg = /^[0-9]\d*$/;
    let max = rule.max > -1 ? rule.max : 100;
    if(reg.test(value) && Number(value) < max) {
      callback();
    } else {
      callback(new Error(rule.str));
    }
  },
  num: (rule, value, callback) => {
    var reg = /^[0-9]\d*$/;
    if(reg.test(value)) {
      callback();
    } else {
      callback(new Error(rule.str));
    }
  }
}