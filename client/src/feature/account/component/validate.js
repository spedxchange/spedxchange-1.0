import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
  type: isRequired({ message: 'Company Type is required' }),
  size: isRequired({ message: 'Company Size is required' })
});

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
