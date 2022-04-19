import React from 'react';
import Navbar from './NavBar';
import './Header.css';
import banner from '../imgs/banner.png';
import bannerText from '../imgs/banner-text.png'

const Header = () => {
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <a href="/" className="header-logo">BUSSIN' GOODS</a>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar />
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
      <div className="banner">
        <img src={banner} alt="Banner"/>
        <div>
            <img src={bannerText} alt="Banner Text" className="banner-text"/>
        </div>
      </div>
      
    </section>
  )
}

export default Header;