import React, { useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProductCard from "../../components/productCard/ProductCard";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import { useModal } from "../../hooks/useModal";
import useProducts from "../../hooks/useProducts";

const UserHomePage = () => {
  const { products, productsLoading } = useProducts();
  const { setIsOpen } = useModal();
  return (
    <>
      <ProductsContainer
        title="Tous les produits"
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {!productsLoading
          ? products.length !== 0
            ? products.map((product) => (
                <ProductCard key={product.id} {...product}>
                  <button onClick={() => setIsOpen(true)} className="w-100 py-1">
                    {" "}
                    <HiOutlinePlusSm className="plus-icon" />{" "}
                  </button>
                </ProductCard>
              ))
            : "No products"
          : "loading"}
      </ProductsContainer>
    </>
  );
};

export default UserHomePage;
