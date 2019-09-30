import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toggleMobileNav } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

import GuestMenu from './menus/GuestMenu';
import AuthMenu from './menus/AuthMenu';
import logo from './spedxchange-brand.svg';

const actions = {
  toggleMobileNav,
  openModal,
  signOut
};

const mapState = state => ({
  auth: state.auth,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

class NavBar extends Component {
  handleLogin = () => {
    this.props.openModal('LoginModal');
  };

  handleSignUp = () => {
    // this.toggleNav();
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.signOut();
    // this.props.history.push('/');
  };

  toggleNav = () => {
    this.props.toggleMobileNav(this.props.isMobileNavOpen);
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser;
    return (
      <div className='app-header'>
        <div className='flex-wrap'>
          <Link className='brand' to='/'>
            <img src={logo} alt='SPEDxchange' />
          </Link>
          <div className='flex-wrap grow nav-content'>
            <button className='search'>
              <Icon name='search' />
            </button>
            {authenticated ? <AuthMenu profile={auth.currentUser} signOut={this.handleSignOut} /> : <GuestMenu login={this.handleLogin} register={this.handleSignUp} />}
          </div>
          {authenticated && <div />}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);
