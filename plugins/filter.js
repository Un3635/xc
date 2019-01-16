import Vue from "vue";
import * as moment from "moment";
Vue.filter("fromNow", function(value, locale = "zh-cn") {
  const time = moment(value);
  if (moment().diff(time) > 2 * 24 * 60 * 60 * 1000) {
    // 两天前的直接显示日期
    var fromNow = time.format("MM-DD HH:mm");
  } else {
    var fromNow = time.locale(locale).fromNow();
  }
  if (fromNow.indexOf("几秒内") >= 0 || fromNow.indexOf("几秒前") >= 0) {
    fromNow = "刚刚";
  }
  return fromNow;
});
Vue.filter("date", function(value, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(value).format(format);
});
Vue.filter("percent", (value, decimal = 0, isPercent) =>
  (Number(value) / (isPercent ? 1 : 100)).toFixed(decimal)
);
Vue.filter("readable", (value, digit = 2) => {
  const intVal = parseInt(value);
  let unit = "";
  let val = intVal;
  if (intVal >= 1e4) {
    unit = "万";
    val = intVal / 10000;
    return val.toFixed(digit) + unit;
  } else if (intVal >= 1e8) {
    unit = "亿";
    val = intVal / 1e8;
    return val.toFixed(digit) + unit;
  } else if (intVal >= 1e12) {
    unit = "万亿";
    val = intVal / 1e12;
    return val.toFixed(digit) + unit;
  } else {
    return val;
  }
});

Vue.filter("unitWan", (value, digit = 2) => {
  const intVal = parseInt(value);
  let unit = "";
  let val = intVal;
  if (intVal >= 1e4) {
    unit = "万";
    val = intVal / 10000;
  }
  return val.toFixed(digit) + unit;
});
Vue.filter("filesize", (value) => {
  if(value<=0){
    return "0.00";
  }
  
  return value.toFixed(2);
});
Vue.filter("filelefttime", (value) => {
    if(value>=0){
      return value
    }else{
      return 0;
    }
});
Vue.filter("filespeed", (value) => {
  if(value<=0){
    return "0.00";
  }
  
  return value.toFixed(2);
});

Vue.filter("filepercent", (value) => {
  if(value<=0){
    return "0.00";
  }
  if(value>=100){
    return "100"
  }
  
  return value.toFixed(2);
});
