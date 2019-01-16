import {MutationTypes} from './mutations';
import UserAPI from '../services/user-api';
import TokenAPI from '../services/token-api';

export const ActionsTypes = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  LOGIN_OUT: 'LOGIN_OUT'
};

export default {
  [ActionsTypes.UPDATE_USER_INFO]({commit}) {
    return UserAPI.userInfo()
      .then(user => {
        commit(MutationTypes.SET_USER_INFO, user);
      })
      .catch(() => {
        commit(MutationTypes.SET_USER_INFO, null);
      });
  },
  [ActionsTypes.LOGIN_OUT]({commit}) {
    return TokenAPI.loginOut()
      .then(() => {
        commit(MutationTypes.LOGIN_OUT);
      })
      .catch(() => {
        commit(MutationTypes.LOGIN_OUT);
      });
  }
};
