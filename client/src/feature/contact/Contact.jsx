import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class Contact extends Component {
  render() {
    return <div></div>;
  }
}

export default connect(
  mapState,
  actions
)(Contact);
