import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../util/createSlug';

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.tagInput = React.createRef();
    this.state = { tags: [] };
    console.log('TagInput: props: ', props);
  }

  inputKeyDown = e => {
    const val = createSlug(e.target.value);
    // console.log('inputKeyDown: props: ', this.props);
    // console.log('inputKeyDown: state: ', this.state);
    console.log('inputKeyDown: e.target: ', e.target.value);
    if (e.key === 'Enter' && val) {
      if (this.state.tags && this.state.tags.find(tag => tag === val)) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val] });
      // console.log('inputKeyDown: setTags: ', this.state.tags);
      this.tagInput.value = null;
      e.preventDefault();
    } else if (e.key === 'Backspace' && !val) {
      this.props.removeTag(this.state.tags.length - 1);
      this.tagInput.value = null;
      e.preventDefault();
    }
  };

  removeTag = i => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  };

  render() {
    const { input, removeTag, placeholder } = this.props;
    const { tags } = this.state;
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
              <input
                type='text'
                placeholder={placeholder}
                onKeyDown={e => this.inputKeyDown(e)}
                ref={c => {
                  this.tagInput = c;
                }}
              />
            </li>
          </ul>
        </div>
        <input {...input} type='hidden' value={this.state.tags} />
      </Form.Field>
    );
  }
}

export default TagInput;
