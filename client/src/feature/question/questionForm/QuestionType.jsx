import React, { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';

const QuestionType = ({ options, handleCategorySelect }) => {
  const [categoryId, setId] = useState(0);

  const handleClick = id => {
    handleCategorySelect(id);
    setId(id);
  };
  return (
    <div>
      <div className='text-center mb-3'>
        <h3 className='m-0'>What type of question do you have?</h3>
        <p>We’ll help you find the best way to get your answer.</p>
      </div>
      <div className='flex-wrap around sm'>
        <div>
          <p>
            Select a SPED discipline that is
            <br />
            most relevant to your question.
          </p>
          {options &&
            options.map(option => (
              <Form.Field key={option._id}>
                <Radio name='category' label={option.text} checked={categoryId === option._id} value={option._id} onChange={() => handleClick(option._id)} />
              </Form.Field>
            ))}
        </div>
        <div>
          <p>
            Add tags to help the right people
            <br />
            find and answer your question.
          </p>
          <input type='text' name='tags' />
        </div>
      </div>
    </div>
  );
};

export default QuestionType;
