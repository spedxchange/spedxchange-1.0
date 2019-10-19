import axios from 'axios';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../../app/common/async/asyncActions';
import { UPDATE_TAB, UPDATE_CATEGORY, UPDATE_TAGS, UPDATE_EDITOR } from './questionFormConstants';

export const handleTabChange = tab => {
  return dispatch => {
    dispatch({
      type: UPDATE_TAB,
      payload: tab
    });
  };
};

export const handleSelectCategory = id => {
  return dispatch => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: id
    });
  };
};

export const handleSelectTags = tags => {
  console.log('handleSelectTags: tags: ', tags);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let returnTags = [];
      let tag;
      for (tag of tags) {
        const existingTag = await axios.get(`/api/name/question/${tag}`);
        returnTags.push({
          text: tag,
          _id: existingTag ? existingTag._id : 'new'
        });
      }
      console.log('handleSelectTags: returnTags', returnTags);
      dispatch({ type: UPDATE_TAGS, payload: returnTags });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const handleEditorUpdate = (content, editor) => {
  return dispatch => {
    dispatch({
      type: UPDATE_EDITOR,
      payload: content
    });
  };
};
