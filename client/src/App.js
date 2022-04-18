import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import Startup from './pages/Startup';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import StoreDashboard from './pages/StoreDashboard';
import Navbar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
            <Navbar/>
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Product' component={Product} />
              <Route path='/Startup' component={Startup} />
              <Route path='/SignUp' component={SignUp} />
              <Route path='/Login' component={Login} />
              <Route path='/Startup' component={Startup} />
              <Route path='/StoreDashboard' component={StoreDashboard} />
            </Switch>
          </main>
      </div>
    );
  }
}

export default App;
