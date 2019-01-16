import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      downloadapp_show: true
    },
    mutations: {
      ["downloadapp_hide"](state) {
        state.downloadapp_show = false;
      }
    },
    strict: false,
    plugins: []
  });
export default store;
