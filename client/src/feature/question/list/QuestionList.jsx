import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import QuestionListItem from './QuestionListItem';
import { Button, Pagination } from 'semantic-ui-react';

class QuestionList extends Component {
  state = {
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: false,
    showPreviousAndNextNav: true,
    totalPages: 20
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
  };

  render() {
    const { history, questions, questionCount } = this.props;
    const { activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav, totalPages } = this.state;
    return (
      <Fragment>
        <div className='question-head'>
          <div className='flex-wrap top'>
            <h1>Questions</h1>
            <Button color='green' onClick={() => history.push('/ask')}>
              Ask Question
            </Button>
          </div>
          <div className='flex-wrap bottom'>
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
          activePage={activePage}
          boundaryRange={boundaryRange}
          onPageChange={this.handlePaginationChange}
          size='mini'
          siblingRange={siblingRange}
          totalPages={totalPages}
          ellipsisItem={showEllipsis ? undefined : null}
          firstItem={showFirstAndLastNav ? undefined : null}
          lastItem={showFirstAndLastNav ? undefined : null}
          prevItem={showPreviousAndNextNav ? undefined : null}
          nextItem={showPreviousAndNextNav ? undefined : null}
        />
      </Fragment>
    );
  }
}

export default withRouter(QuestionList);
