import { FETCH_LATEST_NEWS, FETCH_CURRENT_ARTICLE } from './newsConstants';
import { fetchLatestArticles, fetchNewsArticle } from '../../app/api/news';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';

export const loadArticles = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const articles = await fetchLatestArticles();
      console.log('loadArticles:');
      console.log('articles: ', articles);
      console.log('---');
      dispatch({ type: FETCH_LATEST_NEWS, payload: articles });
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
      const currentArticle = await fetchNewsArticle(uid, slug);
      console.log('loadArticle:');
      console.log('currentArticle: ', currentArticle);
      console.log('---');
      dispatch({ type: FETCH_CURRENT_ARTICLE, payload: currentArticle });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
