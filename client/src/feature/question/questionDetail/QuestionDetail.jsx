import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadQuestionBySlugAsView } from '../questionActions';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment/moment.js';
import PageLoader from '../../../app/layout/PageLoader';
import AnswerForm from '../answerForm/AnswerForm';

const mapState = state => ({
  auth: state.auth,
  question: state.questions.currentQuestion,
  loading: state.async.loading
});

const actions = {
  loadQuestionBySlugAsView
};

class QuestionDetail extends Component {
  componentDidMount() {
    const { uid, slug } = this.props.match.params;
    this.props.loadQuestionBySlugAsView(uid, slug);
  }

  render() {
    const { auth, history, loading, question } = this.props;
    if (loading) return <PageLoader />;
    return (
      <>
        {question && (
          <div className='question-detail'>
            <div className='flex-box sm'>
              <div className='grow'>
                <h1 className='mb-1'>{question.title}</h1>
                <p>
                  <span>Asked</span>&nbsp;{moment(question.updated).from()}
                  <span> &nbsp;Active</span>&nbsp;{moment(question.updated).from()}
                  <span> &nbsp;Viewed</span>&nbsp;{question.viewCount}
                </p>
              </div>
              <div>
                <Button color='green' onClick={() => history.push('/ask')}>
                  Ask Question
                </Button>
              </div>
            </div>
            <hr />
            <div className='flex-box'>
              <div className='text-center pr-3'>
                <Icon name='caret up' color='grey' size='big' className='mr-0 pt-0'></Icon>
                <div>5</div>
                <Icon name='caret down' color='grey' size='big' className='mr-0'></Icon>
              </div>
              <div className='grow mb-2' dangerouslySetInnerHTML={{ __html: question.content }} />
            </div>
            <hr />
            <h5 className='my-1'>
              {question.answers ? question.answers.length : 0} Answer{question.answers.length === 1 ? '' : 's'}
            </h5>
            <hr />
            {question.answers &&
              question.answers.length > 0 &&
              question.answers.map(answer => (
                <div key={answer._id}>
                  <div className='mb-3' dangerouslySetInnerHTML={{ __html: answer.content }} />
                  <hr />
                </div>
              ))}
            {auth.authenticated && <AnswerForm question={question} />}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(QuestionDetail)
);
