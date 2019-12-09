import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Icon } from 'semantic-ui-react';
import { nextStep, prevStep, setStep } from '../accountActions';
import { geocodeByAddress } from 'react-places-autocomplete';
import validate from './validate';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

// const typeOptions = ['type 1', 'type 2', 'type 3', 'type 4', 'type 5', 'type 6', 'type 7'];
// const sizeOptions = ['big', 'small'];

const typeOptions = [
  { key: 'm', text: 'Type 1', value: '1' },
  { key: 'f', text: 'Type 2', value: '2' },
  { key: 'o', text: 'Type 3', value: '3' }
];

const sizeOptions = [
  { key: 'm', text: 'Big', value: '1' },
  { key: 'f', text: 'Small', value: '2' }
];

const mapState = state => ({
  step: state.account.step
});

const actions = {
  nextStep,
  prevStep,
  setStep
};

export class AccountForm extends Component {
  onSubmit = values => {
    console.log('onSubmit: values: ', values);
  };

  render() {
    const { step, nextStep, prevStep } = this.props;
    return (
      <>
        <h1>Form</h1>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} size='small' autoComplete='off'>
          {step === 1 && (
            <>
              <label>Type</label>
              <Field name='type' component={SelectInput} options={typeOptions} label='Organization Type' placeholder='Select Type...' />
              <label>Size</label>
              <Field name='size' component={SelectInput} options={sizeOptions} label='Organization Size' placeholder='Select Size...' />
            </>
          )}
          {step === 2 && (
            <>
              <label>Full Name</label>
              <Field name='displayName' type='text' component={TextInput} />
              <label>Email</label>
              <Field name='email' type='text' component={TextInput} />
              <label>Password</label>
              <Field name='password' type='password' component={TextInput} />
            </>
          )}
          {step === 3 && (
            <>
              <label>Business Name</label>
              <Field name='company' type='text' component={TextInput} />
              <label>Address</label>
              <Field name='address' type='text' component={TextInput} />
              <div className='flex-box'>
                <div className='flex-6 pr-3'>
                  <label>City</label>
                  <Field name='city' type='text' component={TextInput} />
                </div>
                <div className='flex-2'>
                  <label>State</label>
                  <Field name='state' type='text' component={TextInput} />
                </div>
                <div className='flex-3 pl-3'>
                  <label>Zip</label>
                  <Field name='zip' type='text' component={TextInput} />
                </div>
              </div>
            </>
          )}
          {step === 4 && <div>step 4</div>}
          {step === 5 && <div>step 5</div>}
          <div className='flex-box between'>
            {step > 1 && step < 5 && (
              <button type='button' onClick={prevStep}>
                prev
              </button>
            )}
            {step < 4 && (
              <button type='button' onClick={nextStep}>
                next
              </button>
            )}
            {step === 5 && <button type='submit'>submit</button>}
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(connect(mapState, actions)(reduxForm({ form: 'accountForm', validate })(AccountForm)));
