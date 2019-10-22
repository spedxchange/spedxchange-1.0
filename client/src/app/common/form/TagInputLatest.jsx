import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { createSlug } from '../util/createSlug';

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.tagInput = React.createRef();
    this.transferTags = this.props.tags;
    this.state = { currentTags: this.props.tags || [] };
    console.log('TagInput: props: ', this.props);
    console.log('TagInput: state: ', this.state);
  }

  inputKeyDown = e => {
    const val = createSlug(e.target.value);
    if (e.key === 'Enter' && val) {
      if (this.state.currentTags && this.state.currentTags.find(tag => tag === val)) {
        this.tagInput.focus();
        e.preventDefault();
        return;
      }
      console.log('Enter Key: ');
      const newTags = [...this.state.currentTags, val];
      console.log('inputKeyDown: newTags: ', newTags);
      this.setState({ currentTags: newTags });
      this.props.handleSelectTags(val);
      this.tagInput.value = null;
      this.tagInput.focus();
      console.log('inputKeyDown: props: ', this.props);
      console.log('inputKeyDown: state: ', this.state);
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
                <li key={i}>
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
