import {React, useState, useMemo} from 'react';
import { useParams } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap'
import './CheckoutPage.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

export default function  CheckoutPage(props) {
    const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PK, {
        stripeAccount: 'acct_1KYJMBEPtLNC0ruw'
      }), ['acct_1KYJMBEPtLNC0ruw']);

    const [curTab, setCurTab] = useState('customer-info');

    let {storeID} = useParams()
    let cart = props.cart
    let deleteFromCart = props.deleteFromCart

    return (
        <div>
            <h1>Checkout</h1>
            <Tabs activeKey={curTab} onSelect={(k) => setCurTab(k)} className="mb-3 checkout-box">
                <Tab eventKey="customer-info" title="Customer Information" className='checkout-panel'>
                    Hello
                </Tab>
                <Tab eventKey="shipping-info" title="Shipping Information" className='checkout-panel'>
                    Bye
                </Tab>
                <Tab eventKey="payment" title="Payment" className='checkout-panel'>
                    <Elements stripe={stripePromise}>
                        <PaymentForm/>
                    </Elements>
                </Tab>
            </Tabs>
        </div>
    );
}