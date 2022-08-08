import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import useProducts from "../../hooks/useProducts";

const UserHomePage = () => {
    const { products, productsLoading } = useProducts();
  return (
    <>
      <ProductsContainer
        title="Produits tendences"
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {
            !productsLoading ? products.length !== 0 ? products.map(product => (
                <ProductCard key={product.id} {...product} />
            )) : 'No products' : 'loading'
        }
      </ProductsContainer>
    </>
  );
};

export default UserHomePage;
