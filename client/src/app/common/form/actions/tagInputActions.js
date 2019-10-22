import { UPDATE_TAG_NAMES } from '../actions/tagInputConstants';

export const handleUpdateTagNames = tagNames => {
  console.log('handleSelectTags: tagNames: ', tagNames);
  return dispatch => {
    dispatch({ type: UPDATE_TAG_NAMES, payload: tagNames });
  };
};
