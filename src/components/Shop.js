import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useShops } from "../hooks/useShops";
import AdminHome from "../pages/admin/AdminHome";
import { setGlogalShop } from "../redux/slices/globalShopSlice";
import { adminData } from "../utils/admin-navbar-items";
import AddProducts from "./addProducts/AddProducts";
import CategoryList from "./categoryList/CategoryList";
import CommandDetails from "./commands/CommandDetails";
import Commands from "./commands/Commands";
import Header from "./header/Header";
import ProductList from "./ProductList/ProductList";
import Sidebar from "./sidebar/Sidebar";
import SidebarMob from "./sidebar/SidebarMob";

const Shop = () => {
  const { logout, setGlobalShop } = useAuth();
  const { shopNameUrl } = useParams();
  const navigate = useNavigate();
  const { shops } = useShops();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    let selectedShop = shops.filter(
      (shop) => shop.shopName.toLowerCase() === shopNameUrl.toLowerCase()
    )[0];
    if (selectedShop) {
      dispatch(setGlogalShop(selectedShop));
    }
  }, [shops, shopNameUrl]);

  if (!currentUser) {
    return <Navigate to={`/admin/${shopNameUrl}/login`} />;
  }

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
      <Header title={shopNameUrl}>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
      </Header>
      <div className="home-grid container-site">
        <Sidebar
          title={"Gérer votre boutique"}
          className="sidebar-containt"
          links={adminData}
          bgColor="#2B3445"
          activeColor="rgb(75, 255, 255)"
          color="#fff"
          isAdmin={true}
        />
        <SidebarMob
          bgColor="#2B3445"
          activeColor="rgb(75, 255, 255)"
          color="#fff"
          isAdmin={true}
          links={adminData}
        />
        <div className="w-100">
          <Routes>
            <Route path="" element={<AdminHome />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="add-products" element={<AddProducts />} />
            <Route path="commands" element={<Commands />} />
            <Route
              path="commands/:commandDetailUrl"
              element={<CommandDetails />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Shop;
