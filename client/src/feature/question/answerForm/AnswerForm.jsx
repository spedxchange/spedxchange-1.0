import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { answerQuestion } from '../questionActions';
import EditorInput from '../../../app/common/form/EditorInput';

const actions = {
  answerQuestion
};

const validate = combineValidators({
  content: composeValidators(
    isRequired({ message: 'Answer is required' }),
    hasLengthGreaterThan(55)({
      message: 'Please provide more detail in your answer.'
    })
  )()
});

class AnswerForm extends Component {
  onSubmit = values => {
    // console.log('onSubmit', values);
    this.props.answerQuestion(this.props.question._id, values);
    setTimeout(() => {
      this.props.reload(this.props.question.uid, this.props.question.slug);
    }, 150);
  };

  render() {
    return (
      <>
        <h5 className='my-1'>Your Answer</h5>
        <hr />
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
          <Field name='content' component={EditorInput} />
          <Button positive type='submit' className='mt-2 mb-5'>
            Submit Answer
          </Button>
        </Form>
      </>
    );
  }
}

export default connect(
  null,
  actions
)(reduxForm({ form: 'answerForm', validate })(AnswerForm));
