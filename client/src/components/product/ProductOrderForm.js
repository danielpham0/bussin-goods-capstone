import {React, useState, useContext} from 'react';
import {CartContext} from '../../App.js'

export default function  ProductOrderForm(props) {
    let product = props.product
    const [statusMessage, setStatusMessage] = useState('');
    
    const {addToCart} = useContext(CartContext); 

    const formatAndAddToCart = (event) => {
        event.preventDefault()
        let addedProduct = {'quantity': event.target.quantity.value, 'product': product}
        addToCart(addedProduct)
        setStatusMessage('Successfully added item to cart!')
    }
    return (
        <div className='product-order-info'>
            <h3>{product.name}</h3>
            <p className='product-tagline'>{product.tagline}</p>
            <div className='product-price'>{product.cost.toLocaleString('en-US', { 
                style: 'currency',currency: 'USD'})}
            </div>
            <form onSubmit={formatAndAddToCart}>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input className="form-control" name="quantity" type="number" defaultValue={1} min={1} step={1} required/>
                </div>
                <button type="submit" className="btn btn-primary">Add to Cart!</button>
                {statusMessage && <div className="form-text status"> {statusMessage} </div>}
            </form>
            <div>{product.ships_to && product.ships_to.length > 0 ? `Available for shipping to: ${product.ships_to.join(", ")}.` : null}</div>
            <div>{product.pickup_from && product.pickup_from.length > 0 ? `Available for pickup from: ${product.pickup_from.join(", ")}.` : null}</div>
        </div>
    );
}