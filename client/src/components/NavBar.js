import React from 'react';
import "./Navbar.css"
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div className="mid">
		<ul className="navbar">
			<li>
        <Link to="/">Bussin' Goods</Link>
      </li>
      <li>
        <Link to="/Product">Products</Link>
      </li>
      <li>
        <Link to="/Startup">Startups</Link>
      </li>
      <li>
        <Link to="/StoreDashboard">Your Store</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
		</ul>
  </div>
  );
}
export default Navbar;