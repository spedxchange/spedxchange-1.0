import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import { createQuestion, updateQuestion } from '../questionActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import QuestionHints from './QuestionHints';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  let question = {};

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    initialValues: question
  };
};

const actions = {
  loadQuestionCategories,
  createQuestion,
  updateQuestion
};

const validate = combineValidators({
  title: isRequired({ message: 'Title is required' }),
  category: isRequired({ message: 'Category is required' }),
  content: composeValidators(
    isRequired({ message: 'Question Description is required' }),
    hasLengthGreaterThan(12)({
      message: 'Description needd to be at least 12 characters'
    })
  )()
});

class QuestionForm extends Component {
  onSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateSeminar(values);
      this.props.history.push(`/seminars/${this.props.initialValues.id}`);
    } else {
      const newSeminar = {
        ...values
      };
      this.props.createSeminar(newSeminar);
      this.props.history.push(`/seminars/${newSeminar.id}`);
    }
  };
  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;
    return (
      <div className='flex-wrap sm'>
        <div className='grow question-form'>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
            <Field name='content' type='text' component={TextArea} rows={5} placeholder='Question Description' />
            <Field name='tags' type='text' component={TextInput} placeholder='Tags' />
            <Button type='submit' positive disabled={invalid || submitting || pristine}>
              Submit
            </Button>
            <Button type='button' onClick={initialValues.id ? () => history.push(`/question/${initialValues.id}`) : () => history.push('/question')}>
              Cancel
            </Button>
          </Form>
        </div>
        <QuestionHints />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'seminarForm', validate })(QuestionForm));
