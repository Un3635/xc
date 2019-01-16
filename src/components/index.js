import Vue from 'vue';
import errTaost from './errToast';

export default {
  install() {
    Vue.use(errTaost);
  }
};

