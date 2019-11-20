import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, composeValidators, isAlphaNumeric, createValidator } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { registeredUser } from '../AuthActions';
import CheckBoxInput from '../../../app/common/form/CheckBoxInput';

const actions = {
  registeredUser
};

const isConfirmed = createValidator(
  message => value => {
    // console.log('value: ', value);
    if (!value || value === false) {
      return message;
    }
  },
  field => `${field} must be confirmed`
);

const validate = combineValidators({
  displayName: isRequired({ message: 'Full Name is required' }),
  screenName: composeValidators(isRequired({ message: 'Username is required' }), isAlphaNumeric({ message: 'Username may only contain letters and numbers' }))(),
  email: isRequired({ message: 'Email is required' }),
  password: isRequired({ message: 'Password is required' }),
  confirm: composeValidators(isConfirmed({ message: 'confirm' }))()
});

const RegisterForm = ({ handleSubmit, registeredUser, error, invalid, subbmitting }) => {
  return (
    <div>
      <Form className='register-form' onSubmit={handleSubmit(registeredUser)} size='small' autoComplete='off'>
        <label>Full Name</label>
        <Field name='displayName' type='text' component={TextInput} />
        <label>
          Username&nbsp;&nbsp;&nbsp;&nbsp;<span>(16 Character Maximum)</span>
        </label>
        <Field name='screenName' type='text' component={TextInput} maxLength={16} />
        <label>Email</label>
        <Field name='email' type='text' component={TextInput} />
        <label>Password</label>
        <Field name='password' type='password' component={TextInput} />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <hr />
        <div className='flex-box'>
          <div>
            <Button disabled={invalid || subbmitting} color='green'>
              Sign Up
            </Button>
          </div>
          <div className='confirmCheck'>
            <Field name='confirm' component={CheckBoxInput} />
          </div>
          <div className='grow small'>
            <p>
              By clicking "Sign Up" I agree to the{' '}
              <a href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53' target='_blank' rel='noopener noreferrer'>
                {' '}
                Terms of Use
              </a>{' '}
              and acknowledge I have read the{' '}
              <a href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate, initialValues: {} })(RegisterForm));
