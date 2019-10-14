import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { loadArticles } from '../newsActions';
import PageLoader from '../../../app/layout/PageLoader';

const mapState = state => ({
  articles: state.news.articles,
  loading: state.async.loading
});

const actions = {
  loadArticles
};

class NewsMain extends Component {
  componentDidMount() {
    this.props.loadArticles();
  }
  render() {
    const { articles, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        <div className='flex-wrap-content'>
          {articles &&
            articles.map(article => (
              <div className='article-card'>
                <div class='image'>
                  <img src={article.photoURL} alt='img' />
                </div>
                <h3>{article.title}</h3>
                <div>{article.author.displayName}</div>
                <div>{article.summary}</div>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default connect(
  mapState,
  actions
)(NewsMain);
