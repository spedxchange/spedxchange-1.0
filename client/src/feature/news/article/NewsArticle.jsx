import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../newsActions';
import PageLoader from '../../../app/layout/PageLoader';

const mapStateToProps = state => ({
  articles: state.news.articles,
  currentArticle: state.news.currentArticle,
  loading: state.async.loading
});

const mapDispatchToProps = {
  loadArticle
};

export class NewsArticle extends Component {
  componentDidMount() {
    console.log('NewsArticle: componentDidMount');
    console.log('NewsArticle: props: ', this.props);
    this.props.loadArticle(this.props.match.params.uid, this.props.match.params.slug);
  }
  render() {
    const { currentArticle, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        {currentArticle && (
          <>
            <h1>{currentArticle.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          </>
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsArticle);
