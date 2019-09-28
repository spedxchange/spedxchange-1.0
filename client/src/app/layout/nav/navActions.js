import { ACTIVATE_NAV_ITEM, TOGGLE_MOBILE_NAV } from './navConstants';

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

export const toggleMobileNav = isMobileNavOpen => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MOBILE_NAV,
      payload: {
        isMobileNavOpen
      }
    });
  };
};
