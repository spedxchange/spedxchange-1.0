import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../util/createSlug';

const TagInput = ({ placeholder, handleSelectTags }) => {
  const [tags, setTags] = useState([]);
  let tagInput;

  const inputKeyDown = (e, oldTags) => {
    const val = createSlug(e.target.value);
    if (e.key === 'Enter' && val) {
      // tags = tags ? tags : [];
      // console.log('start inputKeyDown: oldTags: ', oldTags);
      // console.log('start inputKeyDown: val: ', val);
      if (tags && tags.find(tag => tag === val)) {
        return;
      }
      const newTags = [...oldTags, val];
      setTags(newTags);
      // console.log('inputKeyDown: setTags: ', tags);
      handleSelectTags(tags);
      tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  };

  const removeTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    // console.log('removeTag: ', tags);
    handleSelectTags(tags);
  };

  return (
    <Form.Field>
      <div className='input-tag'>
        <ul className='input-tag__tags'>
          {tags.length > 0 &&
            tags.map((tag, i) => (
              <li key={tag}>
                {tag || ''}
                <button
                  type='button'
                  onClick={() => {
                    removeTag(i);
                  }}
                >
                  +
                </button>
              </li>
            ))}
          <li className='input-tag__tags__input'>
            <input
              type='text'
              onKeyDown={e => inputKeyDown(e, tags)}
              placeholder={placeholder}
              ref={c => {
                tagInput = c;
              }}
            />
          </li>
        </ul>
      </div>
    </Form.Field>
  );
};

export default TagInput;
