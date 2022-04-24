import {React, useState} from 'react';
import { COUNTRIES } from '../../../constants/constants';

export default function  ShippingInfoForm(props) {
    let store = props.store
    const [shippingCountry, setShippingCountry] = useState('United States');
    let handleCountryChange = (event) => {
        setShippingCountry(
            event.target.value
        )
    }
    const [pickupSelected, setPickupSelected] = useState('Pick-up');
    let handlePickupChange = (event) => {
        setPickupSelected(
            event.target.value == 'Pick-up'
        )
    }

    let submitShipInfo = async (event) => {
        event.persist();
        event.preventDefault()
        props.setOrderInfo(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                street_address: event.target.street_address.value,
                street_address_2: event.target.street_address_2.value,
                city: event.target.city.value,
                postal_code: event.target.postal_code.value,
                state: event.target.state.value,
                country: event.target.country.value
            },
            delivery_option: event.target.delivery_option.value,
            pickup_from: event.target.pickup_from ? event.target.pickup_from.value : null
        }))
        props.setCurTab('payment')
    }
    return (
        <form className="customer-info" onSubmit={submitShipInfo}>
            <h3>Shipping Information</h3>
            <h4>Address</h4>
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
                <select name="country" className="form-select" onChange={handleCountryChange} required>
                    {COUNTRIES.map(country => (
                        <option value={country} key={country}>{country}</option>
                    ))}
                </select>
            </div>
            <h4>Shipping Option</h4>
            <div className="mb-3">
                <label className="form-label">How would you like this order to be delivered?</label>
                <select name="delivery_option" className="form-select" onChange={handlePickupChange} required>
                    {store && store.pickup_from.length > 0 ? <option value='Pick-up'>Pick-up</option> : ''}
                    {store && store.ships_to.includes(shippingCountry) ? <option value='Delivery'>Delivery</option> : ''}
                </select>
                <div className="form-text">If the shipping address listed above cannot be shipped to, delivery option will not be offered. </div>
            </div>
            {store && pickupSelected ? 
                <div className="mb-3">
                    <select name="pickup_from" className="form-select" required>
                        {store.pickup_from.map(location => (
                            <option value={location} key={location}>{location}</option>
                        ))}
                    </select>
                </div>
                : ''}
            <button type="submit" className="btn btn-primary">Proceed to Payment</button>
        </form>
    );
}