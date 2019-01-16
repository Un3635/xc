import Vue from "vue";
import * as moment from "moment";
import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);
Vue.filter("fromNow", function(value, locale = "zh-cn") {
  const time = moment(value);
  if (moment().diff(time) > 2 * 24 * 60 * 60 * 1000) {
    // 两天前的直接显示日期
    return time.format("MM-DD HH:mm");
  } else {
    return time.locale(locale).fromNow();
  }
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
