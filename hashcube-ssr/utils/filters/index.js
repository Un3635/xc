import date from './date-filter';
import currency from './currency';
import cryptocurrency from './cryptocurrency';
import duration from './duration-filter';
import trusteeship from './trusteeship-status-filter';
import machine from './mechine-status-filter';
import balanceTypeFilter from './balance-type-filter';
import phone from './phone-filter';
import accountBalanceType from './account-balance-type';
import hashOrderStatus from './hash-order-status-filter';
import truncate from './truncate';


const VueFilters = {
  install(Vue) {
    Vue.filter('currency', currency);
    Vue.filter('date', date);
    Vue.filter('trusteeship', trusteeship);
    Vue.filter('machine', machine);
    Vue.filter('duration', duration);
    Vue.filter('cryptocurrency', cryptocurrency);
    Vue.filter('balanceType', balanceTypeFilter);
    Vue.filter('phone', phone);
    Vue.filter('accountBalanceType', accountBalanceType);
    Vue.filter('hashOrderStatus', hashOrderStatus);
    Vue.filter('truncate', truncate);
  }
};

export default VueFilters;
