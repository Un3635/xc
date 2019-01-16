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
    // 用来记录当前导航栏与查看更多的对应关系
    currentNav: 0,
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
    },
//  TODO: /api/trust/currencyType  参数 token 接口获取，暂时写死
    currencyIds: {
      'BTC': 1,
      'ETH': 2,
      'DASH': 3,
      'SC': 4,
      'DCR': 5,
      'ACC': 6
    }
  },
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger({filter})] : []
});
