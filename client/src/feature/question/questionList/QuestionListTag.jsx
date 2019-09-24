import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

class QuestionListTag extends Component {
  render() {
    const { tag } = this.props;
    return <Label as='a'>{tag.tagName}</Label>;
  }
}

export default QuestionListTag;
