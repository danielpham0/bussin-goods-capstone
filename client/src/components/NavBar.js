import {React, useState, useEffect} from 'react';
import "./Navbar.css"
import { Link } from "react-router-dom";
const Navigation = (props) =>{
  const user = props.user
  return (
    <section className="navbar">
      <Link to="/" className="navbar-item"> Home </Link>
      <Link to="/About" className="navbar-item"> About Us </Link>
      <Link to="/Product" className="navbar-item"> Products </Link>
      <Link to="/Startup" className="navbar-item"> Startups </Link>
      {user && user.account_type == "Store Owner" ? 
        <Link to="/StoreDashboard" className="navbar-item"> Dashboard </Link> : ''}
      {user ? <Link to="/Profile" className="navbar-item"> Profile </Link> : 
        <Link to="/Login" className="navbar-item"> Login </Link>}
      <Link to="/Cart" className="navbar-item">Cart </Link>
  </section>
  );
}
export default Navigation;