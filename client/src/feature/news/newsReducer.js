import { createReducer } from '../../app/common/util/ReducerUtil';
import { FETCH_LATEST_NEWS } from './newsConstants';

const initialState = {};

const fetchLatestArticles = (state, payload) => {
  return { ...state, articles: payload };
};

export default createReducer(initialState, {
  [FETCH_LATEST_NEWS]: fetchLatestArticles
});
