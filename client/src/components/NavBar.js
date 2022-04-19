import {React, useState, useEffect} from 'react';
import "./Navbar.css"
const Navigation = () =>{
  const [user, setUser] = useState();
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