import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './AuthContantants';
import { HEADER_JSON } from '../../api/apiConstants';
import { closeModal } from '../modal/ModalActions';
import { toastr } from 'react-redux-toastr';
import setAuthToken from '../../common/util/setAuthToken';

// Load User
export const loadUser = () => {
  return async (dispatch, getState) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
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
export const registeredUser = user => async (dispatch, getState) => {
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

// Login User
export const login = creds => {
  return async (dispatch, getState) => {
    const config = HEADER_JSON;
    const body = JSON.stringify(creds);
    try {
      const res = await axios.post('/api/auth', body, config);
      // await setAuthToken(res.data.token);
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
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };
};

// Update Password
export const updatePassword = creds => async (dispatch, getState) => {
  try {
    // TODO: add call here
    await dispatch(reset('account'));
    toastr.success('Success', 'Your password has been updated');
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    });
  }
};
