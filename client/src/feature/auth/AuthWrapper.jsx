import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../../app/layout/modal/ModalActions';

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true,
  redirectPath: '/ask',
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated),
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'));
  }
});
