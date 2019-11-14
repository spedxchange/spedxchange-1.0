import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { login, toggleForgotPassword } from '../AuthActions';
import TextInput from '../../../common/form/TextInput';

const mapState = state => ({
  isPasswordForgot: state.auth.isPasswordForgot
});

const actions = {
  login,
  toggleForgotPassword
};

export class LoginForm extends Component {
  onSubmit = () => {
    if (this.props.isPasswordForgot) {
      console.log('do password reset');
    } else {
      console.log('do login');
    }
  };

  verifyCallback = recaptchaToken => {
    console.log(recaptchaToken, '<= your recaptcha token');
  };

  render() {
    const { isPasswordForgot, toggleForgotPassword, handleSubmit, error } = this.props;
    return (
      <Form className='register-form' onSubmit={handleSubmit(this.onSubmit)} autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='login' verifyCallback={this.verifyCallback} />
        <label>Email</label>
        <Field name='email' component={TextInput} type='text' />
        {!isPasswordForgot && (
          <>
            <label>Password</label>
            <Field name='password' component={TextInput} type='password' />
          </>
        )}
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <div className='flex-box pt-2'>
          <div className='pr-3'>
            <Button color='green'>{!isPasswordForgot ? 'Login' : 'Reset Password'}</Button>
          </div>
          <div className='grow pt-2 text-right'>
            <span className='link small' onClick={toggleForgotPassword}>
              {!isPasswordForgot ? 'Forgot Password?' : 'Login'}
            </span>
          </div>
        </div>
      </Form>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
