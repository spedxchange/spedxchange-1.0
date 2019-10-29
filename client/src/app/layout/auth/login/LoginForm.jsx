import React from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { login } from '../AuthActions';

const actions = {
  login
};

const verifyCallback = recaptchaToken => {
  // console.log(recaptchaToken, '<= your recaptcha token');
};

const LoginForm = ({ login, handleSubmit, error }) => {
  // console.log('key: ', process.env.RECAPTCHA_KEY);
  return (
    <Form className='register-form' onSubmit={handleSubmit(login)} autoComplete='off'>
      <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='login' verifyCallback={verifyCallback} />
      <label>Email</label>
      <Field name='email' component={TextInput} type='text' />
      <label>Password</label>
      <Field name='password' component={TextInput} type='password' />
      {error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
      <Button color='green'>Login</Button>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
