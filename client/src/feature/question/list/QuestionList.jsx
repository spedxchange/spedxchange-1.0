import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionListItem from './QuestionListItem';
import { Button, Pagination } from 'semantic-ui-react';

const mapState = state => ({
  questions: state.questions.questions,
  questionCount: state.questions.questionCount,
  loading: state.async.loading,
  activePage: state.questions.page,
  boundaryRange: 1,
  siblingRange: 1,
  showEllipsis: true,
  showFirstAndLastNav: true,
  showPreviousAndNextNav: true,
  totalPages: state.questions.pages
});

const actions = {};

class QuestionList extends Component {
  handlePaginationChange = (e, { activePage }) => {
    this.props.loadPage(activePage);
  };

  render() {
    console.log('QuestionList: this.props: ', this.props);
    const {
      loading,
      history,
      questions,
      questionCount,
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages
    } = this.props;
    return (
      <>
        <div className='question-head'>
          <div className='flex-box top'>
            <h1>Questions</h1>
            <Button color='green' onClick={() => history.push('/ask')}>
              Ask Question
            </Button>
          </div>
          <div className='flex-box bottom'>
            <div>{questionCount} questions</div>
            <div>
              <Button.Group basic size='mini'>
                <Button>Newest</Button>
                <Button>Active</Button>
                <Button>Votes</Button>
              </Button.Group>
            </div>
          </div>
        </div>
        {questions && questions.map(question => <QuestionListItem key={question._id} question={question} />)}
        {!loading && totalPages > 1 && (
          <Pagination
            className='questions'
            size='mini'
            onPageChange={this.handlePaginationChange}
            activePage={activePage || 1}
            boundaryRange={boundaryRange}
            siblingRange={siblingRange}
            ellipsisItem={showEllipsis}
            totalPages={totalPages}
            firstItem={showFirstAndLastNav}
            lastItem={showFirstAndLastNav}
            prevItem={showPreviousAndNextNav}
            nextItem={showPreviousAndNextNav}
          />
        )}
      </>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(QuestionList)
);
