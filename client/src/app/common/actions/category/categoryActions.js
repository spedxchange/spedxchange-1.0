import axios from 'axios';
import { FETCH_QUESTION_CATAGORIES, FETCH_ARTICLE_CATAGORIES, FETCH_QUESTION_TAGS, FETCH_ARTICLE_TAGS } from './categoryConstants';
import { ASYNC_ACTION_START } from '../../async/asyncConstants';
import { asyncActionFinish, asyncActionError } from '../../async/asyncActions';

export const loadQuestionCategories = () => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'question-categories' });
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
      dispatch({ type: ASYNC_ACTION_START, payload: 'article-categories' });
      const categories = await axios.get('/api/category/article');
      dispatch({ type: FETCH_ARTICLE_CATAGORIES, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionTags = () => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'question-tags' });
      const categories = await axios.get('/api/tags');
      dispatch({ type: FETCH_QUESTION_TAGS, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadArticleTags = () => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'article-tags' });
      const categories = await axios.get('/api/tags/article');
      dispatch({ type: FETCH_ARTICLE_TAGS, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
