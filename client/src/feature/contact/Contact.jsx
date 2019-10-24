import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const Contact = () => {
  return <h1>Contact Us</h1>;
};

export default connect(
  mapState,
  actions
)(Contact);
