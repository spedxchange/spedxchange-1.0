import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

export class AppPagination extends Component {
  render() {
    const { activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav, totalPages } = this.props;
    return (
      <Pagination
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
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  activePage: 5,
  boundaryRange: 1,
  siblingRange: 1,
  showEllipsis: true,
  showFirstAndLastNav: true,
  showPreviousAndNextNav: true,
  totalPages: 50
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPagination);
