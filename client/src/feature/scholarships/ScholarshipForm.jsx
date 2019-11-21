import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Label } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { submitScholarshipApplication } from '../auth/AuthActions';
import { closeModal } from '../../app/layout/modal/ModalActions';
import TextInput from '../../app/common/form/TextInput';
import EditorInput from '../../app/common/form/EditorInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  initialValues: {
    school: null,
    graduation: null
  }
});

const actions = {
  submitScholarshipApplication,
  closeModal
};

const validate = combineValidators({
  school: isRequired({ message: 'University/School is required' }),
  graduation: isRequired({ message: 'Graduation Date is required' }),
  essay: isRequired({ message: 'Personal Statement is required' })
});

export class ScholarshipForm extends Component {
  render() {
    const { loading, loadingName, closeModal, submitScholarshipApplication, handleSubmit, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(submitScholarshipApplication)} autoComplete='off'>
        <label>University/School</label>
        <Field name='school' id='school' component={TextInput} type='text' />
        <label>Graduation Date</label>
        <Field name='graduation' id='graduation' component={TextInput} type='text' />
        <Field name='essay' component={EditorInput} />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <div className='flex-box pt-2'>
          <Button color='green' loading={loadingName === 'submit-scholarship' && loading} content='Submit' />
          <Button className='ml-3' type='button' loading={loadingName === 'submit-scholarship' && loading} content='Cancel' onClick={() => closeModal()} />
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'scholarshipForm', validate })(ScholarshipForm));
