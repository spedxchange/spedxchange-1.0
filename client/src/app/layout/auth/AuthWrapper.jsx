import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modal/ModalActions';

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true,
  redirectPath: '/ask',
  authenticatedSelector: state => state.auth.authenticated && state.auth.currentUser,
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'));
  }
});
