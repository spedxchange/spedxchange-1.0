import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const GuestMenu = ({ signIn, register }) => {
  return (
    <Menu.Item position='right'>
      <Button basic inverted content='Sign Up' onClick={register} />
      <Button basic inverted content='Login' onClick={signIn} />
    </Menu.Item>
  );
};

export default GuestMenu;
