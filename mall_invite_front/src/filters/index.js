import date  from './initdate';
import decimalPoint from './decimalPoint';
import phone from './initUserInfo';
const filtersData =   {
  install(Vue) {
    Vue.filter('date', date);
    Vue.filter('decimalPoint', decimalPoint);
    Vue.filter('phone', phone);
  }
};
export default filtersData
