import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {
  LOGIN_IN,
  LOGIN_OUT,
  SET_USER_INFO,
  UPDATE_ADDRESS_EDIT_ITEM,
  UPDATE_BREADCRUMB,
  UPDATE_PRE_ORDER,
  UPDATE_TRACKER_GOODS_ITEM,
  UPDATE_CARTNUMBER
} from './mutation-types';
import {UPDATE_USER_INFO} from './action-types';
import UserAPI from '../services/user-api';
import TokenAPI from '../services/token-api';
import {isClient} from '../utils';
import {setStore} from '../utils';
import AppConfig from '../config';

const filter = () => isClient;

Vue.use(Vuex);

export const PRE_ORDER_KEY = 'pre_order_goods';
export const TRACKER_GOODS_ITEM_KEY = 'tracker_goods_item';

const handleStore = () => {
  // mutationList = mutationList || [];
  return (store) => {
    // if (isClient && store._committing) {
    //   mutationList.forEach(item => {
    //     if (localStorage[item]) {
    //       store.commit(item, JSON.parse(localStorage[item]));
    //     }
    //   });
    // }
    if(localStorage.state){
      store.replaceState(JSON.parse(localStorage.state))
    }

    store.subscribe((mutation, state) => {
      // if (mutationList.indexOf(mutation.type) > -1) {
        setStore('state', state);
      // }
    });
  };
};

/**
 * Vuex.Store 工厂函数
 * @returns {Store}
 */
const createStore = () => new Vuex.Store({
  state: {
    breadcrumb: null,
    token: '',
    cartGoodsCount:0,
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
      userName: null
    },
    preOrderGoods: {},
    trackerGoodsItem: null,
    addressEdit: null
  },
  getters: {
    login: state => !!state.token
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
    [SET_USER_INFO](state, payload) {
      state.userInfo = payload;
    },
    [UPDATE_BREADCRUMB](state, payload) {
      state.breadcrumb = payload;
    },
    [UPDATE_CARTNUMBER](state,payload){
      state.cartGoodsCount=payload;
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
    },
    [UPDATE_TRACKER_GOODS_ITEM](state, goodsItem) {
      state.trackerGoodsItem = goodsItem;
      setStore(TRACKER_GOODS_ITEM_KEY, goodsItem);
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
  strict: AppConfig.debug,
  plugins: AppConfig.debug ? [createLogger({filter})] : []
});

export default createStore;
