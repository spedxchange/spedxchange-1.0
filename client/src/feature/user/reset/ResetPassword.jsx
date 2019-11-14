import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import HiddenInput from '../../../app/common/form/HiddenInput';

const mapState = state => ({});

const actions = {};

export class ResetPassword extends Component {
  render() {
    return (
      <Form className='register-form' onSubmit={handleSubmit(updatePassword)} autoComplete='off'>
        <Field name='token' component={HiddenInput} />
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='resetPasswordRequest' verifyCallback={verifyCallback} />
        <label>New Password</label>
        <Field name='newPassword' component={TextInput} type='text' />
        <label>Confirm Password</label>
        <Field name='verifyPassword' component={TextInput} type='text' />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <Button color='green'>Reset Password</Button>
      </Form>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'resetPasswordForm', validate })(ResetPassword));
