import React from 'react';
import { Segment, Container, Header, Icon, Button } from 'semantic-ui-react';

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
    </Segment>
  );
};

export default HomePage;
