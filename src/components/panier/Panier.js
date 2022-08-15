import React from "react";
import usePanier from "../../hooks/usePanier";
import "./Panier.css";
import PanierCard from "./PanierCard";
import NoItems from "../NoItems";
import { usePanierProvider } from "../../hooks/usePanierProvider";
import CartForm from "../cartForm/CartForm";
import { Link } from "react-router-dom";

const Panier = () => {
  const { panier, panierLoading, numberOfPanier } = usePanier();
  const { setOpenCart } = usePanierProvider();

  return (
    <div
      style={{
        width: "100%",
        // minHeight: "100vh",
        backgroundColor: "#EFF2F3",
        paddingTop: "5rem",
      }}
    >
      <div className="panier-container vh-100">
        <div className="mb-0 d-flex justify-content-between p-4">
          <Link
            className="ps-2"
            style={{
              textDecoration: "none",
              color: "#2B3445",
              fontWeight: "600",
            }}
            to="/user"
          >
            &larr; Continuer vos achats
          </Link>
        </div>
        <div className="d-flex">
          <div className="panier-items border-top">
            <div style={{ padding: "0.8rem 2rem" }}>
              <h6 className="fw-bold">Panier</h6>
              <p style={{fontSize: '0.9rem', fontWeight: '600'}} className="">
                {numberOfPanier > 1
                  ? numberOfPanier + " produits dans votre panier"
                  : numberOfPanier + " produit dans votre panier"}
              </p>
            </div>
            <div style={{ padding: "0.8rem 2rem" }}>
              {!panierLoading ? (
                numberOfPanier > 0 ? (
                  panier.map((item) => (
                    <PanierCard
                      setOpenCart={setOpenCart}
                      key={item.id}
                      {...item}
                    />
                  ))
                ) : (
                  <NoItems />
                )
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          <div
            className="right-cart py-4 px-4 rounded-5"
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
                style={{ textDecoration: "none" }}
                className="d-flex justify-content-between submit px-4 rounded-3 mt-4"
                to={"#"}
              >
                <span>$2020</span>
                <span>Vérifier &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
