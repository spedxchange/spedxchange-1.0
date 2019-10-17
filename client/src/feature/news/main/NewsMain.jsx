import React, { Component } from 'react';
import { withRouter } from 'react-router';
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

  handleArticleClick(article) {
    this.props.history.push({ pathname: `/news/${article.uid}/${article.slug}` });
  }

  render() {
    const { articles, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        <div className='flex-wrap-content'>
          {articles &&
            articles.map(article => (
              <div key={article._id} className='article-card' onClick={() => this.handleArticleClick(article)}>
                <div>
                  <img src={this.createImageSrc(article.uid, article.photoURL)} alt={article.photoURL} />
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <hr />
                <div>
                  <Icon color='teal' fitted name='tag' />
                  <span>{article.category.text}</span>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NewsMain)
);
