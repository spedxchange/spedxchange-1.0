import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const Jobs = () => {
  return <h1>Jobs</h1>;
};

export default connect(
  mapState,
  actions
)(Jobs);
