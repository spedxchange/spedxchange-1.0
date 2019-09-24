import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import QuestionList from '../questionList/QuestionList';
import { connect } from 'react-redux';
import { createQuestion, updateQuestion, deleteQuestion, loadQuestions } from '../questionActions';
import PageLoader from '../../../app/layout/PageLoader';
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
      <Grid className='questions-dashboard'>
        <Grid.Column mobile={16} tablet={10} computer={12}>
          <QuestionList questions={questions} deleteQuestion={this.handleDeleteQuestion} />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={6} computer={4}>
          <QuestionActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDashboard);
