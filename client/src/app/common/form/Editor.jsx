import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'semantic-ui-react';

const handleEditorChange = e => {
  console.log('Content was updated:', e.target.getContent());
};

const EditorInput = () => {
  return (
    <Form.Field>
      <Editor
        apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
        initialValue=''
        init={{
          height: 200,
          menubar: false,
          plugins: ['autolink lists link image anchor searchreplace fullscreen media paste'],
          toolbar: 'bold italic | link | bullist numlist | undo redo'
        }}
        onChange={handleEditorChange}
      />
    </Form.Field>
  );
};

export default EditorInput;
