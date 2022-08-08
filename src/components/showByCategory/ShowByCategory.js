import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductsContainer from "../productsContainer/ProductsContainer";

const ShowByCategory = () => {
  const { id } = useParams();
  const { categories, categoriesLoading } = useCategories();
  const [title, setTitle] = useState("");

  useEffect(() => {
    let titleContainer = categories.filter((category) => category.id === id);
    setTitle(firstLetterUpperCase(titleContainer[0]?.name));
  }, [categories, id]);
  return (
    <div>
      <ProductsContainer
        title={title}
        loading={categoriesLoading}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      />
    </div>
  );
};

export default ShowByCategory;
