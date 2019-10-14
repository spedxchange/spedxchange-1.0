import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from './NewsArticleActions';

const mapStateToProps = state => ({
  currentArticle: state.article,
  loading: state.async.loading
});

const mapDispatchToProps = {
  loadArticle
};

export class NewsArticle extends Component {
  componentDidMount() {
    console.log('this.props: ', this.props);
    this.props.loadArticle(this.props.match.params.uid, this.props.match.params.slug);
  }
  render() {
    const { article, loading } = this.props;
    return <div>article</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsArticle);
