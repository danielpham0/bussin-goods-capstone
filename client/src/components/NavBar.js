import React from 'react'

const Navbar = () => {
  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-transparent">
      <br/>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Products</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Startups</a>
      </li>
    </ul>
  </div>
</nav>
  )
}
export default Navbar