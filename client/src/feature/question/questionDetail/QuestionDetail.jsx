import React from 'react';
import { Grid } from 'semantic-ui-react';
import QuestionHeader from './QuestionHeader';
import QuestionInfo from './QuestionInfo';
import QuestionChat from './QuestionChat';
import QuestionSidebar from './QuestionSidebar';
import { connect } from 'react-redux';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;

  let question = {};

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    question
  };
};

const QuestionDetail = ({ question }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <QuestionHeader question={question} />
        <QuestionInfo question={question} />
        <QuestionChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <QuestionSidebar attendees={question.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(QuestionDetail);
