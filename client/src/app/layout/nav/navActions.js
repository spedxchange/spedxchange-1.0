import { UPDATE_ACTIVE_NAV_ITEM } from './navConstants';

export const navItemClick = item => {
  item = item || 'Questions';
  return {
    type: UPDATE_ACTIVE_NAV_ITEM,
    payload: {
      item
    }
  };
};
