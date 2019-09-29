import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import GuestMenu from './menus/GuestMenu';
import AuthMenu from './menus/AuthMenu';
import { toggleMobileNav } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

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
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
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
      <Menu inverted fixed='top' className='app-header'>
        <Container>
          <Menu.Item as={NavLink} className='brand' exact to='/' header>
            <img src={logo} alt='SPEDxchange' className='ui' />
          </Menu.Item>
          {authenticated ? <AuthMenu profile={auth.currentUser} signOut={this.handleSignOut} /> : <GuestMenu signIn={this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);
