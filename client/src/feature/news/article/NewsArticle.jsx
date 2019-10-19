import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { loadArticle, loadArticles } from '../newsActions';
import PageLoader from '../../../app/layout/PageLoader';

const mapState = state => ({
  articles: state.news.articles,
  currentArticle: state.news.currentArticle,
  loading: state.async.loading
});

const actions = {
  loadArticle,
  loadArticles
};

export class NewsArticle extends Component {
  componentDidMount() {
    this.props.loadArticle(this.props.match.params.uid, this.props.match.params.slug);
    if (!this.props.articles) {
      this.props.loadArticles();
    }
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
    const { articles, currentArticle, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        {currentArticle && (
          <div className='flex-wrap md article-wrap'>
            <div className='article grow'>
              <h5 className='section-head'>Featured Story</h5>
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
            <div className='tags'>
              <section>
                <h5 className='section-head red'>Related Headlines</h5>
                <div className='related'>
                  <div className='related'>
                    {articles &&
                      articles.slice(0, 5).map(article => (
                        <a key={article._id} href='/'>
                          {article.title}
                        </a>
                      ))}
                  </div>
                </div>
              </section>
              <section>
                <h5 className='section-head purple'>Related Tags</h5>
                <div className='related'>
                  {currentArticle.tags &&
                    currentArticle.tags.map(tag => (
                      <a key={tag._id} href='/'>
                        {tag.text}
                      </a>
                    ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connect(
  mapState,
  actions
)(NewsArticle);
