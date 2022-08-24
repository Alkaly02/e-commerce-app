import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarMob from "../../components/sidebar/SidebarMob";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import useUserSidebarData from "../../hooks/useUserSidebarData";
import UserHome from "./UserHome";
import ShowByCategoryUser from "../../components/showByCategory/ShowByCategoryUser";
import usePanier from "../../hooks/usePanier";
import { Link } from "react-router-dom";
import { useDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import AddDoc from "../../utils/functions/AddDoc";
import { deleteCart } from "../../redux/slices/cartSlice";
import {
  deleteGlobalShop,
  setGlogalShop,
} from "../../redux/slices/globalShopSlice";

const UserHomePage = () => {
  const { logout, currentUser } = useAuth();
  const { data: shops } = useDocs(db, "shops");
  const { shopNameUrl } = useParams();
  const { numberOfPanier } = usePanier();
  const { userData } = useUserSidebarData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await logout();
      navigate(`/${shopNameUrl}`);
      dispatch(deleteGlobalShop());
    } catch (err) {
      alert(err.code);
    }
  };

  useEffect(() => {
    let selectedShop = shops.filter(
      (shop) => shop.shopName.toLowerCase() === shopNameUrl.toLocaleLowerCase()
    )[0];
    if (selectedShop) {
      dispatch(setGlogalShop(selectedShop));
    }
    dispatch(deleteCart());
  }, [shopNameUrl, shops]);

  if (!currentUser) {
    return <Navigate to={`/${shopNameUrl}`} />;
  }

  return (
    <>
      <Header title={shopNameUrl}>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
        <Link to={`/user/${shopNameUrl}/panier`} className="position-relative">
          <MdOutlineShoppingBag className="button__icon" />
          {numberOfPanier > 0 ? (
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
              {numberOfPanier}
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
            <Route path="" element={<UserHome />} />
            <Route path=":idDomain" element={<ShowByCategoryUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
