import React, { Component, Fragment } from 'react';
import QuestionListItem from './QuestionListItem';

class QuestionList extends Component {
  render() {
    const { questions, deleteQuestion } = this.props;
    return (
      <Fragment>
        <h1>Questions</h1>
        {questions && questions.map(question => <QuestionListItem key={question._id} question={question} deleteQuestion={deleteQuestion} />)}
      </Fragment>
    );
  }
}

export default QuestionList;
