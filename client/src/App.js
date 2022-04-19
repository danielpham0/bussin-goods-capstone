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
  const [user, setUser] = useState();
  useEffect(() => {
      async function fetchUser() {
          let response = await fetch(`http://localhost:3001/api/v1/user/getUserIdentity`,
              {method: "GET", credentials: 'include'})
          let responseJSON = await response.json()
          if (responseJSON.status != 'error') {
            setUser(responseJSON)
          }
          console.log(responseJSON)
      }
      fetchUser()
    }, [])
  return (
    <div className="App">
        <header className="App-header">
          <Header user={user}/>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Product' component={Product} />
            <Route path='/Startup' component={Startup} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/Login'>
              <Login />
            </Route>
            <Route path='/Startup' component={Startup} />
            <Route path='/StoreDashboard' component={StoreDashboard} />
            <Route path='/Profile' component={Profile} />
          </Switch>
        </main>
    </div>
  );
}
