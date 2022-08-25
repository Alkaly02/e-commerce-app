import React from "react";
import "./Header.css";
// import { AiOutlineSearch } from "react-icons/ai";
import shop from "../../assets/img/shop.png";

import logo from "../../assets/img/logo-ecommerce.png";
// import fixeHeader from "../../utils/functions/fixeHeader";

const Header = ({ children, title }) => {
  // fixeHeader()

  return (
    <header id="myHeader" className="py-2">
      <div className="container-site header">
        <img
          style={{ width: "70px" }}
          src={logo}
          alt="E-commerce Logo"
          className="header-brand inline-block d-none d-sm-inline"
        />
        <div className="d-flex align-items-center">
          {title ? (
            <>
              <img
                style={{ width: "50px", height: "50px" }}
                src={shop}
                alt="Shopping"
              />
              <h1
                className="ms-2 shop-title"
                style={{ color: "rgb(75, 180, 180)", fontWeight: "700" }}
              >
                {title?.toUpperCase()} <span className="d-none d-sm-inline-block">Shop</span> 
              </h1>
            </>
          ) : (
            null
          )}
        </div>
        {/* <div className="form--container d-md-block d-none">
          <form action="" className="header__form">
            <input
              type="text"
              placeholder="Rechercher..."
              className="header__form__input"
            />
            <AiOutlineSearch className="search-icon" />
          </form>
        </div> */}
        <div className="buttons">{children}</div>
      </div>
    </header>
  );
};

export default Header;
