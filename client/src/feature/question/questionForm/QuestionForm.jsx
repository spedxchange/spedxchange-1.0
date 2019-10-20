import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import { openModal } from '../../../app/layout/modal/ModalActions';
import TextInput from '../../../app/common/form/TextInput';
import EditorInput from '../../../app/common/form/EditorInput';
import QuestionHints from './QuestionHints';

const mapState = (state, ownProps) => {
  // localStorage.removeItem('hideAskModal');
  const questionId = ownProps.match.params.id;
  let question = {};
  let hideAskModal = false;
  if (localStorage.hideAskModal) {
    const expires = new Date(localStorage.hideAskModal);
    const now = new Date();
    console.log('expires: ', expires);
    console.log('now: ', now);
    if (now < expires) {
      hideAskModal = true;
    } else {
      localStorage.removeItem('hideAskModal');
    }
  }

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    hideAskModal: hideAskModal,
    initialValues: question,
    editorValue: state.questionForm.editorValue
  };
};

const actions = {
  loadQuestionCategories,
  handleEditorUpdate,
  createQuestion,
  updateQuestion,
  openModal
};

const validate = combineValidators({
  category: isRequired({ message: 'Category is required' }),
  title: isRequired({ message: 'Title is required' }),
  content: composeValidators(
    isRequired({ message: 'Description is required' }),
    hasLengthGreaterThan(23)({
      message: 'Description needd to be at least 16 characters'
    })
  )()
});

class QuestionForm extends Component {
  componentDidMount() {
    if (!this.props.hideAskModal) {
      this.props.openModal('AskQuestionModal');
    }
    this.props.loadQuestionCategories();
  }

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
    const { history, initialValues, invalid, submitting, pristine } = this.props;
    return (
      <div className='flex-wrap sm'>
        <div className='grow question-form'>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
            <Field name='content' component={EditorInput} />
            <Field name='test' type='text' component={TextInput} placeholder='Tags' />
            <Button type='button' positive disabled={invalid || submitting || pristine}>
              Previw
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
)(reduxForm({ form: 'questionForm', validate })(QuestionForm));
