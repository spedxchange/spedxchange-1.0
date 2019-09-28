import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

const mapState = state => ({
  auth: state.auth,
  activeItem: state.activeItem
});

const actions = {
  navItemClick,
  openModal,
  signOut
};

class MobileNav extends Component {
  handleItemClick = item => {
    this.props.navItemClick(item);
  };

  render() {
    const { auth, activeItem } = this.props;
    const authenticated = auth.authenticated && auth.currentUser;
    return (
      <Menu text vertical className='app-sidebar'>
        <Menu.Item link name='About Us' active={activeItem === 'About Us'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Resources' active={activeItem === 'Resources'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Scholarships' active={activeItem === 'Scholarships'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Eye On SPED' active={activeItem === 'Eye On SPED'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Contact Us' active={activeItem === 'Contact Us'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Questions' active={activeItem === 'Questions'} onClick={() => handleItemClick('About Us')} />
        <Menu.Item link name='Categories' active={activeItem === 'Categories'} onClick={() => handleItemClick('About Us')} className='indent' />
        <Menu.Item link name='Tags' active={activeItem === 'Tags'} onClick={() => handleItemClick('About Us')} className='indent' />
        <Menu.Item link name='People' active={activeItem === 'People'} onClick={() => handleItemClick('About Us')} className='indent' />
        <Menu.Item link name='Jobs' active={activeItem === 'Jobs'} onClick={() => handleItemClick('About Us')} />
        {authenticated && <Menu.Item link name='Jobs' active={activeItem === 'Jobs'} onClick={signOut} />}
      </Menu>
    );
  }
}

export default connect(
  mapState,
  actions
)(MobileNav);
