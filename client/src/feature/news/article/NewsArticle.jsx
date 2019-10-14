import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
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

  handleSocialClick = type => {
    console.log('type: ', type);
  };

  setEmailLink = () => {
    return `mailto:?subject=${this.props.currentArticle.title}&body=I thought you might be interested in reading this SPED Talk article.%0D%0A%0D%0A${this.props.currentArticle.title}%0D%0Ahttps://localhost:3000${this.props.match.url}%0D%0A%0D%0A`.replace(
      / /g,
      '%20'
    );
  };
  render() {
    const { currentArticle, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        {currentArticle && (
          <div className='flex-wrap md article-wrap'>
            <div className='article grow'>
              <div>
                <h1>{currentArticle.title}</h1>
                <div>
                  <img src={`https://spedxchange.s3.us-east-2.amazonaws.com/news/${currentArticle.uid}/${currentArticle.photoURL}.jpg`} alt='{currentArticle.slug}' />
                </div>
              </div>

              <div className='article-figure'>
                <div className='share'>SHARE</div>
                <Icon link circular name='twitter' onClick={() => this.handleSocialClick('twitter')} />
                <Icon link circular name='linkedin' onClick={() => this.handleSocialClick('linkedin')} />
                <Icon link circular name='facebook' onClick={() => this.handleSocialClick('facebook')} />
                <Icon link circular name='envelope outline' onClick={() => this.handleSocialClick('facebook')} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
            </div>
            <div className='tags'>tags</div>
          </div>
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsArticle);
