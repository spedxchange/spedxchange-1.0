import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import { registeredUser } from '../AuthActions';

const actions = {
  registeredUser
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm = ({ handleSubmit, registeredUser, error, invalid, subbmitting }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit(registeredUser)} size='large' autoComplete='off'>
        <Segment>
          <Field name='displayName' type='text' component={TextInput} placeholder='Name' />
          <Field name='email' type='text' component={TextInput} placeholder='Email' />
          <Field name='password' type='password' component={TextInput} placeholder='Password' />
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Button diabled={invalid || subbmitting} fluid size='large' color='teal'>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
