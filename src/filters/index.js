/**
 *  时间的过滤， 5分钟内显示刚刚，只显示今天，明天， 和具体日期
 */
import format from "date-fns/format";

const range= 5 * 60 * 1000; // 分钟

const filters = {
  install(Vue) {
    Vue.filter("phone", (v) => {
      return v.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2');
    })
    Vue.filter("time", (v) => {
      return format(v, 'YYYY-MM-DD HH:mm:ss');
    });
    Vue.filter("gift", (v) => {
      // console.log(v);
      return format(v, 'HH:mm:ss');
    });
    Vue.filter("moment", (v, formatting) => {
      const curdate = new Date();
      const __cd = curdate.valueOf(); // 此刻的时间
      // 刚刚
      // if(__cd - range <= v ) {
      //   return '刚刚';
      // }
      // 今天
     
      var year = curdate.getFullYear();
      var month = curdate.getMonth() + 1;
      var day = curdate.getDate();

      var  __td = new Date(`${year}-${month}-${day}`).valueOf(); // 今天凌晨的时间
      // var days = 3;
      // var results = [
      //   `今天${format(v, 'HH:mm')}`,
      //   `昨天${format(v, ' HH:mm')}`,
      //   `前天${format(v, ' HH:mm')}`
      // ]
      // var fn = function(dayIdx) {
      //   var __td__ = __td - dayIdx * 24 * 60 * 60 * 1000;
      //   if(__td__ <= v) return results[dayIdx];
      //   else {
      //     if(dayIdx++ >= 3) {

      //     } else fn(dayIdx++);
         
      //   }
      // }
      // return fn(0);
      if( __td <= v){
        return `今天${format(v, 'HH:mm')}`;
      }
      var __yd = __td - 24 * 60 * 60 * 1000; // 昨天凌晨的时间
      if(__yd <= v) {
        return `昨天${format(v, ' HH:mm')}`;
      }
      var __yyd = __yd - 24 * 60 * 60 * 1000; // 前天凌晨的时间
      if( __yyd <= v) {
        return `前天${format(v, ' HH:mm')}`;
      }
      var  __ty = new Date(`${year}-01-01`).valueOf(); // 今年 1月1号凌晨的时间
      if( v < __ty) {
        return format(v, 'YYYY-MM-DD HH:mm:ss');
      }
      return format(v, 'MM-DD HH:mm');
    });
  }
};
export default filters;
