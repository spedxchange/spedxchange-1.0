import React, { Fragment } from 'react';

const GuestMenu = ({ login, register }) => {
  return (
    <Fragment>
      <button className='guest' onClick={login}>
        Login
      </button>
      <button className='guest' onClick={register}>
        Sign Up
      </button>
    </Fragment>
  );
};

export default GuestMenu;
