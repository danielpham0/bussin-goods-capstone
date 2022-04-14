import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CheckoutForm from './components/CheckoutForm'
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Product from './pages/Product';
import Startup from './pages/Startup';
import Navbar from './components/NavBar';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK, {
  stripeAccount: 'acct_1KYJMBEPtLNC0ruw'
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path='/Home' component={Home} />
            <Route path='/Product' component={Product} />
            <Route path='/Startup' component={Startup} />
          </Switch>
        </Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bussin Goods</h1>
        </header>
        <SignUpForm />
        <br />
        <LoginForm />
        <br />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>

    );
  }
}

export default App;
