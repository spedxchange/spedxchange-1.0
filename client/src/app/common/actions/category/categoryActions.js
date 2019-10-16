import axios from 'axios';
import { FETCH_QUESTION_CATAGORIES, FETCH_ARTICLE_CATAGORIES } from './categoryConstants';
import { asyncActionFinish, asyncActionError } from '../../async/asyncActions';

export const loadQuestionCategories = () => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'question' });
      const categories = await axios.get('/api/category');
      dispatch({ type: FETCH_QUESTION_CATAGORIES, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadArticleCategories = () => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'article' });
      const categories = await axios.get('/api/category/article');
      dispatch({ type: FETCH_ARTICLE_CATAGORIES, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
