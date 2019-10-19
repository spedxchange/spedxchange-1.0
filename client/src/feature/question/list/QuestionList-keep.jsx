import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Pagination } from 'semantic-ui-react';
import QuestionListItem from './QuestionListItem';

const mapState = state => ({
  ...state,
  activePage: 5,
  boundaryRange: 0,
  siblingRange: 2,
  showEllipsis: true,
  showFirstAndLastNav: false,
  showPreviousAndNextNav: true,
  totalPages: 50
});

const actions = {};

class QuestionList extends Component {
  handlePaginationChange = (e, { activePage }) => {
    console.log('e: ', e);
    console.log('e.target: ', e.target);
    console.log('e.target.value: ', e.target.valueOf);
    console.log('activePage: ', activePage);
    console.log('props: ', this.props);
    this.setState({ activePage: activePage });
    console.log('props: ', this.props);
  };

  render() {
    const { questions, deleteQuestion, activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav, totalPages } = this.props;
    return (
      <Fragment>
        <div className='question-head'>
          <div className='flex-wrap top'>
            <h1>Questions</h1>
            <Button color='green'>Ask Question</Button>
          </div>
          <div className='flex-wrap bottom'>
            <div>count</div>
            <div>
              <Button.Group basic size='mini'>
                <Button>Newest</Button>
                <Button>Active</Button>
                <Button>Votes</Button>
              </Button.Group>
            </div>
          </div>
        </div>
        {questions && questions.map(question => <QuestionListItem key={question._id} question={question} deleteQuestion={deleteQuestion} />)}
        <Pagination
          pointing
          secondary
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

export default connect(
  mapState,
  actions
)(QuestionList);
