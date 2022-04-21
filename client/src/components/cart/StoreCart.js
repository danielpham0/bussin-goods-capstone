import {React, useState, useEffect} from 'react';
import CartItem from './CartItem';
import './StoreCart.css'
import { Link } from "react-router-dom";

export default function  StoreCart(props) {
    const storeID = props.store
    const [store, setStore] = useState()
    useEffect(() => {
            async function fetchStore() {
                let response = await fetch(`http://localhost:3001/api/v1/store/getStore?storeID=${storeID}`,
                    {method: "GET", credentials: 'include'})
                let responseJSON = await response.json()
                if (responseJSON.status != 'error'){
                    setStore(responseJSON)
                }
            }
            fetchStore()
        }, [])
    const products = props.products
    const itemCount = products.reduce(function(count, cur){return count + cur.quantity}, 0)
    const subtotal = products.reduce(function(count, cur){return count + cur.product.cost * cur.quantity}, 0)
    const tax = subtotal * .1
    return (
        <div className='store-cart'>
            {store ? 
                <div> 
                    <h3>{store.name}</h3>
                    {products.map(function(product){
                    return <CartItem key={product.product._id} 
                        product={product.product} quantity={product.quantity}
                        addToCart={props.addToCart} removeFromCart={props.removeFromCart}
                        deleteFromCart={props.deleteFromCart}
                        />})}
                    <div className="card total-info" style={{'width': '18rem'}}>
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
                            <Link className="btn btn-primary" to={`/Cart/${storeID}`}> Proceed to checkout </Link>
                        </div>
                    </div>
                </div>
                : <div>Loading store information.</div>}
        </div>
    );
}