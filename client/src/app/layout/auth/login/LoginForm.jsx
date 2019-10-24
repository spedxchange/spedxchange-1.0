import React from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { login } from '../AuthActions';

const actions = {
  login
};

const verifyCallback = recaptchaToken => {
  console.log(recaptchaToken, '<= your recaptcha token');
};

const LoginForm = ({ login, handleSubmit, error }) => {
  console.log('key: ', process.env.RECAPTCHA_KEY);
  return (
    <Form onSubmit={handleSubmit(login)} autoComplete='off'>
      <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='login' verifyCallback={verifyCallback} />
      <Segment>
        <Field name='email' component={TextInput} type='text' placeholder='Email Address' />
        <Field name='password' component={TextInput} type='password' placeholder='password' />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <Button fluid size='large' color='teal'>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
