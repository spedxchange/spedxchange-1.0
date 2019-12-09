import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';

const validate = combineValidators({
  type: isRequired({ message: 'Company Type is required' }),
  size: isRequired({ message: 'Company Size is required' }),
  test: isRequired({ message: 'Company Test is required' })
});

export default validate;
