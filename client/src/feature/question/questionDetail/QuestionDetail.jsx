import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadQuestionBySlug, loadQuestionById } from '../questionActions';

const mapState = state => ({
  questions: state.questions.questions,
  currentQuestion: state.questions.currentQuestion
});

const actions = {
  loadQuestionBySlug,
  loadQuestionById
};

export class QuestionDetail extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    if (params.uid && params.slug) {
      this.props.loadQuestionBySlug(params.uid, params.slug);
    }
    if (params.id) {
      this.props.loadQuestionById(params.id);
    }
  }

  render() {
    return <div>question detail</div>;
  }
}

export default connect(
  mapState,
  actions
)(QuestionDetail);
