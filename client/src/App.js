import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CheckoutForm from './components/CheckoutForm'
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK, {
  stripeAccount: 'acct_1KYJMBEPtLNC0ruw'
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bussin Goods</h1>
        </header>
        <br/>
        <SignUpForm/>
        <br/>
        <LoginForm/>
        <br/>
        <Elements stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      </div>
    );
  }
}

export default App;
