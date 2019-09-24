import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const questionImageStyle = {
  filter: 'brightness(30%)'
};

const questionImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const QuestionHeader = ({ question }) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/img/category/${question.category}.jpg`} fluid style={questionImageStyle} />

        <Segment basic style={questionImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size='huge' content={question.title} style={{ color: 'white' }} />
                <p>
                  {question.date && format(question.date.toDate(), 'EEEE do LLL')} at {question.date && format(question.date.toDate(), 'h:mm a')}
                </p>
                <p>
                  Hosted by <strong>{question.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>JOIN THIS QUESTION</Button>
        <Button as={Link} to={`/manage/${question.id}`} color='orange' floated='right'>
          Manage Question
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default QuestionHeader;
