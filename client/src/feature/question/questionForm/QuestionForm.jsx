import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button, Icon } from 'semantic-ui-react';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { handleTabChange, handleSelectCategory, handleUpdateTagNames } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
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
  const ID = ownProps.match.params.id;
  const UID = ownProps.match.params.id;
  const SLUG = ownProps.match.params.id;
  let initialValues = {};
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

  if (ID && state.questions.length > 0) {
    initialValues = state.questions.filter(question => question._id === ID)[0];
    question.oldTags = question.tags;
  }

  if (UID && SLUG && state.questions.length > 0) {
    question = state.questions.filter(question => question.uid === UID && question.slug === SLUG)[0];
    question.oldTags = question.tags;
  }

  return {
    loading: state.async.loading,
    currentUser: state.auth.currentUser,
    initialValues: initialValues,
    hideAskModal: hideAskModal,
    activeQuestionTab: state.questionForm.activeQuestionTab,
    editorValue: state.questionForm.editorValue,
    tagNames: state.questionForm.tagsNames,
    categories: state.category.questionCategories,
    questionData: state.form.questionForm
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
    values.uid = values.uid ? values.uid : createUid();
    values.slug = values.slug ? values.slug : createSlug(values.title);
    values.user = values.user ? values.user : this.props.currentUser._id;

    if (this.props.initialValues._id) {
      console.log('update: send: ', values);
      this.props.updateQuestion(values);
      handleTabChange(1);
      this.props.history.push(`/ask/${values.uid}/${values.slug}`);
    } else {
      const newQuestion = {
        ...values
      };
      console.log('create: send: ', newQuestion);
      this.props.createQuestion(newQuestion);
      handleTabChange(1);
      this.props.history.push(`/ask/${values.uid}/${values.slug}`);
    }
  };

  createPreviewData = () => {
    let i = 1;
    const previewTags = [];
    this.props.tagNames.map(tag => previewTags.push({ text: tag, _id: i++ }));
    console.log('question: ', {
      ...this.props.questionData.values,
      user: this.props.currentUser,
      tags: previewTags
    });
    return {
      ...this.props.questionData.values,
      user: this.props.currentUser,
      tags: this.props.tagNames
    };
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
                <div className='flex-wrap between'>
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
                  <QuestionPreview question={this.props.questionData.values} user={this.props.currentUser} />
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
