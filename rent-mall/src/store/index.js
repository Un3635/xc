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
    login: false
  },
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger({filter})] : []
});
