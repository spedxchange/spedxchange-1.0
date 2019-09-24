import { createReducer } from '../../app/common/util/ReducerUtil';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS } from './questionConstants';

const initialState = [];

const createQuestion = (state, payload) => {
  return [...state, payload.question];
};

const updateQuestion = (state, payload) => {
  return [...state.filter(question => question.id !== payload.question.id), payload.question];
};

const deleteQuestion = (state, payload) => {
  return [...state.filter(question => question.id !== payload.questionId)];
};

const fetchQuestions = (state, payload) => {
  return payload.questions;
};

export default createReducer(initialState, {
  [CREATE_QUESTION]: createQuestion,
  [UPDATE_QUESTION]: updateQuestion,
  [DELETE_QUESTION]: deleteQuestion,
  [FETCH_QUESTIONS]: fetchQuestions
});
