import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../util/createSlug';

class TagInput extends Component {
  constructor(props) {
    super(props);
    console.log('TagInput: props: ', this.props);
    this.tagInput = React.createRef();
    this.state = { currentTags: this.props.tags || [] };
    this.inputKeyDown = this.inputKeyDown.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  inputKeyDown = e => {
    const val = createSlug(e.target.value);
    // console.log('inputKeyDown: props: ', this.props);
    // console.log('inputKeyDown: state: ', this.state);
    // console.log('inputKeyDown: e.target: ', e.target.value);
    if (e.key === 'Enter' && val) {
      if (this.state.currentTags && this.state.currentTags.find(tag => tag === val)) {
        this.tagInput.focus();
        e.preventDefault();
        return;
      }
      const newTags = [...this.state.currentTags, val];
      this.setState({ currentTags: newTags });
      this.props.handleSelectTags(this.state.currentTags);
      this.tagInput.value = null;
      this.tagInput.focus();
      e.preventDefault();
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.currentTags.length - 1);
      this.props.handleSelectTags(this.state.currentTags);
      this.tagInput.focus();
      e.preventDefault();
    }
  };

  removeTag = i => {
    const newTags = [...this.state.currentTags];
    newTags.splice(i, 1);
    this.setState({ currentTags: newTags });
    this.props.handleSelectTags(this.state.currentTags);
  };

  render() {
    const { input, placeholder } = this.props;
    const { currentTags } = this.state;
    return (
      <Form.Field>
        <div className='input-tag'>
          <ul className='input-tag__tags'>
            {currentTags &&
              currentTags.map((tag, i) => (
                <li key={tag}>
                  {tag || ''}
                  <button
                    type='button'
                    onClick={() => {
                      this.removeTag(i);
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
