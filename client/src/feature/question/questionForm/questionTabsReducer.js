import { createReducer } from '../../../app/common/util/ReducerUtil';
import { UPDATE_TAB, UPDATE_CATEGORY } from './questionTabsConstants';

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

export default createReducer(initialState, {
  [UPDATE_TAB]: updateTab,
  [UPDATE_CATEGORY]: updateCategory
});
