import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
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

  createImageSrc = (uid, name) => {
    return `https://spedxchange.s3.us-east-2.amazonaws.com/news/${uid}/${name}-cover.jpg`;
  };

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
                  <img src={this.createImageSrc(article.uid, article.photoURL)} alt={article.photoURL} />
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <hr />
                <div>
                  <Icon color='teal' fitted name='tag' />
                  <span>{article.category.categoryName}</span>
                </div>
                <hr />
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
