import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button, Icon } from 'semantic-ui-react';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { handleTabChange, handleSelectCategory, handleUpdateTagNames } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import { loadQuestionBySlug } from '../questionActions';
import { openModal } from '../../../app/layout/modal/ModalActions';
import { createSlug } from '../../../app/common/util/createSlug';
import { createUid } from '../../../app/common/util/createUid';
import PageLoader from '../../../app/layout/PageLoader';
import TextInput from '../../../app/common/form/TextInput';
import EditorInput from '../../../app/common/form/EditorInput';
import TagInput from '../../../app/common/form/TagInput';
import RadioGroupInput from '../../../app/common/form/RadioGroupInput';
import QuestionHints from './QuestionHints';
import QuestionPreview from './QuestionPreview';

const mapState = (state, ownProps) => {
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

  return {
    loading: state.async.loading,
    hideAskModal: hideAskModal,
    questions: state.questions.questions,
    currentQuestion: state.questions.currentQuestion,
    currentUser: state.auth.currentUser,
    activeQuestionTab: state.questionForm.activeQuestionTab,
    tagNames: state.questionForm.tagsNames,
    categories: state.category.questionCategories,
    questionData: state.form.questionForm
  };
};

const actions = {
  loadQuestionBySlug,
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
    const {
      match: { params }
    } = this.props;

    if (!this.props.hideAskModal) {
      this.props.openModal('AskQuestionModal');
    }
    if (params.uid && params.slug) {
      this.props.loadQuestionBySlug(params.uid, params.slug);
    }

    this.props.loadQuestionCategories();
  }

  onSubmit = values => {
    const {
      match: { params }
    } = this.props;

    let formValues = values;

    formValues.uid = formValues.uid ? formValues.uid : createUid();
    formValues.slug = formValues.slug ? formValues.slug : createSlug(formValues.title);
    formValues.tags = values.tags ? values.tags.split(',') : [];

    if (params.uid && params.slug) {
      this.props.updateQuestion(formValues);
    } else {
      this.props.createQuestion(formValues);
    }
    this.props.history.push(`/questions/${formValues.uid}/${formValues.slug}`);
  };

  createPreviewData = () => {
    let i = 1;
    const previewTags = [];
    this.props.tagNames.map(tag => previewTags.push({ text: tag, _id: i++ }));
    return {
      ...this.props.questionData.values,
      user: this.props.currentUser,
      tags: this.props.tagNames
    };
  };

  render() {
    const { loading, activeQuestionTab, categories, handleTabChange, tagNames, handleUpdateTagNames } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='flex-box sm'>
        <div className={`grow question-form tab-${activeQuestionTab}`}>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            {activeQuestionTab === 1 && (
              <div>
                <div className='text-center mb-5'>
                  <h2 className='m-0'>What type of question do you have?</h2>
                  <p className='mt-2'>We’ll help you find the best way to get your answer.</p>
                </div>
                <div>
                  <h5>
                    <strong>1. </strong>Select a SPED category related to your question.
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
                <div className='my-3'>
                  <h5>
                    <strong>2. </strong>Add tags to help the right people find and answer your question.
                  </h5>
                  <Field name='tags' component={TagInput} tags={tagNames} updateTags={handleUpdateTagNames} placeholder='e.g. (policy behavior kindergarten)' />
                </div>
                <Button positive type='button' className='mt-3' onClick={() => handleTabChange(2)}>
                  Next&nbsp;&nbsp;
                  <Icon fitted name='right arrow' />
                </Button>
              </div>
            )}
            {activeQuestionTab === 2 && (
              <div>
                <div className='mb-1'>
                  <strong>Question:</strong>
                </div>
                <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
                <div className='mt-3 mb-n2'>
                  <strong>Description:</strong>
                </div>
                <Field name='content' component={EditorInput} />
                <hr className='my-3' />
                <div className='flex-box between'>
                  <Button type='button' onClick={() => handleTabChange(1)}>
                    <Icon fitted name='left arrow' />
                    &nbsp;&nbsp;Question Type
                  </Button>
                  <Button type='button' positive onClick={() => handleTabChange(3)}>
                    Review Question&nbsp;&nbsp;
                    <Icon fitted name='right arrow' />
                  </Button>
                </div>
              </div>
            )}
            {activeQuestionTab === 3 && (
              <div>
                <div>
                  {this.props.questionData && this.props.questionData.values && <QuestionPreview question={this.props.questionData.values} user={this.props.currentUser} />}
                </div>
                <Button type='submit' positive>
                  Submit Question
                </Button>
              </div>
            )}
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
