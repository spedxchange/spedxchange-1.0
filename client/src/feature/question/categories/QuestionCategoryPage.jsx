import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestionCategories } from '../../../app/common/actions/category/categoryActions';
import PageLoader from '../../../app/layout/PageLoader';

class QuestionCategoryPage extends Component {
  componentDidMount() {
    this.props.loadQuestionCategories();
  }
  render() {
    const { loading, categories } = this.props;
    if (loading) return <PageLoader />;
    return (
      <div className='question-categories flex-box-wrap'>
        {categories &&
          categories.map(category => (
            <div key={category._id} className='column-3'>
              <h5>{category.text}</h5>
              <p>{category.description}</p>
            </div>
          ))}
      </div>
    );
  }
}

const mapState = state => ({
  categories: state.category.questionCategories,
  loading: state.async.loading
});

const actions = {
  loadQuestionCategories
};

export default connect(
  mapState,
  actions
)(QuestionCategoryPage);