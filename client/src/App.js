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
        let response = await fetch(`/api/v1/user/getUserIdentity`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error') {
          setUser(responseJSON)
        } else {
          setUser(null)
        }
    }
    fetchUser()
  }, [])

  const [cart, setCart] = useState({})

  const addToCart = (newProduct) => {
    const store = newProduct.product.store._id
    const curProducts = cart[store]
    let newProducts = [newProduct]
    if (curProducts != null) {
      const existingProduct = curProducts.find((product) => product._id === newProduct._id)
      if(existingProduct) {
        newProducts = curProducts.map((product) => product._id === 
          newProduct._id ? {...existingProduct, quantity: existingProduct.quantity +=1} : product)
      } else {
        newProducts = curProducts.concat(newProducts)
      }
    }
    setCart(prev => ({
      ...prev, [store]: newProducts
    }))
  }

  const removeFromCart = (removedProduct) => {
    const store = removedProduct.store._id
    let newProducts = cart[store]
    const existingProduct = newProducts.find((product) => product.product._id === removedProduct._id)
    if (!existingProduct) { return }

    if(existingProduct.quantity <= 1) {
      if (newProducts.length <= 1) {
        let curStores = {...cart}
        delete curStores[store]
        setCart(curStores)
        return
      }
      newProducts = newProducts.filter((product) => product.product._id !== removedProduct._id)
    } else {
      newProducts = newProducts.map((product) => product.product._id === removedProduct._id 
        ? {...existingProduct, quantity: existingProduct.quantity-1} : product)
    }

    setCart(prev => ({
      ...prev, [store]: newProducts
    }))
  }

  const deleteFromCart = (deletedProduct) => {
    const store = deletedProduct.store._id
    let newProducts = cart[store].filter((product) => product.product._id !== deletedProduct._id)
    if (newProducts.length <= 0) {
      let curStores = {...cart}
      delete curStores[store]
      setCart(curStores)
    } else {
      setCart(prev => ({
        ...prev, [store]: newProducts
      }))
    }
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
    <CartContext.Provider value={{cart, addToCart, removeFromCart, deleteFromCart}}>
    <div className="App">
        <header className="App-header">
          <Header user={user} />
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
              <StoreDashboard user={user} setUser={setUser}/>
            </Route>
            <Route path='/Profile'>
              <Profile user={user} setUser={setUser}/>
            </Route>
            <Route path='/Cart'>
              <Cart cart={cart} deleteFromCart={deleteFromCart} removeFromCart={removeFromCart} addToCart={addToCart}/>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
  );
}
