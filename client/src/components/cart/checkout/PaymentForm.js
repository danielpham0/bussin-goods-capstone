import {React, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardInput from './CardInput';
import { COUNTRIES } from '../../../constants/constants';

export default function  PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [statusMessage, setStatusMessage] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const handleSameAsShipping = (event) => {
    setSameAsShipping(event.target.value == 'yes')
  }
  const itemCount = props.products.reduce(function(count, cur){return count + cur.quantity}, 0)
  const subtotal = props.products.reduce(function(count, cur){return count + cur.product.cost * cur.quantity}, 0)
  const tax = subtotal * .1

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const orderJSON = {...props.orderInfo, products: props.products, amount: tax+subtotal}
    console.log(orderJSON)
    var response = await fetch(`http://localhost:3001/api/v1/order/createStoreOrder`, {
      method: "POST",
      body: JSON.stringify(orderJSON),
      headers: {'Content-Type': 'application/json'}
    })
    var responseJson = await response.json()
    // fill in billing_details based on form info
    const result = await stripe.confirmCardPayment(responseJson.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: sameAsShipping ? props.orderInfo.address.city : event.target.city.value,
            country: sameAsShipping ? props.orderInfo.address.country : event.target.country.value,
            line1: sameAsShipping ? props.orderInfo.address.street_address : event.target.street_address.value,
            line2: sameAsShipping ? props.orderInfo.address.street_address_2 : event.target.street_address_2.value,
            postal_code: sameAsShipping ? props.orderInfo.address.postal_code : event.target.postal_code.value,
            state: sameAsShipping ? props.orderInfo.address.state : event.target.state.value
          },
          email: props.orderInfo.customer_info.email,
          name: props.orderInfo.customer_info.first_name + props.orderInfo.customer_info.last_name,
          phone: props.orderInfo.customer_info.phone_number
        },
      }
    });
    if (result.error) {
      setStatusMessage(result.error.message)
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        props.setCurTab('confirmation')
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment</h3>
      <h4>Billing Address</h4>
      <div className="mb-3">
        <label className="form-label">Is your Billing Address the same as your Shipping Address?</label>
        <select name="same_as_shipping" className="form-select" onChange={handleSameAsShipping}>
          <option value={'yes'}>Same</option>
          <option value={'no'}>Different</option>
        </select>
      </div>
      {sameAsShipping ? '' : <div> 
        <div className="mb-3">
            <input type='street' className="form-control" name='street_address' placeholder='Street Line 1' required/>
        </div>
        <div className="mb-3">
            <input type='street' className="form-control" name='street_address_2' placeholder='Street Line 2'/>
        </div>
        <div className="mb-3 inline-input">
            <input type='city' className="form-control city-input" name='city' placeholder='City' required/>
            <input type='state' className="form-control state-input" name='state' placeholder='State' required/>
            <input type='postal' className="form-control postal-input" name='postal_code' placeholder='postal Code' required/>
        </div>
        <div className="mb-3">
            <select name="country" className="form-select"required>
                {COUNTRIES.map(country => (
                    <option value={country} key={country}>{country}</option>
                ))}
            </select>
        </div>
      </div>}
      <h4>Card Details</h4>
      <div className="mb-3">
          <CardInput className=".card-input" />
      </div>
      <h4>Order Summary</h4>
      <div className="card" style={{'width': '40%'}}>
        <div className='card-body'>
            <h5 className="card-title">Total ({itemCount} items):</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item total-info-item">Subtotal ({itemCount} Items): 
                    {' ' + subtotal.toLocaleString('en-US', { 
                    style: 'currency',currency: 'USD'})}</li>
                <li className="list-group-item total-info-item">Taxes: {tax.toLocaleString('en-US', { 
                    style: 'currency',currency: 'USD'})}</li>
                <li className="list-group-item total-info-item">Total: 
                    {' ' + (subtotal + tax).toLocaleString('en-US', { 
                    style: 'currency',currency: 'USD'})}</li>
            </ul>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!stripe}>Confirm order</button>
      {statusMessage && <div className="form-text status"> {statusMessage} </div>}
    </form>
  );
}