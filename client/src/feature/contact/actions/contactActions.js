import axios from 'axios';
import { reset } from 'redux-form';
import { CONTACT_SUCCESS, CONTACT_FAIL, CONTACT_CLOSE } from './contactConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../app/common/async/asyncActions';
import { MODAL_CLOSE } from '../../../app/layout/modal/ModalConstants';
import { HEADER_JSON } from '../../../app/api/apiConstants';

export const submitContact = form => {
  return async (dispatch, getState) => {
    try {
      const config = HEADER_JSON;
      const body = JSON.stringify(form);
      dispatch(asyncActionStart());
      await axios.post('/api/contact', body, config);
      dispatch({ type: CONTACT_SUCCESS });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch({ type: CONTACT_FAIL });
      dispatch(asyncActionError());
    }
  };
};

export const closeContactModal = () => {
  return (dispatch, getState) => {
    dispatch(reset('contactForm'));
    dispatch({ type: CONTACT_CLOSE });
    dispatch({ type: MODAL_CLOSE });
  };
};
