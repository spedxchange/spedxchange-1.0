import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RegisterForm from '../auth/register/RegisterForm';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals
});

const actions = { closeModal };

class RegisterModal extends Component {
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
        <Modal.Header>Sign Up for SPEDxchange!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm />
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
  )(RegisterModal)
);
