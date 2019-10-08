import React from 'react';
import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react';

import HomeMasthead from './HomeMasthead';

const HomePage = ({ history }) => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          SPEDxchange
        </Header>
        <Button onClick={() => history.push('/questions')} size='huge' inverted>
          Get started
          <Icon name='right arrow' inverted />
        </Button>
      </Container>
      <HomeMasthead />
    </Segment>
  );
};

export default HomePage;
