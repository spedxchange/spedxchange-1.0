import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { navItemClick, toggleMobileNav } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

const mapState = state => ({
  auth: state.auth,
  activeNavItem: state.nav.activeNavItem,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

const actions = {
  toggleMobileNav,
  navItemClick,
  openModal,
  signOut
};

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

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
    this.props.toggleMobileNav(this.props.isMobileNavOpen);
    if (!this.props.isMobileNavOpen) {
      this.scrollToMenuRef();
    }
  };

  render() {
    const { auth, activeNavItem, isMobileNavOpen } = this.props;
    const authenticated = auth.authenticated && auth.currentUser;
    const navItems = {
      news: {
        name: 'Eye On SPED',
        link: '/news'
      },
      resources: {
        name: 'Resources',
        link: '/resources'
      },
      scholarships: {
        name: 'Scholarships',
        link: '/scholarships'
      },
      about: {
        name: 'About Us',
        link: '/about'
      },
      contact: {
        name: 'Contact Us',
        link: '/contact'
      },
      questions: {
        name: 'SPEDxchange',
        link: '/questions'
      },
      categories: {
        name: 'Categories',
        link: '/categories'
      },
      tags: {
        name: 'Tags',
        link: '/tags'
      },
      people: {
        name: 'People',
        link: '/people'
      },
      jobs: {
        name: 'Jobs',
        link: '/jobs'
      }
    };
    return (
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
    );
  }
}

export default connect(
  mapState,
  actions
)(MobileNav);
