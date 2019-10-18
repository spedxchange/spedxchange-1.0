import React, { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';

import TagInput from '../../../app/common/form/TagInput';

const QuestionType = ({ options, handleSelectCategory, handleSelectTags }) => {
  const [categoryId, setId] = useState(0);

  const handleClick = id => {
    handleSelectCategory(id);
    setId(id);
  };
  return (
    <div>
      <div className='text-center mb-5'>
        <h2 className='m-0'>What type of question do you have?</h2>
        <p className='mt-2'>We’ll help you find the best way to get your answer.</p>
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
      <div className='mt-3'>
        <h5>
          <strong>2. </strong>Add tags to help the right people find and answer your question.
        </h5>
        <TagInput handleSelectTags={handleSelectTags} placeholder='e.g. (behavior program iep)' />
      </div>
    </div>
  );
};

export default QuestionType;
