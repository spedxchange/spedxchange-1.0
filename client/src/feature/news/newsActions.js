import axios from 'axios';
import { FETCH_LATEST_NEWS, FETCH_CURRENT_ARTICLE } from './newsConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';

export const loadArticles = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const articles = await axios.get('/api/news');
      dispatch({ type: FETCH_LATEST_NEWS, payload: articles.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadArticle = (uid, slug) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const currentArticle = await axios.get(`/api/news/${uid}/${slug}`);
      console.log('currentArticle: ', currentArticle);
      dispatch({ type: FETCH_CURRENT_ARTICLE, payload: currentArticle.data[0] });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
