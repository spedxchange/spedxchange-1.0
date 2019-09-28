import { createReducer } from '../../common/util/ReducerUtil';
import { UPDATE_ACTIVE_NAV_ITEM } from './navConstants';

const initialState = {
  activeNavItem: 'Questions'
};

const handleNavItemClick = (state, payload) => {
  return { ...state, activeNavItem: payload };
};

export default createReducer(initialState, {
  [UPDATE_ACTIVE_NAV_ITEM]: handleNavItemClick
});
