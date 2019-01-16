import TokenAPI from '../services/token-api';

export const MutationTypes = {
  LOGIN_IN: 'LOGIN_IN',
  LOGIN_OUT: 'LOGIN_OUT',
  SET_USER_INFO: 'SET_USER_INFO',
  UPDATE_CALE_DETAIL: 'UPDATE_CALE_DETAIL',
  UPDATE_PLATFORM_INFO: 'UPDATE_PLATFORM_INFO'
};

export default {
  [MutationTypes.UPDATE_CALE_DETAIL](state, payload) {
    state.calcforce = payload;
  },
  [MutationTypes.LOGIN_IN](state, token) {
    state.login = true;
    state.token = token;
    TokenAPI.save(token);
  },
  [MutationTypes.LOGIN_OUT](state, payload) {
    // payload 是否为正常退出
    state.login = false;
    state.token = '';
    TokenAPI.remove();
  },
  [MutationTypes.SET_USER_INFO](state, info) {
    state.userInfo = Object.assign(state.userInfo, info);
  },
  [MutationTypes.UPDATE_PLATFORM_INFO](state, payload) {
    state.isOtherPlatform = payload;
  }
};
