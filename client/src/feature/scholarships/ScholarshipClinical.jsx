import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ScholarshipClinical extends Component {
  render() {
    return <div>article</div>;
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(ScholarshipClinical);
