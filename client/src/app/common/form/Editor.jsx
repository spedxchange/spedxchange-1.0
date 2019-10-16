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
        apiKey={process.env.TINY_MCE_KEY}
        initialValue=''
        init={{
          height: 200,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
        }}
        onChange={handleEditorChange}
      />
    </Form.Field>
  );
};

export default EditorInput;
