import React from "react";
import usePanier from "../../hooks/usePanier";
import "./Panier.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import PanierCard from "./PanierCard";
import NoItems from "../NoItems";
import { usePanierProvider } from "../../hooks/usePanierProvider";

const Panier = () => {
  const { panier, panierLoading, numberOfPanier } = usePanier();
  const { setOpenCart } = usePanierProvider();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#EFF2F3",
        paddingTop: "5rem",
      }}
    >
      <div className="panier-container vh-100">
        <div className="mb-0 d-flex justify-content-between p-4">
          <h6 className="d-flex justify-content-center align-items-center">
            <span>
              <MdOutlineShoppingBag color="black" size={30} />
            </span>{" "}
            <span className="ms-2" style={{ fontSize: "1.3rem" }}>
              {numberOfPanier > 1
                ? numberOfPanier + " produits dans votre panier"
                : numberOfPanier + " produit dans votre panier"}
            </span>
          </h6>
        </div>
        <div className="d-flex">
          <div className="panier-items border-top">
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
          <div style={{width: '300px', height: '500px', backgroundColor: '#565CBA'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
