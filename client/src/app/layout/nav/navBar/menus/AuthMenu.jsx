import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AuthMenu = ({ signOut, profile }) => {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={profile.photoURL || '/assets/img/user.png'} />
      <Dropdown pointing='top right' text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text='Create Question' icon='plus' />
          <Dropdown.Item text='My Questions' icon='calendar' />
          <Dropdown.Item text='My Network' icon='users' />
          <Dropdown.Item text='My Profile' icon='user' />
          <Dropdown.Item as={Link} to='/settings' text='Settings' icon='settings' />
          <Dropdown.Item text='Sign Out' icon='power' onClick={signOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default AuthMenu;
