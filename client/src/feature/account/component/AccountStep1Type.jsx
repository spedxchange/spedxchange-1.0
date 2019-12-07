import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import validate from './validate';
import FormSelectField from '../../../app/common/form/FormSelectField';

const typeOptions = ['type 1', 'type 2'];
const sizeOptions = ['big', 'small'];

const AccountStep1Type = props => {
  const { onSubmit } = props;
  return (
    <>
      <h1>step 1</h1>
      <div onClick={onSubmit}>next</div>
      <hr />
      <form onSubmit={onSubmit}>
        <Field name='type' component={FormSelectField} options={typeOptions} placeholder='Select Type...' />
        <Field name='size' component={FormSelectField} options={sizeOptions} />
        <div>
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: 'accountForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AccountStep1Type);
