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
      <div className='question-categories flex-wrap-content'>
        {categories &&
          categories.map(category => (
            <div className='column-3'>
              <h5>{category.text}</h5>
              <p>{category.description}</p>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.questionCategories,
  loading: state.async.loading
});

const mapDispatchToProps = {
  loadQuestionCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCategoryPage);
