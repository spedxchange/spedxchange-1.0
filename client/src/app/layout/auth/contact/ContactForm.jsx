/* eslint no-useless-escape: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan, createValidator } from 'revalidate';
import { contact } from '../AuthActions';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import HiddenInput from '../../../common/form/HiddenInput';

const mapState = state => ({
  initialValues: {
    user: state.auth.currentUser._id,
    name: state.auth.currentUser.displayName,
    email: state.auth.currentUser.email
  },
  isContactMessageSent: state.app.isContactMessageSent
});

const actions = {
  contact
};

const verifyCallback = recaptchaToken => {
  // console.log(recaptchaToken, '<= your recaptcha token');
};

const isValidEmail = createValidator(
  message => value => {
    if (
      value &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
    ) {
      return message;
    }
  },
  'Invalid email address'
);

const validate = combineValidators({
  name: isRequired({ message: 'Full Name is required' }),
  email: composeValidators(isRequired({ message: 'Email is required' }), isValidEmail({ message: 'Must be a valid email address' }))(),
  message: composeValidators(
    isRequired({ message: 'Message is required' }),
    hasLengthGreaterThan(48)({
      message: 'Please provide more details in your message.'
    })
  )()
});

export class ContactForm extends Component {
  render() {
    const { contact, handleSubmit, error } = this.props;
    return (
      <Form className='register-form' onSubmit={handleSubmit(contact)} autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='contact' verifyCallback={verifyCallback} />
        <Field name='user' component={HiddenInput} />
        <label>Full Name</label>
        <Field name='name' component={TextInput} type='text' />
        <label>Email</label>
        <Field name='email' component={TextInput} type='text' />
        <label>Message</label>
        <Field name='message' component={TextArea} />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <Button color='green'>Send Message</Button>
      </Form>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'contactForm', validate })(ContactForm));
