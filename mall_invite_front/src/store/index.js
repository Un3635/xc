import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 登录弹窗的显示
const SHOW_LOGIN_PAGE = 'SHOW_LOGIN_PAGE';
const Safe_Center_To_login = 'Safe_Center_To_login';

 export default new Vuex.Store({
   state: {
     token: '',
     showLoginPage: false,
     accountData: [],
     inviteId:'',
     userNameStore: '',
     dialogVisible:false,
    //  coinAdress: [  
    //    {name: 'BTC地址', adress: '12343245t4rterfertg45', status: true},
    //    {name: 'ETCH地址', adress: '12343245t4rterfertg45', status: true},
    //    {name: 'DCR地址', adress: '', status: false}
    //  ],
    //  form: {
    //    name: '',
    //    pwd: '675657687yu8huu'
    //  }
   },
  mutations: {
    [SHOW_LOGIN_PAGE](state, TAG) {
      state.showLoginPage = TAG;
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
    }
  },
  actions: {},
  strict: true
 })