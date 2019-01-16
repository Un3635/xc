import Vue from 'vue';
import date from '../filters/date-filter';
import currency from '../filters/currency';
import cryptocurrency from '../filters/cryptocurrency';
import truncate from '../filters/truncate';
import duration from '../filters/duration-filter';
import machine from '../filters/machine';
import phone from '../filters/phone';
import hashOrderStatus from '../filters/hash-order-status-filter';

// date filter
Vue.filter('date', date);
Vue.filter('currency', currency);
Vue.filter('cryptocurrency', cryptocurrency);
Vue.filter('truncate', truncate);
Vue.filter('duration', duration);
Vue.filter('machine', machine);
Vue.filter('phone', phone);
Vue.filter('hashOrderStatus', hashOrderStatus);
