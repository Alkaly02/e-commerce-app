import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineLogout } from "react-icons/ai";
import { CgLoadbar } from "react-icons/cg";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import usePanier from "../../hooks/usePanier";
import { usePanierProvider } from "../../hooks/usePanierProvider";
import useProducts from "../../hooks/useProducts";
import Header from "../header/Header";
import Panier from "../panier/Panier";
import "./productDetails.css";
import increment from "../../utils/functions/increment";
import decrement from "../../utils/functions/decrement";
import firstAddToCartDetails from "../../utils/functions/firstAddToCartDetails";

const ProductDetails = () => {
  const { productId } = useParams();
  const { numberOfPanier } = usePanier();
  const { products, productsLoading } = useProducts();
  const { panier, panierLoading } = usePanier();
  const { openCart, setOpenCart } = usePanierProvider();
  const { logout, currentUser } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedPanier, setSelectedPanier] = useState({});
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert(err.code);
    }
  };

  useEffect(() => {
    let selected_1 = products.filter((product) => product.id === productId);
    setSelectedProduct(selected_1[0]);

    let selected_2 = panier.filter((p) => p.productId === productId);
    setSelectedPanier(selected_2[0]);
  }, [products, panier, productId]);

  return (
    <div
      className="new-product-detail-container"
      style={{ backgroundColor: "rgb(233, 236, 241)" }}
    >
      {openCart && (
        <IconContext.Provider value={{ color: "#fff" }}>
          {" "}
          <Panier setOpenCart={setOpenCart} />
        </IconContext.Provider>
      )}
      <Header>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
        <button onClick={() => setOpenCart(true)} className="position-relative">
          <MdOutlineShoppingBag className="button__icon" />
          {numberOfPanier > 0 ? (
            <span
              style={{
                position: "absolute",
                top: "-10%",
                right: "-20%",
                backgroundColor: "rgb(75, 180, 180)",
                color: "white",
                borderRadius: "50%",
                padding: "0.1rem 0.5rem",
                fontSize: "0.8rem",
              }}
            >
              {numberOfPanier}
            </span>
          ) : null}
        </button>
      </Header>
      <div className="d-sm-flex d-block product-detail">
        {!panierLoading && !productsLoading ? (
          <>
            <div className="img-container">
              <img
                style={{ width: "100%" }}
                src={selectedProduct?.imgUrl}
                alt={selectedProduct?.name}
                className="img-fluid"
              />
              <div className="small-image">
                <img
                  style={{ width: "100%" }}
                  src={selectedProduct?.imgUrl}
                  alt={selectedProduct?.name}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="ms-sm-5 px-sm-3 product-text">
              <div className="card">
                <h1 className="card-title">{selectedProduct?.name}</h1>
                <p className="card-prix mb-0">${selectedProduct?.prix}</p>
                <p style={{ fontSize: "0.95rem" }} className="m-0 mb-4">
                  {selectedProduct?.stock > 0
                    ? "Produit disponible"
                    : "Produit non disponible"}
                </p>
                <div className="card-body p-0">
                  <p className="card-text">{selectedProduct?.description}</p>
                </div>
                <div className="footer-card mt-5">
                  {selectedPanier?.quantities > 0 ? (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() =>
                          decrement(
                            selectedPanier,
                            products,
                            setSelectedProduct
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <CgLoadbar className="plus-icon" />{" "}
                      </button>
                      <p className="m-0 align-self-center mx-3 fw-bold">
                        {selectedPanier?.quantities}
                      </p>
                      <button
                        onClick={() => increment(selectedPanier, products)}
                        className="w-50 py-1"
                      >
                        {" "}
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => firstAddToCartDetails(selectedProduct, currentUser.email)}
                      className="w-100 py-1 first-btn"
                    >
                      {" "}
                      {/* <HiOutlinePlusSm className="plus-icon" /> */}
                      Ajouter au panier
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-start w-100">
            <div
              style={{ color: "rgb(75, 180, 180)" }}
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
