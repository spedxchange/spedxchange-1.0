import { createReducer } from '../../common/util/ReducerUtil';
import { ACTIVATE_NAV_ITEM } from './navConstants';

const initialState = {
  activeNavItem: {
    name: 'Questions',
    link: '/questions'
  }
};

const onNavItemClick = (state, payload) => {
  return { ...state, activeNavItem: payload };
};

export default createReducer(initialState, {
  [ACTIVATE_NAV_ITEM]: onNavItemClick
});
