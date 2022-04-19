import {React, useContext} from 'react';
import {CartContext} from '../App.js'

const Cart = () =>{
    const {cart, setCart} = useContext(CartContext);
    return (
        <div>
            {cart ? Object.keys(cart).map(store => {
                console.log(store)
                cart[store].map(product => (
                    console.log(product)
                    // <StoreCart product={product}/>
                ))
            }) : ''}
        </div>
    );
}

export default Cart;