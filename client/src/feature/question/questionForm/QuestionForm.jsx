import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
// import TextArea from '../../../app/common/form/TextArea';
// import EditorInput from '../../../app/common/form/EditorInput';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import QuestionHints from './QuestionHints';
import { Editor } from '@tinymce/tinymce-react';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  let question = {};

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question.id === questionId)[0];
  }

  return {
    initialValues: question,
    editorValue: state.editorValue
  };
};

const actions = {
  loadQuestionCategories,
  handleEditorUpdate,
  createQuestion,
  updateQuestion
};

const validate = combineValidators({
  title: isRequired({ message: 'Title is required' }),
  category: isRequired({ message: 'Category is required' }),
  content: composeValidators(
    isRequired({ message: 'Question Description is required' }),
    hasLengthGreaterThan(12)({
      message: 'Description needs to be at least 12 characters'
    })
  )()
});

class QuestionForm extends Component {
  onSubmit = values => {
    console.log('values: ', values);
    /*
    if (this.props.initialValues.id) {
      this.props.updateQuestion(values);
      this.props.history.push(`/seminars/${this.props.initialValues.id}`);
    } else {
      const newSeminar = {
        ...values
      };
      this.props.createQuestion(newSeminar);
      this.props.history.push(`/seminars/${newSeminar.id}`);
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
            <Field
              name='content'
              component={Editor}
              apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
              onEditorChange={this.props.handleEditorUpdate}
              initialValue=''
              init={{
                height: 200,
                menubar: false,
                elementpath: false,
                plugins: ['lists link image anchor searchreplace fullscreen media paste'],
                toolbar: 'bold italic | link | bullist numlist | undo redo'
              }}
            />
            <Field name='tags' type='text' component={TextInput} placeholder='Tags' />
            <Button type='submit' positive>
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
)(reduxForm({ form: 'seminarForm' })(QuestionForm));
