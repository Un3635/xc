import Vue from "vue";
import Vuex from "vuex";
import cookie from "cookie";
import { CURRENCY_DETAIL_INIT_TYPE } from "~/store/mutation-types";
import { MARKET_TYPE } from "~/store/constants";
import { myAccount } from "./data";


Vue.use(Vuex);
const debug = true;
const store = () =>
  new Vuex.Store({
    state: {
      userinfo: null,
      token: "",
      initCurrencyDetailType: MARKET_TYPE, // 0--大盘 1--指数
      newmessage: 0,
      riskshow: true,
      livenotice1:false,
      livenotice2:false,
      fromwrite:"1",
    },
    getters: {},
    mutations: {
      SET_FROMWRITE(state,type){
        this.state.fromwrite=type;
      },
      [CURRENCY_DETAIL_INIT_TYPE](state, type) {
        state.initCurrencyDetailType = type;
      },
      USERINFO(state, payload) {
        state.userinfo = payload;
      },
      SET_USERINFO(state, payload) {
        state.userinfo = { ...state.userinfo, ...payload };
      },
      SET_TOKEN(state, payload) {
        document.cookie=`token=${payload};path=/`;
        state.token = payload;
      },
      SET_TOKEN_INSERVER(state, payload) {
        state.token = payload;
      },
      CLEAR_TOKEN(state) {
        state.token = "";
        document.cookie='token=0;path=/;max-age=-1'
        state.userinfo = null;
      },
      HAS_MESSAGE(state, payload) {
        state.newmessage = payload;
      },
      SHOW_SIGN_UP_RISK(state, payload) {
        state.riskshow = payload;
      },
      LIVENOTIVE_TOGGLE(state,payload){
        if(payload.type==1){
          state.livenotice1=payload.value;
          localStorage.setItem('livenotice1',payload.value)
        }else{
          state.livenotice2=payload.value;
          localStorage.setItem('livenotice2',payload.value)
        }
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req,res }) {
        var ck = cookie.parse(req.headers.cookie || "");
        if (ck && ck.token) {
          commit("SET_TOKEN_INSERVER", ck.token);
          return myAccount(ck.token).then(data => {
            if(data.data.code=='000000'){
              commit("SET_USERINFO", data.data.data);
            }else{
              res.setHeader('Set-Cookie', ['token=0;path=/;max-age=-1']);
              commit("SET_TOKEN_INSERVER", '');
            }
          });
        }
      }
    },
    strict: debug,
    plugins: []
  });
export default store;
