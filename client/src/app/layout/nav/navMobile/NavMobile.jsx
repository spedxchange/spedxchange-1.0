import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ScrollTo, ScrollArea } from 'react-scroll-to';
import { toggleMobileNav, navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { NAV_ITEMS } from '../navConstants';

const mapState = state => ({
  auth: state.auth,
  activeNavItem: state.nav.activeNavItem,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

const actions = {
  toggleMobileNav,
  navItemClick,
  openModal
};

class NavMobile extends Component {
  toggleNav = () => {
    this.props.toggleMobileNav();
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

  render() {
    const navItems = NAV_ITEMS;
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser;

    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <ScrollArea id='navMobile' className={this.props.isMobileNavOpen ? 'nav-mobile open' : 'nav-mobile'}>
            <ul>
              <li>
                <span onClick={() => this.handleItemClick(navItems.news)}>Eye On SPED</span>
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
          </ScrollArea>
        )}
      </ScrollTo>
    );
  }
}

export default connect(
  mapState,
  actions
)(NavMobile);
