import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {
    question: state.questions.currentQuestion
  };
};

const actions = {
  
};

const QuestionLikes = (props) => {
  return (
    <div class='text-center pr-3'>
      <i aria-hidden='true' class='grey caret up big icon mr-0 pt-0'></i>
      <div>5</div>
      <i aria-hidden='true' class='grey caret down big icon mr-0'></i>
    </div>
  );
};

export default connect(mapState, actions)(QuestionLikes);
