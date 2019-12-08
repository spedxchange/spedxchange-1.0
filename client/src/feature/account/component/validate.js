const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = async values => {
  await sleep(500);
  console.log('values: ', values);
  const errors = {};
  if (!values.type) {
    errors.type = 'Required';
  }
  if (!values.size) {
    errors.size = 'Required';
  }
  if (!values.test) {
    errors.test = 'Required';
  }
  console.log('errors: ', errors);
  return errors;
};

export default validate;

/*
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';

const validate = combineValidators({
  type: isRequired({ message: 'Company Type is required' }),
  size: isRequired({ message: 'Company Size is required' }),
  title: composeValidators(
    isRequired({ message: 'Question is required' }),
    hasLengthGreaterThan(20)({
      message: 'Please provide more Question details'
    })
  )(),
  content: composeValidators(
    isRequired({ message: 'Description is required' }),
    hasLengthGreaterThan(60)({
      message: 'Please provide more Description details'
    })
  )()
});
*/
