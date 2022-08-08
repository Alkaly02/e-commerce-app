import React, { useEffect, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import ProductCard from "../productCard/ProductCard";
import ProductsContainer from "../productsContainer/ProductsContainer";
import { CgLoadbar } from "react-icons/cg";
import AddDoc from "../../utils/functions/AddDoc";
import usePanier from "../../hooks/usePanier";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ShowByCategoryUser = () => {
  const { id } = useParams();
  const { categories } = useCategories();
  const { products, productsLoading } = useProducts();
  const [title, setTitle] = useState("");

  const { panier } = usePanier();

  useEffect(() => {
    let titleContainer = categories.filter((category) => category.id === id);
    setTitle(firstLetterUpperCase(titleContainer[0]?.name));
  }, [categories, id]);

  const increment = async (selectedCart) => {
    let { id, quantity, productId } = selectedCart[0];

    await updateDoc(doc(db, "panier", id), {
      quantity: ++quantity,
      totalPrix: products.filter((p) => p.id === productId)[0]?.prix * quantity,
    });
  };

  const decrement = async (selectedCart) => {
    let { id, quantity, productId } = selectedCart[0];

    if (quantity > 1) {
      return await updateDoc(doc(db, "panier", id), {
        quantity: --quantity,
        totalPrix: products.filter((p) => p.id === productId)[0]?.prix * quantity,
      });
    }
    await updateDoc(doc(db, "panier", id), {
      quantity: --quantity,
      totalPrix: products.filter((p) => p.id === productId)[0]?.prix,
    });
    await deleteDoc(doc(db, "panier", id))
  };

  const firstTimeAddToCart = async (idProduct) => {
      await AddDoc("panier", {
        productId: idProduct,
        quantity: 1,
        totalPrix: products.filter((p) => p.id === idProduct)[0]?.prix,
      });
  };

  return (
    <>
      <ProductsContainer
        title={title}
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
        loading={productsLoading}
      >
        {!productsLoading
          ? products.filter((product) => product.category === id).length !== 0
            ? products
                .filter((product) => product.category === id)
                .map((product) => (
                  <ProductCard key={product.id} {...product}>
                    {panier.filter((p) => p.productId === product.id)[0]
                      ?.quantity > 0 ? (
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
                              ?.quantity
                          }
                        </p>
                        <button
                          onClick={() =>
                            increment(
                              panier.filter((p) => p.productId === product.id)
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
                        onClick={() => firstTimeAddToCart(product.id)}
                        className="w-100 py-1"
                      >
                        {" "}
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    )}
                  </ProductCard>
                ))
            : "Pas de produits !"
          : "loading"}
      </ProductsContainer>
    </>
  );
};

export default ShowByCategoryUser;
