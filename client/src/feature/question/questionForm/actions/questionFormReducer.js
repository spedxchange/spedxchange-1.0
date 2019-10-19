import { createReducer } from '../../../../app/common/util/ReducerUtil';
import { UPDATE_TAB, UPDATE_CATEGORY, UPDATE_TAGS, UPDATE_EDITOR } from './questionFormConstants';

const initialState = {
  tags: null,
  activeQuestionTab: 0,
  categoryId: null,
  editorValue: ''
};

const updateTab = (state, payload) => {
  return {
    ...state,
    activeQuestionTab: payload
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

const updateEditor = (state, payload) => {
  // console.log('updateEditor: state: ', state);
  // console.log('updateEditor: payload: ', payload);
  return {
    ...state,
    editorValue: payload
  };
};

export default createReducer(initialState, {
  [UPDATE_TAB]: updateTab,
  [UPDATE_CATEGORY]: updateCategory,
  [UPDATE_TAGS]: updateTags,
  [UPDATE_EDITOR]: updateEditor
});
