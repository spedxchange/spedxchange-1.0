import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';

import { openModal } from '../../app/layout/modal/ModalActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  openModal
};

export class HomeMasthead extends Component {
  render() {
    return (
      <Container>
        <h1>
          We empower SPEDucation
          <br />
          and connect people to solutions
          <br />
          that enable growth and discovery.
        </h1>
        <Button>For Educators</Button>
        <Button>For Students</Button>
        <Button>For Schools</Button>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeMasthead);
