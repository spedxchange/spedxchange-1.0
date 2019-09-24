import { createReducer } from '../../common/util/ReducerUtil';
import { SIGNOUT_USER, USER_LOADED, AUTH_ERROR } from './AuthContantants';

const initialState = {
  authenticated: false,
  currentUser: null
};

const loadUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload
  };
};

const authError = state => {
  return {
    authenticated: false,
    currentUser: null
  };
};

const signoutUser = state => {
  return {
    authenticated: false,
    currentUser: null
  };
};

export default createReducer(initialState, {
  [SIGNOUT_USER]: signoutUser,
  [USER_LOADED]: loadUser,
  [AUTH_ERROR]: authError
});
