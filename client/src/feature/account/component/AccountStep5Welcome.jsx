import React from 'react';

const AccountStep5Welcome = props => {
  const { onSubmit, prevStep } = props;
  return (
    <>
      <h1>step 5</h1>
      <div onClick={prevStep}>prev</div>
      <div onClick={() => onSubmit('my values')}>next</div>
    </>
  );
};

export default AccountStep5Welcome;
