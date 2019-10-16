import React, { Component } from 'react';
import { Modal, Button, Icon, List } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './ModalActions';

const actions = { closeModal };

class AskQuestionModal extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <Modal size='mini' open={true} className='ask-question-modal' onClose={this.props.closeModal}>
        <Modal.Header>Asking a Good Question</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <p>You’re ready to ask a SPED-related question and the community is here to help! To get the best answers, follow these guidelines:</p>
            <p>Before you ask, search the site to make sure your question hasn’t been answered.</p>
            <List ordered>
              <List.Item>Summarize the issue</List.Item>
              <List.Item>Describe approaches you’ve tried</List.Item>
              <List.Item>When appropriate, give examples</List.Item>
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <span>Don't show this again.</span>
          <span clasname='spacer'>&nbsp;</span>
          <Button color='green' size='medium' onClick={closeModal}>
            <Icon name='checkmark' />
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(AskQuestionModal);
