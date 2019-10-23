import axios from 'axios';
import { HEADER_JSON } from '../../app/api/apiConstants';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION } from './questionConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const createQuestion = question => {
  console.log('createQuestion: question: ', question);
  const config = HEADER_JSON;
  const body = JSON.stringify(question);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await axios.post(`/api/questions`, body, config);
      dispatch({
        type: CREATE_QUESTION,
        payload: {
          question
        }
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Question has been created');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Error!', 'error');
    }
  };
};

export const updateQuestion = question => {
  console.log('action: updateQuestion: question: ', question);
  const config = HEADER_JSON;
  const body = JSON.stringify(question);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await axios.put(`/api/questions/${question._id}`, body, config);
      dispatch({
        type: UPDATE_QUESTION,
        payload: {
          question
        }
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Question has been updated');
    } catch (error) {
      dispatch(asyncActionError());
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
      const questions = await axios.get('/api/questions');
      console.log(questions.data);
      dispatch({ type: FETCH_QUESTIONS, payload: questions.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionBySlug = (uid, slug) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.get(`/api/questions/${uid}/${slug}`);
      dispatch({ type: FETCH_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionById = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.get(`/api/questions/${id}`);
      dispatch({ type: FETCH_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
