import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';

import { openModal } from '../../../app/layout/modal/ModalActions';

import QuestionType from './QuestionType';

import PageLoader from '../../../app/layout/PageLoader';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import { handleTabChange, handleSelectCategory, handleSelectTags } from './actions/questionFormActions';

const mapState = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  let question = {};

  if (questionId && state.questions.length > 0) {
    question = state.questions.filter(question => question._id === questionId)[0];
  }
  return {
    initialValues: question,
    tags: state.questionForm.tags,
    activeQuestionTab: state.questionForm.activeQuestionTab,
    categoryId: state.questionForm.categoryId,
    categories: state.category.questionCategories,
    questionTags: state.category.questionTags,
    loading: state.async.loading
  };
};

const actions = {
  loadQuestionCategories,
  handleTabChange,
  handleSelectCategory,
  handleSelectTags,
  openModal
};

export class QuestionTabs extends Component {
  componentDidMount() {
    this.props.openModal('AskQuestionModal');
    this.props.loadQuestionCategories();
  }

  onSubmit = values => {
    // console.log(values);
  };

  render() {
    const { loading, categories, categoryId, activeQuestionTab, handleTabChange, handleSelectCategory, handleSelectTags } = this.props;
    if (loading) return <PageLoader />;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
        <div className='question-tabs'>
          <div className='ui secondary menu'>
            <span className={activeQuestionTab === 0 ? 'item active' : 'item'}>Type</span>
            <span className={activeQuestionTab === 1 ? 'item active' : 'item'}>Title</span>
            <span className={activeQuestionTab === 2 ? 'item active' : 'item'}>Description</span>
            <span className={activeQuestionTab === 3 ? 'item active' : 'item'}>Review</span>
          </div>
          {activeQuestionTab === 0 && (
            <>
              <QuestionType categories={categories} handleSelectTags={handleSelectTags} handleSelectCategory={handleSelectCategory} handleTabChange={handleTabChange} />
              <div className='text-center mt-3'>
                <Button color='green' disabled={!categoryId ? true : false} onClick={() => handleTabChange(1)}>
                  next
                </Button>
              </div>
            </>
          )}
          {activeQuestionTab === 1 && <div>title tab</div>}
          {activeQuestionTab === 2 && <div>description tab</div>}
          {activeQuestionTab === 3 && <div>review tab</div>}
        </div>
      </Form>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'questionForm' })(QuestionTabs));
