import React from 'react';

const AccountStep1Type = props => {
  const { onSubmit } = props;
  return (
    <>
      <h1>step 1</h1>
      <div onClick={onSubmit}>next</div>
    </>
  );
};

export default AccountStep1Type;
