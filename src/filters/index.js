import date from './date-filter';
import phone from './phone-filter';
import currency from './currency';
import cryptocurrency from './cryptocurrency';
import duration from './duration-filter';

const VueFilters = {
  install(Vue) {
    Vue.filter('currency', currency);
    Vue.filter('date', date);
    Vue.filter('phone', phone);
    Vue.filter('cryptocurrency', cryptocurrency);
    Vue.filter('duration', duration);
  }
};
export default VueFilters;
