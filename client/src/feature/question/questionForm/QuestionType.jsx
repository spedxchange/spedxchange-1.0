import React, { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';

import TagInput from '../../../app/common/form/TagInput';

const QuestionType = ({ options, handleCategorySelect }) => {
  const [categoryId, setId] = useState(0);

  const handleClick = id => {
    handleCategorySelect(id);
    setId(id);
  };
  return (
    <div>
      <div className='text-center mb-5'>
        <h3 className='m-0'>What type of question do you have?</h3>
        <p>We’ll help you find the best way to get your answer.</p>
      </div>
      <div>
        <h5>
          <strong>1. </strong>Select a SPED discipline that is most relevant to your question.
        </h5>
        <div className='columns'>
          {options &&
            options.map(option => (
              <Form.Field key={option._id}>
                <Radio name='category' label={option.text} checked={categoryId === option._id} value={option._id} onChange={() => handleClick(option._id)} />
              </Form.Field>
            ))}
        </div>
      </div>
      <div>
        <h5>
          <strong>2. </strong>Add tags to help the right people find and answer your question.
        </h5>
        <TagInput />
      </div>
    </div>
  );
};

export default QuestionType;
