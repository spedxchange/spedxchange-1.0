import React, { Fragment } from 'react';

const GuestMenu = ({ login, register }) => {
  return (
    <Fragment>
      <button onClick={login}>Login</button>
      <button onClick={register}>Sign Up</button>
    </Fragment>
  );
};

export default GuestMenu;
