import { createReducer } from '../../common/util/ReducerUtil';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from './AuthContantants';

const initialState = {
  token: localStorage.getItem('token'),
  authenticated: false,
  loading: true,
  currentUser: null
};

const loadUser = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    loading: false,
    currentUser: payload
  };
};

const loginSuccess = (state, payload) => {
  localStorage.setItem('token', payload.token);
  return {
    ...state,
    ...payload,
    authenticated: true,
    loading: false
  };
};

const logoutUser = state => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    authenticated: false,
    loading: false,
    currentUser: null
  };
};

export default createReducer(initialState, {
  [USER_LOADED]: loadUser,
  [REGISTER_SUCCESS]: loginSuccess,
  [LOGIN_SUCCESS]: loginSuccess,
  [REGISTER_FAIL]: logoutUser,
  [AUTH_ERROR]: logoutUser,
  [LOGIN_FAIL]: logoutUser,
  [LOGOUT]: logoutUser,
  [ACCOUNT_DELETED]: logoutUser
});
