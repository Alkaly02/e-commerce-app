import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import { useModal } from "../../hooks/useModal";
import useProducts from "../../hooks/useProducts";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductCard from "../productCard/ProductCard";
import ProductsContainer from "../productsContainer/ProductsContainer";

const ShowByCategory = () => {
  const { id } = useParams();
  const { categories, categoriesLoading } = useCategories();
  const {products, productsLoading} = useProducts()
  const [title, setTitle] = useState("");
  const { setIsOpen } = useModal();
  const [categoryProducts, setCategoryProducts] = useState([])

  useEffect(() => {
    let titleContainer = categories.filter((category) => category.id === id);
    // get category products
    let categoryProducts = products.filter(product => product.categoryId === id)
    setCategoryProducts(categoryProducts)
    setTitle(firstLetterUpperCase(titleContainer[0]?.categoryName));
  }, [categories, id, products]);
  return (
    <>
      <ProductsContainer
        title={title}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
        loading={categoriesLoading}
      >
        {
            !productsLoading ? categoryProducts.length !== 0 ? categoryProducts.map(product => (
                <ProductCard key={product.id} {...product} >
                  <button onClick={() => setIsOpen(true)} className="w-100 py-1">
                    {" "}
                    <HiOutlinePlusSm className="plus-icon" />{" "}
                  </button>
                </ProductCard>
            )) : 'Pas de produits !' : 'loading...'
        }
      </ProductsContainer>
    </>
  );
};

export default ShowByCategory;
