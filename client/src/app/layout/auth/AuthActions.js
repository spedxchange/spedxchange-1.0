import axios from 'axios';
import { SubmissionError, reset } from 'redux-form';
import { USER_LOADED, AUTH_ERROR, SIGNOUT_USER } from './AuthContantants';
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

export const login = creds => {
  return async (dispatch, getState) => {
    const config = HEADER_JSON;
    const body = JSON.stringify(creds);
    try {
      const res = await axios.post('/api/auth', body, config);
      await setAuthToken(res.data.token);
      await dispatch(loadUser());
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Login Failed'
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    try {
      await setAuthToken();
      await dispatch(loadUser());
      dispatch({
        type: SIGNOUT_USER
      });
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Sign Out Failed'
      });
    }
  };
};

export const registeredUser = user => async (dispatch, getState) => {
  const config = HEADER_JSON;
  const body = JSON.stringify(user);
  try {
    const res = await axios.post('/api/users', body, config);
    await setAuthToken(res.data.token);
    await dispatch(loadUser());
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const updatePassword = creds => async (dispatch, getState) => {
  try {
    // add call here
    await dispatch(reset('account'));
    toastr.success('Success', 'Your password has been updated');
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};
