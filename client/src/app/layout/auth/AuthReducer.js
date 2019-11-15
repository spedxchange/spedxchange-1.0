import { createReducer } from '../../common/util/ReducerUtil';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, TOGGLE_FORGOT_PASSWORD } from './AuthContantants';

const initialState = {
  token: localStorage.getItem('token'),
  authenticated: false,
  loading: true,
  isPasswordForgot: false,
  isPasswordSent: false,
  currentUser: {}
};

const loadUser = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    loading: false,
    isPasswordForgot: false,
    isPasswordSent: false,
    currentUser: payload
  };
};

const loginSuccess = (state, payload) => {
  localStorage.setItem('token', payload.token);
  return {
    ...state,
    ...payload,
    authenticated: true,
    loading: false,
    isPasswordForgot: false,
    isPasswordSent: false
  };
};

const logoutUser = state => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isPasswordForgot: false,
    isPasswordSent: false,
    authenticated: false,
    loading: false,
    currentUser: {}
  };
};

const toggleForgotPassword = state => {
  return {
    ...state,
    isPasswordForgot: !state.isPasswordForgot
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
  [ACCOUNT_DELETED]: logoutUser,
  [TOGGLE_FORGOT_PASSWORD]: toggleForgotPassword
});
