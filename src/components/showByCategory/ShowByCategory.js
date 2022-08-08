import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductCard from "../productCard/ProductCard";
import ProductsContainer from "../productsContainer/ProductsContainer";

const ShowByCategory = () => {
  const { id } = useParams();
  const { categories } = useCategories();
  const {products, productsLoading} = useProducts()
  const [title, setTitle] = useState("");

  useEffect(() => {
    let titleContainer = categories.filter((category) => category.id === id);
    setTitle(firstLetterUpperCase(titleContainer[0]?.name));
  }, [categories, id]);
  return (
    <>
      <ProductsContainer
        title={title}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {
            !productsLoading ? products.filter(product => product.category === id).length !== 0 ? products.filter(product => product.category === id).map(product => (
                <ProductCard key={product.id} {...product} />
            )) : 'Pas de produits !' : 'loading'
        }
      </ProductsContainer>
    </>
  );
};

export default ShowByCategory;
