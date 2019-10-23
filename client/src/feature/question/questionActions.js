import axios from 'axios';
import { reset } from 'redux-form';
import { HEADER_JSON } from '../../app/api/apiConstants';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION, ANSWER_QUESTION } from './questionConstants';
import { QUESTION_SUBMITED } from './questionForm/actions/questionFormConstants';
import { CLEAR_TAGS } from '../../app/common/form/actions/tagInputConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const createQuestion = question => {
  // console.log('createQuestion: question: ', question);
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
      await dispatch(reset('questionForm'));
      dispatch({
        type: QUESTION_SUBMITED
      });
      dispatch({
        type: CLEAR_TAGS
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
  // console.log('action: updateQuestion: question: ', question);
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
      dispatch({
        type: QUESTION_SUBMITED
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
      // console.log(questions.data);
      dispatch({ type: FETCH_QUESTIONS, payload: questions.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionBySlug = (uid, slug) => {
  console.log('loadQuestionBySlug: ', uid, slug);
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

export const answerQuestion = (id, answer) => {
  console.log('answerQuestion: ', id);
  const config = HEADER_JSON;
  const body = JSON.stringify(answer);

  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.post(`/api/questions/answer/${id}`, body, config);
      dispatch({ type: ANSWER_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
