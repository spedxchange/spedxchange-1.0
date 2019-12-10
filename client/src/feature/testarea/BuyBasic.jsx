import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const stripeBtn = () => {
  const publishableKey = 'pk_test_ZU3mlTy0q00DATc9EyF9A8jX';

  const onToken = async token => {
    const body = {
      productPlan: 'prod_GKovdKbn2RxViK',
      token: token
    };
    axios
      .post('/api/subscribe/', body)
      .then(response => {
        console.log(response);
        alert('Payment Success');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };
  return (
    <StripeCheckout
      label='Subscribe Today'
      name='SPEDxchange'
      description='Start your subscription'
      panelLabel='Subscribe'
      amount={25000}
      token={onToken}
      zipCode={true}
      stripeKey={publishableKey}
      image='/apple-touch-icon.png'
      billingAddress={true}
    />
  );
};
export default stripeBtn;
