import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toggleMobileNav, toggleSearchBar, navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../../../feature/auth/AuthActions';

import GuestMenu from './menus/GuestMenu';
import AuthMenu from './menus/AuthMenu';
import logo from './spedxchange-brand.svg';

const mapState = state => ({
  auth: state.auth,
  activeNavItem: state.nav.activeNavItem,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

const actions = {
  toggleSearchBar,
  toggleMobileNav,
  navItemClick,
  openModal,
  signOut
};

class NavBar extends Component {
  handleLogin = () => {
    this.props.openModal('LoginModal');
  };

  handleSignUp = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.signOut();
  };

  toggleNav = () => {
    this.props.toggleMobileNav();
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser.displayName;
    return (
      <div className='app-header'>
        <div className='flex-box'>
          <Link className='brand' to='/'>
            <img src={logo} alt='SPEDxchange' />
          </Link>
          <div className='flex-box grow nav-content'>
            <button className='square' onClick={this.props.toggleSearchBar}>
              <Icon name='search' />
            </button>
            {authenticated ? <AuthMenu profile={auth.currentUser} signOut={this.handleSignOut} /> : <GuestMenu login={this.handleLogin} register={this.handleSignUp} />}
            <button className='square mobile' onClick={this.toggleNav}>
              <Icon name='bars' />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(NavBar));
