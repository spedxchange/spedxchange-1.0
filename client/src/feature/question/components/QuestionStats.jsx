import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {
    question: state.questions.currentQuestion
  };
};

const QuestionStats = props => {
  const { voteCount, answerCount, viewCount } = props.question;
  return (
    <div class='question-statistics'>
      <div class='stacked'>
        <div class='value'>{voteCount}</div>
        <div class='label'>votes</div>
      </div>
      <div class='stacked'>
        <div class='value'>{answerCount}</div>
        <div class='label'>answers</div>
      </div>
      <div class='inline'>
        <div class='value'>{viewCount}</div>
        <div class='label'>views</div>
      </div>
    </div>
  );
};

export default connect(mapState)(QuestionStats);
