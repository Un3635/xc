import Vue from 'vue';
import date  from '../filters/initdate';
import decimalPoint from '../filters/decimalPoint';
import phone from '../filters/initUserInfo';

Vue.filter('date', date);
Vue.filter('decimalPoint', decimalPoint);
Vue.filter('phone', phone);

