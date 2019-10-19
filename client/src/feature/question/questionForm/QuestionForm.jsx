import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
// import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
// import TextArea from '../../../app/common/form/TextArea';
import EditorInput from '../../../app/common/form/EditorInput';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import QuestionHints from './QuestionHints';
// import { Editor } from '@tinymce/tinymce-react';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  let question = {};

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    initialValues: question,
    editorValue: state.questionForm.editorValue
  };
};

const actions = {
  loadQuestionCategories,
  handleEditorUpdate,
  createQuestion,
  updateQuestion
};

class QuestionForm extends Component {
  onSubmit = values => {
    console.log('values: ', values);
    console.log('editorValue: ', this.props.editorValue);
    /*
    if (this.props.initialValues.id) {
      this.props.updateQuestion(values);
      this.props.history.push(`/ask/${this.props.initialValues.id}`);
    } else {
      const newQuestion = {
        ...values
      };
      this.props.createQuestion(newQuestion);
      this.props.history.push(`/ask/${newQuestion.id}`);
    }
    */
  };

  render() {
    const { history, initialValues } = this.props;
    return (
      <div className='flex-wrap sm'>
        <div className='grow question-form'>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
            <Field name='content' component={EditorInput} />
            <Field name='test' type='text' component={TextInput} placeholder='Tags' />
            <Button type='submit' positive>
              Submit
            </Button>
            <Button type='button' onClick={initialValues.id ? () => history.push(`/ask/${initialValues.id}`) : () => history.push('/ask')}>
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
)(reduxForm({ form: 'questionForm' })(QuestionForm));
