import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { handleTabChange, handleSelectCategory, handleUpdateTagNames } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import { openModal } from '../../../app/layout/modal/ModalActions';
import PageLoader from '../../../app/layout/PageLoader';
import TextInput from '../../../app/common/form/TextInput';
import EditorInput from '../../../app/common/form/EditorInput';
import TagInput from '../../../app/common/form/TagInput';
import RadioGroupInput from '../../../app/common/form/RadioGroupInput';
import QuestionHints from './QuestionHints';

const mapState = (state, ownProps) => {
  // localStorage.removeItem('hideAskModal');
  const questionId = ownProps.match.params.id;
  let question = {};
  let hideAskModal = false;
  if (localStorage.hideAskModal) {
    const expires = new Date(localStorage.hideAskModal);
    const now = new Date();
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
    loading: state.async.loading,
    initialValues: question,
    hideAskModal: hideAskModal,
    activeQuestionTab: state.questionForm.activeQuestionTab,
    editorValue: state.questionForm.editorValue,
    tagNames: state.questionForm.tagsNames,
    categories: state.category.questionCategories
  };
};

const actions = {
  loadQuestionCategories,
  handleEditorUpdate,
  handleTabChange,
  handleSelectCategory,
  handleUpdateTagNames,
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
    //console.log('editorValue: ', this.props.editorValue);
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
    const {
      loading,
      activeQuestionTab,
      categories,
      handleTabChange,
      tagNames,
      handleUpdateTagNames,
      handleSelectCategory,
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='flex-wrap sm'>
        <div className={`grow question-form tab-${activeQuestionTab}`}>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            {activeQuestionTab === 0 && (
              <div>
                <h1>Identity Question</h1>
                <Button type='button' positive onClick={() => handleTabChange(1)}>
                  Next
                </Button>
              </div>
            )}
            {activeQuestionTab === 1 && (
              <div>
                <div className='text-center mb-5'>
                  <h2 className='m-0'>What type of question do you have?</h2>
                  <p className='mt-2'>We’ll help you find the best way to get your answer.</p>
                </div>
                <div>
                  <h5>
                    <strong>1. </strong>Select a SPED discipline that is most relevant to your question.
                  </h5>
                  <div className='columns'>
                    <Field
                      name='category'
                      options={{
                        key: '_id',
                        label: 'text',
                        data: categories
                      }}
                      component={RadioGroupInput}
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <h5>
                    <strong>2. </strong>Add tags to help the right people find and answer your question.
                  </h5>
                  <Field name='tags' component={TagInput} tags={tagNames} updateTags={handleUpdateTagNames} placeholder='eg test' />
                </div>
                <Button type='button' positive onClick={() => handleTabChange(2)}>
                  Next
                </Button>
              </div>
            )}
            {activeQuestionTab === 2 && (
              <div>
                <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
                <Field name='content' component={EditorInput} />
                <Button type='submit' positive>
                  Review Question
                </Button>
              </div>
            )}
            {activeQuestionTab === 3 && <div>Review</div>}
          </Form>
        </div>
        {activeQuestionTab === 2 && <QuestionHints />}
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'questionForm', validate })(QuestionForm));
