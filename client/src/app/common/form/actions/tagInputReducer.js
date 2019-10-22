import { createReducer } from '../../../common/util/ReducerUtil';
import { UPDATE_TAG_NAMES } from './tagInputConstants';

const initialState = {
  tagNames: []
};

const updateTagNames = (state, payload) => {
  return {
    ...state,
    tagNames: payload
  };
};

export default createReducer(initialState, {
  [UPDATE_TAG_NAMES]: updateTagNames
});
