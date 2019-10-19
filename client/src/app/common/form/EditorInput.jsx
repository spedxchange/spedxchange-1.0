import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Label } from 'semantic-ui-react';

class EditorInput extends Component {
  constructor(props) {
    super(props);
    console.log('EditorInput: props: ', this.props);
    this.state = { content: '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleChange(val) {
    if (val) {
      console.log('this.props.input.value: ', this.props.input.value);
      this.setState({ value: val });
      this.props.change(val);
    }
  }

  handleEditorChange(content, editor) {
    this.setState({ content });
  }

  handleInputChange(e) {
    console.log('e: ', e);
  }

  blur = async () => {
    await this.inputRef.focus();
    await this.inputRef.blur();
  };

  render() {
    const {
      input,
      meta: { touched, error }
    } = this.props;
    return (
      <>
        <Form.Field>
          <input {...input} className='hidden-text-input' type='text' value={this.state.content} ref={ref => (this.inputRef = ref)} />
          {touched && error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
        </Form.Field>
        <Editor
          apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
          onEditorChange={this.handleEditorChange}
          onBlur={this.blur}
          init={{
            height: 200,
            menubar: false,
            elementpath: false,
            plugins: ['lists link image anchor searchreplace fullscreen media paste'],
            toolbar: 'bold italic | link | bullist numlist | undo redo'
          }}
        />
      </>
    );
  }
}

export default EditorInput;
