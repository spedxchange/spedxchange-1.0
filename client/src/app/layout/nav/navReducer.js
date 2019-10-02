import { createReducer } from '../../common/util/ReducerUtil';
import { ACTIVATE_NAV_ITEM, TOGGLE_MOBILE_NAV, TOGGLE_SEARCH_BAR } from './navConstants';

const initialState = {
  isMobileNavOpen: false,
  isSearchBarOpen: false,
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

const toggleSearchBar = state => {
  return { ...state, isSearchBarOpen: !state.isSearchBarOpen };
};

export default createReducer(initialState, {
  [ACTIVATE_NAV_ITEM]: onNavItemClick,
  [TOGGLE_MOBILE_NAV]: toggleMobileNav,
  [TOGGLE_SEARCH_BAR]: toggleSearchBar
});
