import React from 'react';

const UserDashboard = () => {
  return (
    <div className='flex-box md'>
      <div class='grow'>
        <div>about me</div>
        <div>progress</div>
        <div>social</div>
      </div>
      <div class='spacer'></div>
      <div class='grow'>
        <div>summary</div>
        <div>experience</div>
        <div>education</div>
        <div>certifications</div>
      </div>
      <div class='spacer'></div>
      <div class='grow'>
        <div>visible</div>
        <div>relocate</div>
        <div>resumes</div>
        <div>other</div>
      </div>
    </div>
  );
};

export default UserDashboard;
