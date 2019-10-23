import { createReducer } from '../../app/common/util/ReducerUtil';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION } from './questionConstants';

const initialState = {
  questions: [],
  currentQuestion: null
};

const createQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload
  };
};

const updateQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload
  };
};

const deleteQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload
  };
};

const fetchQuestions = (state, payload) => {
  return {
    ...state,
    questionCount: payload.questionCount,
    questions: payload.questions
  };
};

const fetchQuestion = (state, payload) => {
  console.log('fetchQuestion: ');
  return {
    ...state,
    currentQuestion: payload
  };
};

export default createReducer(initialState, {
  [CREATE_QUESTION]: createQuestion,
  [UPDATE_QUESTION]: updateQuestion,
  [DELETE_QUESTION]: deleteQuestion,
  [FETCH_QUESTIONS]: fetchQuestions,
  [FETCH_QUESTION]: fetchQuestion
});
