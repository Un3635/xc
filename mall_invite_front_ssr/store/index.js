import Vue from 'vue';
import Vuex from 'vuex';
// import {getStore} from '../plugins/utils';
import {UPDATE_BREADCRUMB} from './mutation-types';
Vue.use(Vuex);

// 登录弹窗的显示
const SHOW_LOGIN_PAGE = 'SHOW_LOGIN_PAGE';
let TIMER = null;
let COUNT = 0;
const store = () => new Vuex.Store({
  state: {
    token: '',
    showLoginPage: false,
    safeCenterTologin: false,
    accountData: [],
    inviteId:'',
    userNameStore: '',
    dialogVisible:false,
    breadcrumb: null,
    bindAddrTime: 60
  },
  mutations: {
    [SHOW_LOGIN_PAGE](state, TAG) {
      state.showLoginPage = TAG;
    },
    [UPDATE_BREADCRUMB](state,playload) {
      state.breadcrumb = playload;
    },
    safeCenterTologin(state, Tag) {
      state.safeCenterTologin = Tag;
    },
    userNameStore(state, name) {
      state.userNameStore = name;
    },
    changeInviteId(state,params){
      state.inviteId=params;
    },
    walletDialogVisible(state,params){
      state.dialogVisible=params;
    },
    bindAddrTime(state, count) {
      if(count) {
        state.bindAddrTime = count;
        return;
      }
      state.bindAddrTime -= 1;
    }
  },
  actions: {
    bindAddrTime(store) {
      clearInterval(TIMER);
      TIMER = setInterval(() => {
        if(COUNT === 60) {
          clearInterval(TIMER);
          COUNT = 1;
        } else {
          store.commit('bindAddrTime');
          COUNT ++ ;
        }
      }, 1000);
      // store.commit('bindAddrTime');
    }
  },
  strict: true
});
export default store;
