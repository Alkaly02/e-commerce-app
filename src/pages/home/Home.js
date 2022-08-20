import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import LoginModal from "../../components/loginModal/LoginModal";
import Sidebar from "../../components/sidebar/Sidebar";
import { MdOutlineShoppingBag, MdPersonOutline } from "react-icons/md";
import "./Home.css";
import { useModal } from "../../hooks/useModal";
import { Route, Routes } from "react-router-dom";
import ShowByCategory from "../../components/showByCategory/ShowByCategory";
import SidebarMob from "../../components/sidebar/SidebarMob";
import UserHomePage from "./HomePage";
import useUserSidebarData from "../../hooks/useUserSidebarData";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {useDocs} from 'easy-firestore/hooks'
import { db } from "../../firebase/config";

const Home = () => {
  const { setIsOpen } = useModal();
  const {data: shops} = useDocs(db, 'shops')
  const { setGlobalShop} = useAuth()
  const {shopNameUrl} = useParams()

  useEffect(() => {
    // get the current shop in All shops collections
    let selectedShop = shops.filter(shop => shop.shopName.toLowerCase() === shopNameUrl.toLowerCase())
    setGlobalShop(selectedShop)
  }, [shops, shopNameUrl])
     
  const {userData} = useUserSidebarData()

  return (
    <>
      <Header title={shopNameUrl}>
        <button onClick={() => setIsOpen(true)}>
          <MdPersonOutline className="button__icon" />
        </button>
        <div className="item-container">
          <button>
            <MdOutlineShoppingBag className="button__icon" />
          </button>
        </div>
      </Header>
      <div className="home-grid container-site">
        <Sidebar
          title={"Liste des catégories"}
          className="sidebar-containt"
          links={userData}
          bgColor="#fff"
          activeColor="rgb(75, 180, 180)"
          color="#2B3445"
          isAdmin={false}
        />
        <SidebarMob links={userData} />
        <div className="w-100">
          <Routes>
            <Route path="" element={<UserHomePage />} />
            <Route path=":id" element={<ShowByCategory />} />
          </Routes>
        </div>
      </div>
      <LoginModal title="Veuillez vous connecter pour ajouter des produits dans votre panier" />
    </>
  );
};

export default Home;
