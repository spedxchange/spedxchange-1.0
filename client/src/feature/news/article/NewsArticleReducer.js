import { createReducer } from '../../../app/common/util/ReducerUtil';
import { FETCH_NEWS_ARTICLE } from './NewsArticleConstants';

const initialState = {};

const fetchNewsArticle = (state, payload) => {
  return payload;
};

export default createReducer(initialState, {
  [FETCH_NEWS_ARTICLE]: fetchNewsArticle
});
