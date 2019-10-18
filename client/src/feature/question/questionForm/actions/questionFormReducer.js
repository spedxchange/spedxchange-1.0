import { createReducer } from '../../../../app/common/util/ReducerUtil';
import { UPDATE_TAB, UPDATE_CATEGORY, UPDATE_TAGS } from './questionFormConstants';

const initialState = {
  tags: null,
  activeTabIndex: 0,
  categoryId: null
};

const updateTab = (state, payload) => {
  return {
    ...state,
    activeTabIndex: payload
  };
};

const updateCategory = (state, payload) => {
  return {
    ...state,
    categoryId: payload
  };
};

const updateTags = (state, payload) => {
  return {
    ...state,
    tags: payload
  };
};

export default createReducer(initialState, {
  [UPDATE_TAB]: updateTab,
  [UPDATE_CATEGORY]: updateCategory,
  [UPDATE_TAGS]: updateTags
});
