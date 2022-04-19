import React from 'react';
import Navbar from './NavBar';
import './Header.css';
import banner from '../imgs/banner.png';

const Header = (props) => {

  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <a href="/" className="header-logo">BUSSIN' GOODS</a>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar user={props.user}/>
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
      <img src={banner} alt="Logo" />
    </section>
  )
}

export default Header;