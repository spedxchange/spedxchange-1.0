import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const QuestionStats = props => {
  console.log('QuestionStats: props: ', props);
  const { likeCount, answers, viewCount } = props.question;
  const answerCount = answers ? answers.length : 0;
  return (
    <>
      {props.question && (
        <div class='question-statistics'>
          <div class='stacked'>
            <div class='value'>{likeCount}</div>
            <div class='label'>votes</div>
          </div>
          <div class='stacked'>
            <div class='value'>{answerCount}</div>
            <div class='label'>answers</div>
          </div>
          <div class='stacked'>
            <div class='value'>{viewCount}</div>
            <div class='label'>views</div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(
  mapState,
  actions
)(QuestionStats);
