import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion, updateQuestion, loadQuestions } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
import QuestionList from '../list/QuestionList';

const mapState = state => ({
  questions: state.questions.questions,
  questionCount: state.questions.questionCount,
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
    const { loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='questions-dashboard flex-box md'>
        <div className='grow'>
          <QuestionList />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
