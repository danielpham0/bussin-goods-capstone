import React from 'react';
import {useStripe, useElements, CardElement, Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardInput from './CardInput';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK, {
  stripeAccount: 'acct_1KYJMBEPtLNC0ruw'
});

export default function  CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    var response = await fetch(`http://localhost:3001/api/v1/payment/createPayment`, {
      method: "POST",
      body: JSON.stringify({storeID: '', amount: 200}),
      headers: {'Content-Type': 'application/json'}
    })
    var responseJson = await response.json()
    // fill in billing_details based on form info
    const result = await stripe.confirmCardPayment(responseJson.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: null,
            country: null,
            line1: null,
            line2: null,
            postal_code: null,
            state: null
          },
          email: null,
          name: null,
          phone: null
        },
      }
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  // https://github.com/danielpham0/bussin-goods-capstone/blob/42a1b052b221abd05a58723509382242f83c83a0/client/src/App.js
  return (
    <form onSubmit={handleSubmit}>
      <CardInput />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}