import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment/moment.js';
import PageLoader from '../../../app/layout/PageLoader';
import { loadQuestionBySlug, loadQuestionById } from '../questionActions';

const mapState = state => ({
  loading: state.async.loading,
  questions: state.questions.questions,
  currentQuestion: state.questions.currentQuestion
});

const actions = {
  loadQuestionBySlug,
  loadQuestionById
};

export class QuestionDetail extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    console.log('componentDidMount:', params.uid, params.slug);

    if (params.uid && params.slug) {
      this.props.loadQuestionBySlug(params.uid, params.slug);
    }
    if (params.id) {
      this.props.loadQuestionById(params.id);
    }
  }

  render() {
    const { currentQuestion, loading } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        {currentQuestion && (
          <div className='question-detail'>
            <div className='flex-wrap sm'>
              <div className='grow'>
                <h1 className='mb-1'>{currentQuestion.title}</h1>
                <p>
                  <span>Asked</span>&nbsp;{moment(currentQuestion.updated).from()}
                  <span> &nbsp;Active</span>&nbsp;{moment(currentQuestion.updated).from()}
                  <span> &nbsp;Viewed</span>&nbsp;{currentQuestion.viewCount}
                </p>
              </div>
              <div>
                <Button color='green'>Ask Question</Button>
              </div>
            </div>
            <hr />
            <div className='flex-wrap'>
              <div className='text-center pr-3'>
                <Icon name='caret up' color='grey' size='big' className='mr-0 pt-0'></Icon>
                <div>5</div>
                <Icon name='caret down' color='grey' size='big' className='mr-0'></Icon>
              </div>
              <div className='grow mb-2' dangerouslySetInnerHTML={{ __html: currentQuestion.content }} />
            </div>
            <hr />
            <h5 className='my-1'>
              {currentQuestion.answers.length} Answer{currentQuestion.answers.length === 1 ? '' : 's'}
            </h5>
            <hr />
            {currentQuestion.answers && currentQuestion.answers.length > 0 && currentQuestion.answers.map(answer => <div key={answer._id}>answers</div>)}
          </div>
        )}
      </>
    );
  }
}

export default connect(
  mapState,
  actions
)(QuestionDetail);
