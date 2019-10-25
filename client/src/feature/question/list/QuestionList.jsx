import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionListItem from './QuestionListItem';
import { Button, Pagination } from 'semantic-ui-react';

const mapState = state => ({
  questions: state.questions.questions,
  questionCount: state.questions.questionCount,
  loading: state.async.loading,
  pagination: {
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: false,
    showPreviousAndNextNav: true,
    totalPages: 20
  }
});

const actions = {};

class QuestionList extends Component {
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
  };

  render() {
    const { history, questions, questionCount } = this.props;
    const { activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav, totalPages } = this.props.pagination;
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
        <Pagination
          className='questions'
          size='mini'
          onPageChange={this.handlePaginationChange}
          activePage={activePage}
          boundaryRange={boundaryRange}
          siblingRange={siblingRange}
          ellipsisItem={showEllipsis ? undefined : null}
          totalPages={totalPages}
          firstItem={showFirstAndLastNav ? undefined : null}
          lastItem={showFirstAndLastNav ? undefined : null}
          prevItem={showPreviousAndNextNav ? undefined : null}
          nextItem={showPreviousAndNextNav ? undefined : null}
        />
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
