import { createReducer } from '../../common/util/ReducerUtil';
import { SEARCH_RESULTS, SEARCH_ERROR } from './searchConstants';

const initialState = {};

const onSearchResults = (state, payload) => {
  console.log('onSearchResults: ');
  console.log('state: ', state);
  console.log('payload: ', payload);
  return { ...state, query: payload.query, results: payload.results };
};

const onSearchError = state => {
  return { ...state, results: null };
};

export default createReducer(initialState, {
  [SEARCH_RESULTS]: onSearchResults,
  [SEARCH_ERROR]: onSearchError
});
