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
  const { idDomain } = useParams();
  const { categories } = useCategories();
  const { products, productsLoading } = useProducts();
  const [title, setTitle] = useState("");

  const { panier } = usePanier();

  useEffect(() => {
    let titleContainer = categories.filter(
      (category) => category.id === idDomain
    );
    setTitle(firstLetterUpperCase(titleContainer[0]?.name));
  }, [categories, idDomain]);

  const increment = async (selectedCart) => {
    // get infos about the cart(panier)
    let { id, quantities, productId } = selectedCart[0];

    await updateDoc(doc(db, "panier", id), {
      quantities: ++quantities,
      totalPrix:
        products.filter((p) => p.id === productId)[0]?.prix * quantities,
    });
  };

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

  const firstTimeAddToCart = async (product) => {
    // get all the product data
    const { category, description, id, imgUrl, name, prix } = product;
    await AddDoc("panier", {
      category,
      description,
      productId: id,
      imgUrl,
      name,
      prix,
      quantities: 1,
      totalPrix: prix,
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
        {!productsLoading ? (
          products.filter((product) => product.category === idDomain).length !==
          0 ? (
            products
              .filter((product) => product.category === idDomain)
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
                      onClick={() => firstTimeAddToCart(product)}
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
