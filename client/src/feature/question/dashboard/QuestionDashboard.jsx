import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion, updateQuestion, loadQuestions } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
import QuestionList from '../list/QuestionList';

const mapState = state => ({
  questions: state.questions,
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
    const { questions, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='questions-dashboard flex-wrap md'>
        <div className='grow'>
          <QuestionList questions={questions} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
