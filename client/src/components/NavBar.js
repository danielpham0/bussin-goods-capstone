import React from 'react';
import "./Navbar.css"
const Navigation = (props) =>{
  const user = props.user
  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <a href="/Product" className="navbar-item">Products</a>
      <a href="/Startup" className="navbar-item">Startups</a>
      {user && user.account_type == "Store Owner" ? 
        <a href="/StoreDashboard" className="navbar-item">Dashboard</a> : ''}
      {user ? <a href="/Profile" className="navbar-item">Profile</a> : 
        <a href="/Login" className="navbar-item">Login</a>}
      <a href="/Cart" className="navbar-item">Cart</a>
  </section>
  );
}
export default Navigation;