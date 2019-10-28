import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobsForm from './JobsForm';

const mapState = state => ({
  backfillJobs: state.jobs.backfillJobs
});

export class Jobs extends Component {
  render() {
    const { backfillJobs } = this.props;
    return (
      <>
        <JobsForm />
        <hr />
        {backfillJobs && backfillJobs.length > 0 && (
          <>
            <p>Jobs List</p>
            <p>Jobs List</p>
          </>
        )}
      </>
    );
  }
}

export default connect(mapState)(Jobs);
