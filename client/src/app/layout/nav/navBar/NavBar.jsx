import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toggleMobileNav, toggleSearchBar, navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

import { NAV_ITEMS } from '../navConstants';
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
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }
  handleLogin = () => {
    this.props.openModal('LoginModal');
  };

  handleSignUp = () => {
    // this.toggleNav();
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.signOut();
  };

  scrollToMenuRef = () => {
    window.scrollTo(0, this.menuRef.offsetTop);
  };

  handleItemClick = item => {
    this.toggleNav();
    switch (item) {
      case 'login':
        this.props.openModal('LoginModal');
        break;

      case 'signup':
        this.props.openModal('RegisterModal');
        break;

      default:
        this.props.navItemClick(item);
        break;
    }
  };

  toggleNav = () => {
    this.props.toggleMobileNav();
    this.scrollToMenuRef();
  };

  render() {
    const { auth, activeNavItem, isMobileNavOpen } = this.props;
    const authenticated = auth.authenticated && auth.currentUser;
    const navItems = NAV_ITEMS;
    return (
      <Fragment>
        <div className='app-header'>
          <div className='flex-wrap'>
            <Link className='brand' to='/'>
              <img src={logo} alt='SPEDxchange' />
            </Link>
            <div className='flex-wrap grow nav-content'>
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
        <ul ref={this.menuRef} className={isMobileNavOpen ? 'nav-mobile open' : 'nav-mobile'}>
          <li>
            <span className={activeNavItem.name === navItems.news.name ? 'active' : null} onClick={() => this.handleItemClick(navItems.news)}>
              Eye On SPED
            </span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.resources)}>Resources</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.scholarships)}>Scholarships</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.about)}>About Us</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.contact)}>Contact Us</span>
          </li>
          <li className='nav-spacer'></li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.questions)}>SPEDxchange</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.categories)}>Categories</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.tags)}>Tags</span>
          </li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.people)}>People</span>
          </li>
          <li className='nav-spacer'></li>
          <li>
            <span onClick={() => this.handleItemClick(navItems.jobs)}>Jobs</span>
          </li>
          {!authenticated && (
            <Fragment>
              <li className='nav-spacer'></li>
              <li>
                <span onClick={() => this.handleItemClick('login')}>Login</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick('signup')}>Sign Up</span>
              </li>
            </Fragment>
          )}
        </ul>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);
