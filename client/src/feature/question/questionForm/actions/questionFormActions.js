import { UPDATE_TAB, UPDATE_CATEGORY } from './questionFormConstants';

export const handleTabChange = tab => {
  return dispatch => {
    dispatch({
      type: UPDATE_TAB,
      payload: tab
    });
  };
};

export const handleCategorySelect = id => {
  return dispatch => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: id
    });
  };
};
