import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarMob from "../../components/sidebar/SidebarMob";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import useUserSidebarData from "../../hooks/useUserSidebarData";
import UserHome from "./UserHome";
import ShowByCategoryUser from "../../components/showByCategory/ShowByCategoryUser";
import { PanierProvider } from "../../context/PanierProvider";
import { usePanierProvider } from "../../hooks/usePanierProvider";

const UserHomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert(err.code);
    }
  };

  const { commandAmount } = usePanierProvider();

  const { userData } = useUserSidebarData();

  return (
    <>
      <Header>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
        <button className="position-relative">
          <MdOutlineShoppingBag className="button__icon" />
          {commandAmount > 0 ? (
            <span
              style={{
                position: "absolute",
                top: "-15%",
                right: "-25%",
                backgroundColor: "rgb(75, 180, 180)",
                color: "white",
                borderRadius: '50%',
                padding: '0.1rem 0.5rem'
              }}
            >
              {commandAmount}
            </span>
          ) : null}
        </button>
      </Header>
      <div className="home-grid container-site">
        <Sidebar
          title={"Liste des catégories"}
          className="sidebar-containt"
          links={userData}
        />
        <SidebarMob links={userData} />
        <div className="w-100">
          <Routes>
            <Route path="" element={<UserHome />} />
            <Route path="/:id" element={<ShowByCategoryUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
