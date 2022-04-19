import {React, useContext} from 'react';
import {CartContext} from '../App.js'
import StoreCart from '../components/cart/StoreCart.js';

const Cart = () =>{
    const {cart, addToCart, removeFromCart, deleteFromCart} = useContext(CartContext);
    console.log(cart)
    return (
        <div>
            <h2>Cart</h2>
            {cart && Object.keys(cart).length > 0 ? Object.keys(cart).map(function(store){
                return <StoreCart key={store} store={store} products={cart[store]} addToCart={addToCart}
                    removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} />
            }) : <div> To view products for checkout, please add them to your cart. </div>}
        </div>
    );
}

export default Cart;