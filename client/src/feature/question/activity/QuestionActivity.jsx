import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';

const QuestionActivity = () => {
  return (
    <Fragment>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
        <p>Recent activity</p>
      </Segment>
    </Fragment>
  );
};

export default QuestionActivity;
