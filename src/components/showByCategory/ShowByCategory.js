import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductCard from "../productCard/ProductCard";
import ProductsContainer from "../productsContainer/ProductsContainer";
import { useWhereDocs } from "easy-firestore/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  firstAddToCart,
  increment,
} from "../../redux/slices/cartSlice";
import { CgLoadbar } from "react-icons/cg";

const ShowByCategory = () => {
  const { id } = useParams();
  const globalShop = useSelector((state) => state.globalShop);
  const shopId = globalShop[0]?.id;
  const { data: categories, dataLoading: categoriesLoading } = useWhereDocs(
    db,
    "categories",
    "ownedShop",
    shopId
  );
  const { data: products, dataLoading: productsLoading } = useWhereDocs(
    db,
    "products",
    "ownedShop",
    shopId
  );
  const [title, setTitle] = useState(" ");
  const { setIsOpen } = useModal();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let categoryProducts_2 = products.filter(
    (product) => product.categoryId === id
  );

  useEffect(() => {
    if (categories.length !== 0) {
      let titleContainer = categories.filter((category) => category.id === id);
      setTitle(firstLetterUpperCase(titleContainer[0]?.categoryName));
    }
    // get category products
    let categoryProducts = products.filter(
      (product) => product.categoryId === id
    );
    setCategoryProducts(categoryProducts);
  }, [categories, id, products]);
  return (
    <>
      <ProductsContainer
        title={title}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
        loading={categoriesLoading}
      >
        {!productsLoading
          ? categoryProducts_2.length !== 0
            ? categoryProducts.map((product) => (
                <ProductCard key={product.id} {...product}>
                  {cart.length !== 0 &&
                  cart.filter((p) => p.productId === product.id).length !==
                    0 ? (
                    cart.filter((p) => p.productId === product.id)[0]
                      .quantities <= 0 ? (
                      <button
                        onClick={() => dispatch(firstAddToCart(product))}
                        className="w-100 py-1"
                      >
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => dispatch(decrement(product.id))}
                          className="w-50 py-1"
                        >
                          {" "}
                          <CgLoadbar className="plus-icon" />{" "}
                        </button>
                        <p className="m-0 align-self-center mx-3 fw-bold">
                          {
                            cart.filter((p) => p.productId === product.id)[0]
                              ?.quantities
                          }
                        </p>
                        <button
                          onClick={() => dispatch(increment(product.id))}
                          className="w-50 py-1"
                        >
                          {" "}
                          <HiOutlinePlusSm className="plus-icon" />{" "}
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      onClick={() => dispatch(firstAddToCart(product))}
                      className="w-100 py-1"
                    >
                      <HiOutlinePlusSm className="plus-icon" />{" "}
                    </button>
                  )}
                </ProductCard>
              ))
            : "Pas de produits !"
          : "loading..."}
      </ProductsContainer>
    </>
  );
};

export default ShowByCategory;
