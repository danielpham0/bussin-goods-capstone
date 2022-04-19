import {React, useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import Startup from './pages/Startup';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import StoreDashboard from './pages/StoreDashboard';
import Header from './components/Header';
import Profile from './pages/Profile';

export default function App() {
  const [cart, setCart] = useState({})
  const addToCart = (newProduct) => {
    const store = newProduct.product.store._id
    const newArray = cart[store] ? cart[store].concat([newProduct]) : [newProduct]
    setCart(prev => ({
      ...prev, [store]: newArray
    }))
  } 
  return (
    <div className="App">
        <header className="App-header">
          <Header/>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Product'>
              <Product addToCart={addToCart}/>
            </Route>
            <Route path='/Startup' component={Startup} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/Login' component={Login} />
            <Route path='/Startup' component={Startup} />
            <Route path='/StoreDashboard' component={StoreDashboard} />
            <Route path='/Profile' component={Profile} />
          </Switch>
        </main>
    </div>
  );
}
