import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Container } from 'semantic-ui-react';
import { createQuestion, updateQuestion, deleteQuestion, loadQuestions } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
import QuestionList from '../questionList/QuestionList';
import QuestionActivity from '../questionActivity/QuestionActivity';

const mapState = state => ({
  questions: state.questions,
  loading: state.async.loading
});

const actions = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  loadQuestions
};

class QuestionDashboard extends Component {
  componentDidMount() {
    this.props.loadQuestions();
  }

  handleDeleteQuestion = id => {
    this.props.deleteQuestion(id);
  };

  render() {
    const { questions, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='questions-dashboard flex-wrap md'>
        <div className='grow'>
          <QuestionList questions={questions} deleteQuestion={this.handleDeleteQuestion} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
