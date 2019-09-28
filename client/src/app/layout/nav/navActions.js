import { ACTIVATE_NAV_ITEM } from './navConstants';

export const navItemClick = item => {
  return dispatch => {
    dispatch({
      type: ACTIVATE_NAV_ITEM,
      payload: {
        item
      }
    });
  };
};
