import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {
  LOGIN_IN,
  LOGIN_OUT,
  SET_USER_INFO,
  UPDATE_BREADCRUMB,
  UPDATE_ADDRESS_EDIT_ITEM,
  UPDATE_PRE_ORDER,
  UPDATE_CARTNUM, UPDATE_TRACKER_GOODS_ITEM
} from './mutation-types';
import {UPDATE_USER_INFO} from './action-types';
import UserAPI from '../services/user-api';
import TokenAPI from '../services/token-api';
import {isClient} from '../services/utils';
import {getStore, setStore} from '../services/utils';

const filter = () => isClient;

Vue.use(Vuex);
const debug = true;
const PRE_ORDER_KEY = 'pre_order_goods';
export const TRACKER_GOODS_ITEM_KEY = 'tracker_goods_item__';
const createStore = () => new Vuex.Store({
  state: {
    breadcrumb: null,
    token: '',
    preOrderGoods: null,
    cartNum: 0,
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
      mobile: '',
      score: 0,
      userName: null,
      holderName: ''
    }
  },
  getters: {
    isLogin: state => !!state.token
  },
  mutations: {
    [LOGIN_IN](state, token) {
      state.token = token;
      TokenAPI.save(token);
    },
    [LOGIN_OUT](state, payload) {
      // payload 是否为正常退出
      state.token = '';
      TokenAPI.remove();
    },
    [SET_USER_INFO](state, playload) {
      state.userInfo = playload;
    },
    [UPDATE_BREADCRUMB](state, playload) {
      state.breadcrumb = playload;
    },
    [UPDATE_PRE_ORDER](state, items) {
      state.preOrderGoods = items;
      setStore(PRE_ORDER_KEY, items);
    },
    [UPDATE_CARTNUM](state, num) {
      state.cartNum = num;
    },
    [UPDATE_TRACKER_GOODS_ITEM](state, payload) {
      state.trackerGoodsItem = payload.items;
      setStore(TRACKER_GOODS_ITEM_KEY + payload.id, payload.items);
    }
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
  strict: debug,
  plugins: debug ? [createLogger({filter})] : []
});

export default createStore;
