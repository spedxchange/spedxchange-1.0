import React from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { reset } from '../AuthActions';

const actions = {
  updatePassword
};

const verifyCallback = recaptchaToken => {
  // console.log(recaptchaToken, '<= your recaptcha token');
};

const LoginForm = ({ updatePassword, handleSubmit, error }) => {
  return (
    <Form className='register-form' onSubmit={handleSubmit(updatePassword)} autoComplete='off'>
      <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='resetPasswordRequest' verifyCallback={verifyCallback} />
      <label>Email</label>
      <Field name='email' component={TextInput} type='text' />
      {error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
      <Button color='green'>Send Reset Instruction</Button>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
