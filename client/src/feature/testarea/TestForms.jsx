import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import SelectInput from '../../app/common/form/SelectInput';
import TextField from '../../app/common/form/TextField';

const mapState = state => ({});

const actions = {};

const typeOptions = [
  { text: 'Type 1', value: '1' },
  { text: 'Type 2', value: '2' },
  { text: 'Type 3', value: '3' }
];

const sizeOptions = [
  { text: 'Big', value: '1' },
  { text: 'Small', value: '2' }
];

const validate = combineValidators({
  type: isRequired({ message: 'Type is required' }),
  size: isRequired({ message: 'Size is required' }),
  displayName: isRequired({ message: 'name is required' }),
  email: isRequired({ message: 'email is required' }),
  password: isRequired({ message: 'Password is required' })
});

export class TestForms extends Component {
  onSubmit = values => {
    console.log('onSubmit: values: ', values);
  };
  render() {
    const { handleSubmit, values } = this.props;
    return (
      <>
        <h3>Form Parts</h3>
        <Form className='form-container' autoComplete='off' onSubmit={handleSubmit(this.onSubmit)}>
          <section>
            <h4>signup</h4>
            <hr />
            <label>Type</label>
            <Field name='type' component={SelectInput} options={typeOptions} label='Organization Type' placeholder='Select Type...' />
            <label>Size</label>
            <Field name='size' component={SelectInput} options={sizeOptions} label='Organization Size' placeholder='Select Size...' />
            <hr />
          </section>
          <section>
            <h4>signup</h4>
            <hr />
            <Field name='displayName' label={'Full Name'} component={TextField} />
            <Field name='email' label={'Email'} hint={'Candidates that apply to your job will be sent to this email'} component={TextField} />
            <Field name='password' label={'Create Password'} hint={'Minimum 8 characters'} component={TextField} />
            <hr />
          </section>
          <hr />
          <Button>Submit</Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <hr />
        </Form>
      </>
    );
  }
}

export default withRouter(connect(mapState, actions)(reduxForm({ form: 'testForm', validate })(TestForms)));
