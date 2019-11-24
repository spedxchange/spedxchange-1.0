import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from '../../app/common/async/asyncConstants';
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE, TOGGLE_FORGOT_PASSWORD, FETCH_SCHOLARSHIP_APPLICATION } from './AuthContantants';
import { HEADER_JSON } from '../../app/api/apiConstants';
import { closeModal } from '../../app/layout/modal/ModalActions';
import { toastr } from 'react-redux-toastr';
import setAuthToken from '../../app/common/util/setAuthToken';

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
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

// Login User
export const login = creds => {
  return async (dispatch, getState) => {
    try {
      const config = HEADER_JSON;
      const body = JSON.stringify(creds);
      const res = await axios.post('/api/auth/login', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      await dispatch(loadUser());
      dispatch(closeModal());
    } catch (error) {
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
      const config = HEADER_JSON;
      const body = JSON.stringify(form);
      dispatch({ type: ASYNC_ACTION_START, payload: 'request-password-reset' });
      const resp = await axios.post('/api/auth/request-reset', body, config);
      const msg = `Check your email inbox at for the password reset instructions.`;
      const err = `No account for ${form.email} was found.`;
      const confirmMessage = !resp.data || !resp.data.success ? err : msg;
      dispatch(closeModal());
      dispatch({ type: ASYNC_ACTION_FINISH });
      toastr.confirm(confirmMessage, {
        okText: 'Close',
        disableCancel: true
      });
      dispatch({ type: TOGGLE_FORGOT_PASSWORD });
      return null;
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
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
      const config = HEADER_JSON;
      const body = JSON.stringify(form);
      dispatch({ type: ASYNC_ACTION_START, payload: 'update-password' });
      await axios.post('/api/auth/reset', body, config);
      dispatch({ type: ASYNC_ACTION_FINISH });
      dispatch(closeModal());
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
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

export const submitScholarshipApplication = form => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'submit-scholarship' });
      const config = HEADER_JSON;
      const body = JSON.stringify(form);
      await axios.post('/api/auth/submit-scholarship', body, config);
      dispatch({ type: ASYNC_ACTION_FINISH });
      dispatch(closeModal());
      toastr.success('Success', 'Your Application has been submitted!');
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const fetchScholarshipApplication = scholarshipName => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'fetch-scholarship' });
      const config = HEADER_JSON;
      const body = JSON.stringify({ scholarshipName: scholarshipName || 'clinical' });
      const application = await axios.post('/api/auth/scholarship-application', body, config);
      dispatch({ type: ASYNC_ACTION_FINISH });
      if (application.data.essay) {
        dispatch({ type: FETCH_SCHOLARSHIP_APPLICATION, payload: application.data });
      }
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};
