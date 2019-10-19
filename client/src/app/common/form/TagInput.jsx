import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../util/createSlug';

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.inputTag = React.createRef();
    this.state = { tags: [] };
  }

  inputKeyDown = e => {
    const val = createSlug(e.target.value);
    if (e.key === 'Enter' && val) {
      if (this.state.tags && this.state.tags.find(tag => tag === val)) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val] });
      console.log('inputKeyDown: setTags: ', this.state.tags);
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.props.removeTag(this.state.tags.length - 1);
    }
  };

  removeTag = i => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  render() {
    const { tags, removeTag, placeholder, inputKeyDown, input } = this.props;
    return (
      <Form.Field>
        <div className='input-tag'>
          <ul className='input-tag__tags'>
            {tags &&
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
              <input type='text' placeholder={placeholder} onKeyDown={e => inputKeyDown(e)} ref={this.inputTag} />
            </li>
          </ul>
        </div>
        <input {...input} type='hidden' value={this.state.tags} />
      </Form.Field>
    );
  }
}

export default TagInput;
