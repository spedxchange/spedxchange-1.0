import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'semantic-ui-react';

class EditorInput extends Component {
  constructor(props) {
    super(props);
    this.state = { val: '' };
    console.log(this.props);
  }
  render() {
    const { input } = this.props;
    return (
      <Form.Field>
        <Editor
          {...input}
          apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
          initialValue=''
          init={{
            height: 200,
            menubar: false,
            elementpath: false,
            plugins: ['lists link image anchor searchreplace fullscreen media paste'],
            toolbar: 'bold italic | link | bullist numlist | undo redo'
          }}
        />
      </Form.Field>
    );
  }
}

export default EditorInput;
