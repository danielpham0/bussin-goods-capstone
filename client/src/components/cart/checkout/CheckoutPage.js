import {React, useState, useMemo, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap'
import './CheckoutPage.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import CustomerInfoForm from './CustomerInfoForm'
import ShippingInfoForm from './ShippingInfoForm'
import OrderConfirmation from './OrderConfirmation'

export default function  CheckoutPage(props) {
    let {storeID} = useParams()
    const [store, setStore] = useState()
    const [stripePromise, setStripePromise] = useState()
    const STRIPE_PK = 'pk_test_51KrvEdBmd7ejymaHvTLG3XEFVX9TI24JcdizL1LnhzZJGLFkiIrZZOtEWRDOD3sF3Ns0ovlMvM5ivoVnaLiFaTfh00jQKC0sJJ'
    useEffect(() => {
            async function fetchStore() {
                let response = await fetch(`/api/v1/store/getStore?storeID=${storeID}`,
                    {method: "GET", credentials: 'include'})
                let responseJSON = await response.json()
                if (responseJSON.status != 'error' && responseJSON.stripe && responseJSON.stripe.enabled){
                    setStore(responseJSON)
                    setStripePromise(loadStripe(STRIPE_PK, {
                        stripeAccount: responseJSON.stripe.accountID
                      }));
                }
            }
            fetchStore()
        }, [])

    const [curTab, setCurTab] = useState('customer-info'); 
    // if confirmation then disable the rest, otherwise disable everything after it
    const [orderInfo, setOrderInfo] = useState({storeID: storeID});
    return (
        <div>
            <h1>Checkout</h1>
            {props.cart[storeID] && props.cart[storeID].length > 0 && store && store.stripe && store.stripe.enabled ?
            <Tabs activeKey={curTab} onSelect={(k) => setCurTab(k)} className="mb-3 checkout-box">
                <Tab eventKey="customer-info" title="Customer Info" className='checkout-panel' disabled={['confirmation'].includes(curTab) ? true:false}>
                    <CustomerInfoForm setOrderInfo={setOrderInfo} setCurTab={setCurTab}/>
                </Tab>
                <Tab eventKey="shipping-info" title="Shipping Info" className='checkout-panel' disabled={['customer-info','confirmation'].includes(curTab) ? true:false}>
                    <ShippingInfoForm setOrderInfo={setOrderInfo} store={store} setCurTab={setCurTab}/>
                </Tab>
                <Tab eventKey="payment" title="Payment" className='checkout-panel' disabled={['customer-info', 'shipping-info','confirmation'].includes(curTab) ? true:false}>
                    {stripePromise ? <Elements stripe={stripePromise}>
                        <PaymentForm orderInfo={orderInfo} setCurTab={setCurTab} products={props.cart[storeID]} deleteFromCart={props.deleteFromCart}/>
                    </Elements>: <div>Waiting for payment form to load.</div>}
                </Tab>
                <Tab eventKey="confirmation" title="Confirmation" className='checkout-panel' disabled={['customer-info', 'shipping-info','payment'].includes(curTab) ? true:false}>
                    <OrderConfirmation />
                </Tab>
            </Tabs>
            : <p>There are no valid products in your cart for this store! Please add items to your cart before processing. </p>}
        </div>
    );
}