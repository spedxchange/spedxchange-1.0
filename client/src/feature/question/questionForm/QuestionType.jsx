import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const QuestionType = ({ options, handleTypeSelect }) => {
  return (
    <div>
      <div className='text-center mb-5'>
        <h3 className='m-0'>What type of question do you have?</h3>
        <p>We’ll help you find the best way to get your answer.</p>
      </div>
      <div className='flex-wrap around sm'>
        <div>
          <p>
            Select a SPED category that is
            <br />
            most relevant to your question.
          </p>
          {options && options.map(option => <Form.Radio name='category' label={option.categoryName} value={option._id} checked={option._id} onChange={handleTypeSelect} />)}
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
      <div className='text-center mt-5'>
        <Button color='green'>next</Button>
      </div>
    </div>
  );
};

export default QuestionType;
