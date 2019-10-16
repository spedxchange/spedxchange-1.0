import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import QuestionType from './QuestionType';

import PageLoader from '../../../app/layout/PageLoader';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import { handleTabChange, handleCategorySelect } from './questionTabsActions';

const mapStateToProps = state => ({
  tags: state.questionForm.tags,
  activeTabIndex: state.questionForm.activeTabIndex,
  categories: state.category.questionCategories,
  categoryId: state.category.categoryId,
  loading: state.async.loading
});

const mapDispatchToProps = {
  handleTabChange,
  loadQuestionCategories,
  handleCategorySelect
};

export class QuestionTabs extends Component {
  componentDidMount() {
    this.props.loadQuestionCategories();
  }

  render() {
    const { loading, categories, activeTabIndex, handleCategorySelect, handleTabChange } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='question-tabs'>
        <div className='ui secondary menu'>
          <span className={activeTabIndex === 0 ? 'item active' : 'item'}>Type</span>
          <span className={activeTabIndex === 1 ? 'item active' : 'item'}>Title</span>
          <span className={activeTabIndex === 2 ? 'item active' : 'item'}>Description</span>
          <span className={activeTabIndex === 3 ? 'item active' : 'item'}>Review</span>
        </div>
        {activeTabIndex === 0 && (
          <>
            <QuestionType options={categories} handleCategorySelect={handleCategorySelect} handleTabChange={handleTabChange} />
            <div className='text-center mt-3'>
              <Button color='green' className={this.props.categoryId ? 'disabled' : null} onClick={() => handleTabChange(1)}>
                next
              </Button>
            </div>
          </>
        )}
        {activeTabIndex === 1 && <div>title tab</div>}
        {activeTabIndex === 2 && <div>description tab</div>}
        {activeTabIndex === 3 && <div>review tab</div>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionTabs);
