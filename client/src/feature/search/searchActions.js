import { SEARCH_RESULTS } from './searchConstants';
// import { SubmissionError } from 'redux-form';
// import { SEARCH_RESULTS, SEARCH_ERROR } from './searchConstants';
// import { HEADER_JSON } from '../../app/api/apiConstants';

// Search
export const doSearch = q => {
  return dispatch => {
    dispatch({
      type: SEARCH_RESULTS,
      payload: { query: q, results: { data: 'results' } }
    });
  };
  /*
  return async (dispatch, getState) => {
    console.log('search: query: ', q);
    const config = HEADER_JSON;
    const body = JSON.stringify(q);
    console.log(config, body);
    try {
      //const res = await axios.post('/api/search', body, config);
      const res = {
        data: 'results'
      };
      dispatch({
        type: SEARCH_RESULTS,
        payload: { query: q, results: res.data }
      });
    } catch (error) {
      dispatch({
        type: SEARCH_ERROR
      });
      throw new SubmissionError({
        _error: 'Search Failed'
      });
    }
  };
  */
};
