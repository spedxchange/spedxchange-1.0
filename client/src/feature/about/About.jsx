import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const About = () => {
  return <h1>About Us</h1>;
};

export default connect(
  mapState,
  actions
)(About);
