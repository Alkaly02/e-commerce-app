import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LoginModal from "../../components/loginModal/LoginModal";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { MdOutlineShoppingBag, MdPersonOutline } from "react-icons/md";
import "./Home.css";
import { useModal } from "../../hooks/useModal";
import useCategories from "../../hooks/useCategories";
import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import CategoryList from "../../components/categoryList/CategoryList";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import { Route, Routes } from "react-router-dom";
import ShowByCategory from "../../components/showByCategory/ShowByCategory";
import SidebarMob from "../../components/sidebar/SidebarMob";

const Home = () => {
  const { setIsOpen } = useModal();
  const { categories, categoriesLoading } = useCategories();
  const [userData, setUserData] = useState([
    {
      to: "",
      label: "Acceuil",
      icon: <AiOutlineHome />,
    },
  ]);

  useEffect(() => {
    const sidebarLinks = [];

    categories?.forEach((category) => {
      sidebarLinks.push({
        to: category.id,
        label: firstLetterUpperCase(category.name),
        icon: <AiOutlineAppstoreAdd />,
      });
    });

    setUserData((state) => [...state, ...sidebarLinks]);
  }, [categories]);

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
      <div className="home-grid container-site">
        <Sidebar
          title={"Meilleures catégories"}
          className="sidebar-containt"
          links={userData}
        />
        <SidebarMob links={userData} />
        <div className="w-100">
        <Routes>
          <Route
            path=""
            element={
              <ProductsContainer
                title="Produits tendences"
                description="Meilleure collection de 2021 pour vous !"
                className="main-content"
              />
            }
          />
          <Route path="/:id" element={<ShowByCategory />} />
        </Routes>
        </div>
      </div>
      <LoginModal />
    </>
  );
};

export default Home;
