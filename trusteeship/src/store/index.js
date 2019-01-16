import Vue from 'vue';
import Vuex from 'vuex';
import {
  LOGIN_IN, LOGIN_OUT, UPDATE_PRE_ORDER, SET_USER_INFO, UPDATE_ADDRESS_EDIT_ITEM, UPDATE_PRE_ORDER_GOODS
} from './mutation-types';
import AppConfig from '../config';
import createLogger from '../../node_modules/vuex/dist/logger';
import TokenAPI from '../services/token-api';
import UserAPI from '../services/user-api';
import {UPDATE_USER_INFO} from './action-types';
import {getStore, setStore} from '../plugins/utils';

Vue.use(Vuex);

const PRE_ORDER_KEY = 'pre_order_goods';

export default new Vuex.Store({
  state: {
    login: false,
    token: '',
    preOrderGoods: JSON.parse(getStore(PRE_ORDER_KEY) || '[]'), // 待下单商品
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
      score: 0,
      userName: null
    },
    addressEdit: null, // 编辑地址
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
  mutations: {
    [LOGIN_OUT](state, payload) {
      // payload 是否为正常退出
      state.login = false;
      state.token = '';
      TokenAPI.remove();
    },
    [LOGIN_IN](state, token) {
      state.login = true;
      state.token = token;
      TokenAPI.save(token);
    },
    [UPDATE_PRE_ORDER](state, items) {
      state.preOrderGoods = items;
      setStore(PRE_ORDER_KEY, items);
    },
    [SET_USER_INFO](state, info) {
      state.userInfo = Object.assign(state.userInfo, info);
    },
    [UPDATE_ADDRESS_EDIT_ITEM](state, payload) {
      state.addressEdit = payload;
    }
    // ,
    // [UPDATE_PRE_ORDER_GOODS](state, payload) {
    //   let goods = [];
    //   state.preOrderGoods.forEach(item => {
    //     if (item.id === payload.id) {
    //       item = Object.assign({}, item, payload);
    //     }
    //     goods.push(item);
    //   });
    //   state.preOrderGoods = goods;
    //   setStore(PRE_ORDER_PREFIX + state.token, goods);
    // }
  },
  actions: {
    [UPDATE_USER_INFO]({commit}) {
      return UserAPI.userInfo()
        .then(user => {
          commit(SET_USER_INFO, user);
        })
        .catch(() => {
          commit(SET_USER_INFO, null);
        });
    }
  },
  strict: AppConfig.debug,
  plugins: AppConfig.debug ? [createLogger()] : []
});
