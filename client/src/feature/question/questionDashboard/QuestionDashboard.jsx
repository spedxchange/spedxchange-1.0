import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
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
      <Container className='questions-dashboard'>
        <Container className='flex-wrap responsive'>
          <div className='grow'>
            <Container>
              <QuestionList questions={questions} deleteQuestion={this.handleDeleteQuestion} />
            </Container>
          </div>
          <div className='activity'>
            <Container>
              <QuestionActivity />
            </Container>
          </div>
        </Container>
      </Container>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
