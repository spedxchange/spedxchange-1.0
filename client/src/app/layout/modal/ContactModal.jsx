import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ContactForm from '../auth/contact/ContactForm';
import { closeModal } from './ModalActions';
import { contact } from '../auth/AuthActions';

const mapState = state => ({
  currentModal: state.modals,
  auth: state.auth
});

const actions = {
  closeModal,
  contact
};

class ContactModal extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.handleCloseModal();
  }

  handleCloseModal = () => {
    if (this.props.currentModal.modalProps && this.props.currentModal.modalProps.fromAuth) {
      this.props.history.goBack();
    }
    this.props.closeModal();
  };

  render() {
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Contact SPEDxchange</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ContactForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(ContactModal)
);
