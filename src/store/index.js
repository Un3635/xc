import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabsChangeNames: ''
  },
  mutations: {
    tabsChangeNames(state, str) {
      state.tabsChangeNames = str;
    }
  }
})

export default store
