import {React, useContext} from 'react';
import Navbar from './NavBar';
import './Header.css';
import banner from '../imgs/banner.png';
import bannerText from '../imgs/banner-text.png'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <Link to="/" className="header-logo"> BUSSIN' GOODS </Link>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar user={user}/>
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