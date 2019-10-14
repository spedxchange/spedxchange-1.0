import { FETCH_LATEST_NEWS } from './newsConstants';
import { fetchLatestArticles } from '../../app/api/news';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/common/async/asyncActions';

export const loadArticles = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const articles = await fetchLatestArticles();
      dispatch({ type: FETCH_LATEST_NEWS, payload: { articles } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
