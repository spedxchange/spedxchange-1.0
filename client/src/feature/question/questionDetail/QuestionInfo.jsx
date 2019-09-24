import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import QuestionDetailMap from './QuestionDetailMap';

const QuestionInfo = ({ question }) => {
  const [isMapOpen, showMapToggle] = useState(false);
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{question.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {question.date && format(question.date.toDate(), 'EEEE do LLL')} at {question.date && format(question.date.toDate(), 'h:mm a')}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{question.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button onClick={() => showMapToggle(!isMapOpen)} color='teal' size='tiny' content={isMapOpen ? 'Hide Map' : 'Show Map'} />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && <QuestionDetailMap lat={question.venueLatLng.lat} lng={question.venueLatLng.lng} />}
    </Segment.Group>
  );
};

export default QuestionInfo;
