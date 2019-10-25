import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuestion, updateQuestion, loadQuestionsByPage } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
import QuestionList from '../list/QuestionList';

const mapState = state => ({
  page: state.questions.page,
  pages: state.questions.pages,
  questions: state.questions.questions,
  questionCount: state.questions.questionCount,
  loading: state.async.loading
});

const actions = {
  createQuestion,
  updateQuestion,
  loadQuestionsByPage
};

class QuestionDashboard extends Component {
  componentDidMount() {
    this.props.loadQuestionsByPage(this.props.page || 1);
  }

  render() {
    const { loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='questions-dashboard flex-box md'>
        <div className='grow'>
          <QuestionList loadPage={this.props.loadQuestionsByPage} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
