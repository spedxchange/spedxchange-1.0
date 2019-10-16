import { createReducer } from '../../util/ReducerUtil';
import { FETCH_QUESTION_CATAGORIES, FETCH_ARTICLE_CATAGORIES } from './categoryConstants';

const initialState = {
  questionCategories: [],
  articleCategories: []
};

const fetchQuestionCategories = (state, payload) => {
  return { ...state, questionCategories: payload };
};

const fetchArticleCategories = (state, payload) => {
  return { ...state, articleCategories: payload };
};

export default createReducer(initialState, {
  [FETCH_QUESTION_CATAGORIES]: fetchQuestionCategories,
  [FETCH_ARTICLE_CATAGORIES]: fetchArticleCategories
});
