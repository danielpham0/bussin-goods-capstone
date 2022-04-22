import {React} from 'react';
import StoreCart from './StoreCart.js';

export default function  CartPage(props) {
    const cart = props.cart
    const addToCart = props.addToCart
    const removeFromCart = props.removeFromCart
    const deleteFromCart = props.deleteFromCart
    return (
        <div>
            <h1>Cart</h1>
            {cart && Object.keys(cart).length > 0 ? Object.keys(cart).map(function(store){
                return <StoreCart key={store} store={store} products={cart[store]} addToCart={addToCart}
                removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} />
                }) : <div> To view products for checkout, please add them to your cart. </div>}
        </div>
    );
}