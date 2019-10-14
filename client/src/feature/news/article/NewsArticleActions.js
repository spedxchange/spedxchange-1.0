import { FETCH_NEWS_ARTICLE } from './NewsArticleConstants';
import { fetchNewsArticle } from '../../../app/api/news';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../app/common/async/asyncActions';

export const loadArticle = (uid, slug) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const currentArticle = await fetchNewsArticle(uid, slug);
      dispatch({ type: FETCH_NEWS_ARTICLE, payload: currentArticle });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
