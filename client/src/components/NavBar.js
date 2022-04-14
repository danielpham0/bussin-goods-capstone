import React from 'react';
import "./Navbar.css"
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
		
  <div class="mid">
		<ul class="navbar">
			 <li>
      <Link to="/Home">Bussin' Goods</Link>
    </li>
    <li>
      <Link to="/Product">Products</Link>
    </li>
    <li>
      <Link to="/Startup">Startups</Link>
    </li>
		</ul>
  </div>
  
  );
}
export default Navbar;