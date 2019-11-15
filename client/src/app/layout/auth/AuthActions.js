import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, TOGGLE_FORGOT_PASSWORD } from './AuthContantants';
import { HEADER_JSON } from '../../api/apiConstants';
import { closeModal } from '../modal/ModalActions';
import { toastr } from 'react-redux-toastr';
import setAuthToken from '../../common/util/setAuthToken';

// Load User
export const loadUser = () => {
  return async (dispatch, getState) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      dispatch({
        type: AUTH_ERROR
      });
      return;
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
};

// Register User
export const registeredUser = user => {
  return async (dispatch, getState) => {
    const config = HEADER_JSON;
    const body = JSON.stringify(user);
    try {
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      await dispatch(loadUser());
      dispatch(closeModal());
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL
      });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

// Login User
export const login = creds => {
  return async (dispatch, getState) => {
    const config = HEADER_JSON;
    const body = JSON.stringify(creds);
    try {
      const res = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      await dispatch(loadUser());
      dispatch(closeModal());
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL
      });
      throw new SubmissionError({
        _error: 'Login Failed'
      });
    }
  };
};

// Logout / Clear Profile
export const signOut = () => {
  return dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };
};

// Request Reset Password Email
export const requestResetInstructions = form => {
  return async dispatch => {
    try {
      console.log('requestResetInstructions: form: ', form);
      const config = HEADER_JSON;
      const body = JSON.stringify(form);
      const resp = await axios.post('/api/auth/request-reset', body, config);
      const msg = `Check your email inbox at for the password reset instructions.`;
      const err = `No account for ${form.email} was found.`;
      const confirmMessage = !resp.success ? err : msg;
      dispatch(closeModal());
      toastr.confirm(confirmMessage, {
        okText: 'Close',
        disableCancel: true
      });
    } catch (error) {
      throw new SubmissionError({
        _error: 'Request Failed'
      });
    }
  };
};

// Update Password
export const updatePassword = form => {
  return async dispatch => {
    try {
      // TODO: add call here
      await dispatch(reset('loginForm'));
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const toggleForgotPassword = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_FORGOT_PASSWORD });
  };
};
