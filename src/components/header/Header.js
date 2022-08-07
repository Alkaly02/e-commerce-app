import React from "react";
import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";

import logo from "../../assets/img/logo-ecommerce.png";

const Header = ({children}) => {
  
  return (
    <header>
      <div className="container-site header">
        <img style={{width: '70px'}} src={logo} alt="E-commerce Logo" className="header-brand inline-block" />
        <div className="form--container d-md-block d-none">
          <form action="" className="header__form">
            <input
              type="text"
              placeholder="Rechercher..."
              className="header__form__input"
            />
            <AiOutlineSearch className="search-icon" />
          </form>
        </div>
        <div className="buttons">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
