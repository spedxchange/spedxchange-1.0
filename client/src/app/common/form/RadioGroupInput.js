import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

/*
options = {
     key: 'key',
    label: 'field2',
    data: [{
        key: 'uniqueKey1',
        field2: 'value2',
        field3: 'value3'
    },{
        key: 'uniqueKey2',
        field2: 'value2',
        field3: 'value3'
    }]
}
*/

const RadioGroupInput = ({ input, options }) => {
  return (
    <>
      {options.data &&
        options.data.map(option => (
          <Form.Field key={option.data[option.key]}>
            <Radio
              {...input}
              label={option.data[option.label]}
              checked={input.name === option.data[option.key]}
              value={option.data[option.key]}
              onChange={(e, data) => input.onChange(data.value)}
            />
          </Form.Field>
        ))}
    </>
  );
};

export default RadioGroupInput;
