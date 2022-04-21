import {React, useContext} from 'react';
import {CartContext} from '../App.js'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CartPage from '../components/cart/CartPage.js';
import CheckoutPage from '../components/cart/CheckoutPage.js';

const Cart = () =>{
    const { path } = useRouteMatch();
    const {cart, addToCart, removeFromCart, deleteFromCart} = useContext(CartContext);
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`}>
                    <CartPage cart={cart} addToCart={addToCart} 
                        removeFromCart={removeFromCart} deleteFromCart={deleteFromCart}/>
                </Route>
                <Route path={`${path}/:storeID`}>
                    <CheckoutPage cart={cart} deleteFromCart={deleteFromCart} />
                </Route>
            </Switch>
        </div>
    );
}

export default Cart;