import React, { useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProductCard from "../../components/productCard/ProductCard";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import { db } from "../../firebase/config";
import { useModal } from "../../hooks/useModal";
import { useWhereDocs } from "easy-firestore/hooks";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  firstAddToCart,
  increment,
} from "../../redux/slices/cartSlice";
import { CgLoadbar } from "react-icons/cg";

const UserHomePage = () => {
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const {
    data: products,
    numberOfData: numberOfProducts,
    dataLoading: productsLoading,
  } = useWhereDocs(db, "products", "ownedShop", shopId);

  const { setIsOpen } = useModal();

  // const increment = (cart, id) => {
  //   const selectedProduct = cart.find(p => p.productId === id)
  //   const selectedProductCopy = {...selectedProduct}
  //   const indexOfSelectedProduct = cart.indexOf(selectedProduct)
  //   selectedProductCopy.quantities++
  //   console.log(cart.indexOf(selectedProduct), selectedProductCopy);
  // };

  return (
    <>
      <ProductsContainer
        title="Tous les produits"
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {!productsLoading
          ? numberOfProducts !== 0
            ? products.map((product) => (
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
            : "No products"
          : "loading..."}
      </ProductsContainer>
    </>
  );
};

export default UserHomePage;
