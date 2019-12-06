import React, { useState, createRef } from 'react';
import { Form } from 'semantic-ui-react';

const FormSelectField = ({ input, label, options, placeholder, meta: { touched, error } }) => {
  console.log('touched, error: ', touched, error);
  const [val, setVal] = useState('');
  const ref = createRef();
  const handleSelect = option => {
    setVal(option);
  };
  const handleKeyUp = () => {
    setVal(val);
  };
  return (
    <Form.Field>
      <div className={touched && error ? 'material-form-field material-form-field-invalid' : 'material-form-field'} data={touched && error ? error : ''}>
        <input {...input} value={val} ref={ref} type='text' placeholder={placeholder} onKeyUp={handleKeyUp} />
        <label className='material-form-field-label'>{label}</label>
        <ul className='material-dropdown'>
          {options &&
            options.map((option, i) => (
              <li key={i.toString()} className={val === option ? 'material-dropdown-selected' : ''} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
        </ul>
      </div>
    </Form.Field>
  );
};

export default FormSelectField;
