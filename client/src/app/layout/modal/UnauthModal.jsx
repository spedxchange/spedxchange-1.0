import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { openModal, closeModal } from '../modal/ModalActions';

const actions = { openModal, closeModal };

export class UnauthModal extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.props.closeModal();
  }

  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const { openModal } = this.props;
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>You Need to Be Signed In</Modal.Header>
        <Modal.Description>
          <p>Please login or sign up to see this page</p>
          <Button.Group widths={3}>
            <Button fluid color='teal' onClick={() => openModal('LoginModal', { fromAuth: true })}>
              Login
            </Button>
            <Button.Or />
            <Button fluid positive onClick={() => openModal('RegisterModal', { fromAuth: true })}>
              Sign Up
            </Button>
          </Button.Group>
          <Divider />
          <div className='text-center'>
            <Button onClick={this.handleCloseModal}>Cancel</Button>
          </div>
        </Modal.Description>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UnauthModal)
);
