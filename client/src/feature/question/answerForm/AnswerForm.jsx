import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

const mapState = state => ({});

const actions = {};

export class AnswerForm extends Component {
  render() {
    return <div></div>;
  }
}

export default connect(
  mapState,
  actions
)(AnswerForm);
