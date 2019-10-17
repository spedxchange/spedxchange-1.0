import React, { useState } from 'react';
import { WithOutContext as ReactTags } from 'react-tag-input';
import { Form } from 'semantic-ui-react';

const TagInput = ({ placeholder, handleTagsUpdate }) => {
  const [tags, updateTags] = useState(0);

  const handleDelete = i => {
    updateTags(tags.filter((tag, index) => index !== i));
    handleTagsUpdate(tags);
  };

  const handleAddition = tag => {
    updateTags([...tags, tag]);
    handleTagsUpdate(tags);
  };
  return (
    <Form.Field>
      <ReactTags tags={tags} placeholder={placeholder} handleDelete={handleDelete} handleAddition={handleAddition} />
    </Form.Field>
  );
};

export default TagInput;
