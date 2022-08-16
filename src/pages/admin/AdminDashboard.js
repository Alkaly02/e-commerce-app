import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProducts from "../../components/addProducts/AddProducts";
import CategoryList from "../../components/categoryList/CategoryList";
import Header from "../../components/header/Header";
import NoShop from "../../components/noShop/NoShop";
import ProductList from "../../components/ProductList/ProductList";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarMob from "../../components/sidebar/SidebarMob";
import { useAuth } from "../../hooks/useAuth";
import { useShops } from "../../hooks/useShops";
import { adminData } from "../../utils/admin-navbar-items";
import AdminHome from "./AdminHome";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { shops, shopLoading } = useShops();

  const Logout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <>
      <Header>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
      </Header>
      {!shopLoading ? (
        shops.length !== 0 ? (
          <div className="home-grid container-site">
            <Sidebar
              title={"Gérer votre boutique"}
              className="sidebar-containt"
              links={adminData}
            />
            <SidebarMob links={adminData} />
            <div className="w-100">
              <Routes>
                <Route path="" element={<AdminHome />} />
                <Route path="add-category" element={<CategoryList />} />
                <Route path="products" element={<ProductList />} />
                <Route path="add-products" element={<AddProducts />} />
              </Routes>
            </div>
          </div>
        ) : (
          <NoShop />
        )
      ) : (
        <div style={{padding: '10rem'}} className="text-center">
          <div
              style={{ width: "30px", height: "30px", color: 'rgb(75, 180, 180)'}}
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
