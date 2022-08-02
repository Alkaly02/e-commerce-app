import React from "react";
import Header from "../../components/header/Header";
import LoginModal from "../../components/loginModal/LoginModal";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { MdOutlineShoppingBag, MdPersonOutline } from "react-icons/md";
import "./Home.css";
import { useModal } from "../../hooks/useModal";

const Home = () => {
  const { setIsOpen } = useModal();
  return (
    <>
      <Header>
        <button onClick={() => setIsOpen(true)}>
          <MdPersonOutline className="button__icon" />
        </button>
        <div className="item-container">
          <button>
            <MdOutlineShoppingBag className="button__icon" />
          </button>
        </div>
      </Header>
      <div className="home-grid container">
        <Sidebar title={"Top Categories"} className="sidebar-containt" />
        <ProductsContainer
          title="Trending Products"
          description="Best collection in 2021 for you!"
          className="main-content"
        />
        <LoginModal />
      </div>
    </>
  );
};

export default Home;
