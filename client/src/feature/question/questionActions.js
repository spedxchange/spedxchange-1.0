import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS } from './questionConstants';
import { fetchQuestions } from '../../app/api/questions';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const createQuestion = question => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_QUESTION,
        payload: {
          question
        }
      });
      toastr.success('Success!', 'Question has been created');
    } catch (error) {
      toastr.error('Error!', 'error');
    }
  };
};

export const updateQuestion = question => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_QUESTION,
        payload: {
          question
        }
      });
      toastr.success('Success!', 'Question has been updated');
    } catch (error) {
      toastr.error('Error!', 'error');
    }
  };
};

export const deleteQuestion = questionId => {
  return {
    type: DELETE_QUESTION,
    payload: {
      questionId
    }
  };
};

export const loadQuestions = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const questions = await fetchQuestions();
      dispatch({ type: FETCH_QUESTIONS, payload: { questions } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
