import TokenAPI from '../services/token-api';

export const MutationTypes = {
  LOGIN_IN: 'LOGIN_IN',
  LOGIN_OUT: 'LOGIN_OUT'
};

export default {
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
  }
};
