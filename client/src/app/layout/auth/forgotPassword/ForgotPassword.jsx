import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const ForgotPassword = () => {
  return <h1>ForgotPassword</h1>;
};

export default connect(
  mapState,
  actions
)(ForgotPassword);
