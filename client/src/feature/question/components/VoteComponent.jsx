import React from 'react';
import { Icon } from 'semantic-ui-react';

const VoteComponent = ({ item, like, unlike }) => {
  return (
    <div className='vote-component'>
      <Icon link size='big' title='This Question is Clear and Usefull' name='caret up' onClick={() => like(item._id)} />
      <div>{!item.likeCount ? '0' : item.likeCount}</div>
      <Icon link size='big' title='This Question is Unclear or Not Useful' name='caret down' onClick={() => unlike(item._id)} />
    </div>
  );
};

export default VoteComponent;
