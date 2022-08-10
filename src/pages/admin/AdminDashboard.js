import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProducts from "../../components/addProducts/AddProducts";
import CategoryList from "../../components/categoryList/CategoryList";
import Header from "../../components/header/Header";
import ProductList from "../../components/ProductList/ProductList";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarMob from "../../components/sidebar/SidebarMob";
import { useAuth } from "../../hooks/useAuth";
import { adminData } from "../../utils/admin-navbar-items";
import AdminHome from "./AdminHome";

const AdminDashboard = () => {
  const {logout} = useAuth()
  const navigate = useNavigate()
  const Logout = async () => {
    try{
      await logout()
      navigate('/')
    }
    catch(err){
      alert(err.code)
    }
  }

  return (
    <>
      <Header>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
      </Header>
      <div className="home-grid container-site">
        <Sidebar title={"Gérer votre boutique"} className="sidebar-containt" links={adminData} />
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
    </>
  );
};

export default AdminDashboard;
