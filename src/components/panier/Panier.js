import React from "react";
import usePanier from "../../hooks/usePanier";
import "./Panier.css";
import PanierCard from "./PanierCard";
import NoItems from "../NoItems";
import { usePanierProvider } from "../../hooks/usePanierProvider";
import CartForm from "../cartForm/CartForm";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isCommand } from "../../redux/slices/commandeSlice";

const Panier = () => {
  // const { panier, panierLoading, numberOfPanier } = usePanier();
  const { setOpenCart } = usePanierProvider();
  const { shopNameUrl } = useParams();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "120vh",
        backgroundColor: "#EFF2F3",
        paddingTop: "5rem",
      }}
    >
      <div style={{minHeight: '80vh'}} className="panier-container pb-5">
        <div className="mb-0 d-flex justify-content-between p-4">
          <Link
            className="ps-2"
            style={{
              textDecoration: "none",
              color: "#2B3445",
              fontWeight: "600",
            }}
            to={`/${shopNameUrl}`}
          >
            &larr; Continuer vos achats
          </Link>
        </div>
        <div className="d-lg-flex justify-content-between px-lg-4 px-3">
          <div className="panier-items border-top">
            <div style={{ padding: "0.8rem 0.5rem" }}>
              <h6 className="fw-bold">Panier</h6>
              <p style={{ fontSize: "0.9rem", fontWeight: "600" }} className="">
                {cart.length > 1
                  ? cart.length + " produits dans votre panier"
                  : cart.length + " produit dans votre panier"}
              </p>
            </div>
            <div style={{ padding: "0.8rem 0" }}>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <PanierCard setOpenCart={setOpenCart} key={index} {...item} />
                ))
              ) : (
                <NoItems />
              )}
            </div>
          </div>
          <div
            className="right-cart py-4 px-4 rounded-5 ms-lg-4"
            style={{ backgroundColor: "#565CBA" }}
          >
            <h6 className="mb-3">Details du panier</h6>
            <CartForm />
            <div className="border-top py-3">
              <p className="d-flex justify-content-between">
                <span className="fs-6">Total</span>{" "}
                <span className="fw-bold">$2000</span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="fs-6">Expedition</span>{" "}
                <span className="fw-bold">$20</span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="fs-6">Total TTC</span>{" "}
                <span className="fw-bold">$2020</span>
              </p>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                className="d-flex justify-content-between submit px-4 rounded-3 mt-4"
                to={`/${shopNameUrl}/login`}
                onClick={() => dispatch(isCommand())}
              >
                <span>$2020</span>
                <span>Valider &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
