import { createReducer } from '../../common/util/ReducerUtil';
import { ACTIVATE_NAV_ITEM, TOGGLE_MOBILE_NAV } from './navConstants';

const initialState = {
  isMobileNavOpen: false,
  activeNavItem: {
    name: 'SPEDxchange',
    link: '/questions'
  }
};

const onNavItemClick = (state, payload) => {
  return { ...state, activeNavItem: payload };
};

const toggleMobileNav = state => {
  return { ...state, isMobileNavOpen: !state.isMobileNavOpen };
};

export default createReducer(initialState, {
  [ACTIVATE_NAV_ITEM]: onNavItemClick,
  [TOGGLE_MOBILE_NAV]: toggleMobileNav
});
