import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LoginModal from "../../components/loginModal/LoginModal";
import Sidebar from "../../components/sidebar/Sidebar";
import { MdOutlineShoppingBag, MdPersonOutline } from "react-icons/md";
import "./Home.css";
import { useModal } from "../../hooks/useModal";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ShowByCategory from "../../components/showByCategory/ShowByCategory";
import SidebarMob from "../../components/sidebar/SidebarMob";
import UserHomePage from "./HomePage";
import useUserSidebarData from "../../hooks/useUserSidebarData";
import { useParams, Link } from "react-router-dom";
import { useDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setGlogalShop,
} from "../../redux/slices/globalShopSlice";
import { makeCommandFalse } from "../../redux/slices/commandeSlice";
import { addToGlobalCart } from "../../redux/slices/globalCartSlice";

const Home = () => {
  const { setIsOpen } = useModal();
  const { data: shops } = useDocs(db, "shops");
  const { shopNameUrl } = useParams();
  const isFromCommand = useSelector((state) => state.command.fromCommand);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const globalShop = useSelector((state) => state.globalShop);
  const { userData } = useUserSidebarData();
  const [isShop, setIsShop] = useState(true)
  const navigate = useNavigate()

  const { data: panier } = useDocs(db, 'panier')

  useEffect(() => {
    if (panier.length !== 0) {
      dispatch(addToGlobalCart(panier))
    }
  }, [panier])

  useEffect(() => {
    if (shops.length !== 0) {
      const isShop = shops.some(shop => shop.shopName.toLowerCase() === shopNameUrl.toLocaleLowerCase())
      setIsShop(isShop)
    }
    // get the current shop in All shops collection
    let selectedShop = shops.filter(
      (shop) => shop.shopName.toLowerCase() === shopNameUrl.toLowerCase()
    )[0];
    // the user will not be redirected to the cart if isFromCommand is false
    if (isFromCommand) {
      dispatch(makeCommandFalse());
    }
    if (selectedShop) {
      dispatch(setGlogalShop(selectedShop));
    }
  }, [shops, shopNameUrl]);

  if (!isShop) {
    return navigate(-1);
  }

  return globalShop[0]?.shopName.toLowerCase() === shopNameUrl ? (
    <>
      <Header title={shopNameUrl}>
        <button onClick={() => setIsOpen(true)}>
          <MdPersonOutline className="button__icon" />
        </button>
        <Link to={`/${shopNameUrl}/panier`} className="position-relative">
          <MdOutlineShoppingBag className="button__icon" />
          {cart.length > 0 ? (
            <span
              style={{
                position: "absolute",
                top: "-10%",
                right: "-20%",
                backgroundColor: "rgb(75, 180, 180)",
                color: "white",
                borderRadius: "50%",
                padding: "0.1rem 0.5rem",
                fontSize: "0.8rem",
              }}
            >
              {cart.length}
            </span>
          ) : null}
        </Link>
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
        <SidebarMob
          bgColor="#fff"
          activeColor="rgb(75, 180, 180)"
          color="#2B3445"
          isAdmin={false}
          links={userData}
        />
        <div className="w-100">
          <Routes>
            <Route path="" element={<UserHomePage />} />
            <Route path=":id" element={<ShowByCategory />} />
          </Routes>
        </div>
      </div>
      <LoginModal role="user" title="Veuillez vous connecter pour ajouter des produits dans votre panier" />
    </>
  ) : (<div className="vh-100 w-100 d-flex justify-content-center align-items-center">Redirection..., attendez</div>)
};

export default Home;
