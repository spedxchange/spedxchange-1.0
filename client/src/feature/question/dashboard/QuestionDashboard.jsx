import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion, updateQuestion, loadQuestions } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
import QuestionList from '../list/QuestionList';

const mapState = state => ({
  questionCount: state.questions.questionCount,
  questions: state.questions.questions,
  loading: state.async.loading
});

const actions = {
  createQuestion,
  updateQuestion,
  loadQuestions
};

class QuestionDashboard extends Component {
  componentDidMount() {
    this.props.loadQuestions();
  }

  render() {
    const { questions, questionCount, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='questions-dashboard flex-box md'>
        <div className='grow'>
          <QuestionList questions={questions} questionCount={questionCount} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
