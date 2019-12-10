import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectStripe } from 'react-stripe-elements';
import { Button } from 'semantic-ui-react';

import CardSection from './CardSection';

export class CheckoutForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();
    try {
      let token = await this.props.stripe.createToken({ name: 'Jenny Rosen' });
      console.log('token: ', token);
    } catch (error) {
      throw error;
    }
  };
  render() {
    return (
      <form className='form-container' autoComplete='off' onSubmit={this.handleSubmit}>
        <CardSection />
        <Button type='submit'>Confirm order</Button>
      </form>
    );
  }
}

const mapState = state => ({
  item: state.checkout.item
});

const actions = {};

export default injectStripe(connect(mapState, actions)(CheckoutForm));
