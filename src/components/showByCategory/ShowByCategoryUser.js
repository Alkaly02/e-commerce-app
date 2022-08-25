import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductCard from "../productCard/ProductCard";
import ProductsContainer from "../productsContainer/ProductsContainer";
import { CgLoadbar } from "react-icons/cg";
import usePanier from "../../hooks/usePanier";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import firstAddToCartDetails from "../../utils/functions/firstAddToCartDetails";
import { useAuth } from "../../hooks/useAuth";
import increment from "../../utils/functions/increment";
import { useSelector } from "react-redux";
import {useWhereDocs} from 'easy-firestore/hooks'

const ShowByCategoryUser = () => {
  const { idDomain } = useParams();
  const { categories } = useCategories();
  const globalShop = useSelector(state => state.globalShop)
  const ownerShopId = globalShop[0]?.id
  const {data: products, dataLoading: productsLoading} = useWhereDocs(db, 'products', 'ownedShop', ownerShopId)
  const [title, setTitle] = useState("");
  const {currentUser} = useAuth()

  const { panier } = usePanier();

  useEffect(() => {
    let titleContainer = categories.filter(
      (category) => category.id === idDomain
    );
    setTitle(firstLetterUpperCase(titleContainer[0]?.categoryName));
  }, [categories, idDomain]); 

  const decrement = async (selectedCart) => {
    let { id, quantities, productId } = selectedCart[0];

    if (quantities > 1) {
      return await updateDoc(doc(db, "panier", id), {
        quantities: --quantities,
        totalPrix:
          products.filter((p) => p.id === productId)[0]?.prix * quantities,
      });
    }
    // updating the ui before deleting the last item
    await updateDoc(doc(db, "panier", id), {
      quantities: --quantities,
      totalPrix: products.filter((p) => p.id === productId)[0]?.prix,
    });
    await deleteDoc(doc(db, "panier", id));
  };

  return (
    <>
      <ProductsContainer
        title={title}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
        loading={productsLoading}
      >
        {!productsLoading ? (
          products.filter((product) => product.categoryId === idDomain).length !==
          0 ? (
            products
              .filter((product) => product.categoryId === idDomain)
              .map((product) => (
                <ProductCard key={product.id} {...product}>
                  {/* children */}
                  {panier.filter((p) => p.productId === product.id)[0]
                    ?.quantities > 0 ? (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() =>
                          decrement(
                            panier.filter((p) => p.productId === product.id)
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <CgLoadbar className="plus-icon" />{" "}
                      </button>
                      <p className="m-0 align-self-center mx-3 fw-bold">
                        {
                          panier.filter((p) => p.productId === product.id)[0]
                            ?.quantities
                        }
                      </p>
                      <button
                        onClick={() =>
                          increment(
                            panier.filter((p) => p.productId === product.id)[0], products
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                    onClick={() => firstAddToCartDetails(product, currentUser.uid, globalShop[0].id)}
                      className="w-100 py-1"
                    >
                      {" "}
                      <HiOutlinePlusSm className="plus-icon" />{" "}
                    </button>
                  )}
                </ProductCard>
              ))
          ) : (
            "Pas de produits !"
          )
        ) : (
          <div
            style={{
              width: "30px",
              height: "30px",
              color: "rgb(125, 135, 156)",
            }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </ProductsContainer>
    </>
  );
};

export default ShowByCategoryUser;
