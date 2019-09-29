import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

const AuthMenu = ({ signOut, profile }) => {
  return (
    <Menu.Item className='user-menu'>
      <Image avatar spaced='right' src={profile.photoURL || '/assets/img/user.png'} />
      <Dropdown pointing='top right' text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text='My Profile' icon='user' />
          <Dropdown.Item text='My Questions' icon='discussions' />
          <Dropdown.Item text='Create Question' icon='plus' />
          <Dropdown.Divider />
          <Dropdown.Item text='Sign Out' icon='power' onClick={signOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default AuthMenu;
