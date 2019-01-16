import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const filter = () => process.env.VUE_ENV === 'client';

export default new Vuex.Store({
  state: {
    token: '',
    login: false,
    // 是否是其他平台跳转过来 例如：挖链
    isOtherPlatform: false,
    userInfo: {
      address: '',
      googleKey: null,
      hasPassword: true,
      idCard: null,
      isBindBankCard: false,
      bankCardNo: null,
      bankMobile: null,
      bankName: null,
      mailboxAccount: '',
      moblie: '',
      userName: null,
      countryNum: '',
      calcforce: ''
    }
  },
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger({filter})] : []
});
