import {useState, useEffect, createContext } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import Startup from './pages/Startup';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import StoreDashboard from './pages/StoreDashboard';
import Header from './components/Header';
import Profile from './pages/Profile';
import Cart from './pages/Cart'

export const CartContext = createContext({});
export const UserContext = createContext({});

export default function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    async function fetchUser() {
        let response = await fetch(`http://localhost:3001/api/v1/user/getUserIdentity`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error') {
          setUser(responseJSON)
        }
    }
    fetchUser()
  }, [])

  const [cart, setCart] = useState({})

  // addToCart + removeFromCart
  const addToCart = (newProduct) => {
    const store = newProduct.product.store._id
    const newArray = cart[store] ? cart[store].concat([newProduct]) : [newProduct]
    setCart(prev => ({
      ...prev, [store]: newArray
    }))
    console.log(cart)
  } 
  const removeFromCart = (newProduct) => {
    const store = newProduct.product.store._id
    const newArray = cart[store] ? cart[store].concat([newProduct]) : [newProduct]
    setCart(prev => ({
      ...prev, [store]: newArray
    }))
    console.log(cart)
  } 

  return (
    <UserContext.Provider value={{user, setUser}}>
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
    <div className="App">
        <header className="App-header">
          <Header user={user}/>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Product'>
              <Product addToCart={addToCart}/>
            </Route>
            <Route path='/Startup' component={Startup} />
            <Route path='/SignUp'>
              <SignUp user={user}/>
            </Route>
            <Route path='/Login'>
              <Login user={user} />
            </Route>
            <Route path='/Startup' component={Startup} />
            <Route path='/StoreDashboard'>
              <StoreDashboard user={user}/>
            </Route>
            <Route path='/Profile'>
              <Profile user={user}/>
            </Route>
            <Route path='/Cart'>
              <Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart}/>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
  );
}
