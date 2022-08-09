import React, { useState } from "react";
import usePanier from "../../hooks/usePanier";
import "./Panier.css";
import {MdOutlineShoppingBag} from 'react-icons/md'

import useProducts from "../../hooks/useProducts";
import PanierCard from "./PanierCard";
import NoItems from "../NoItems";

const Panier = ({ setOpenCart }) => {
  const { panier, panierLoading, numberOfPanier } = usePanier();
  

  

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: "1000",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="panier-container vh-100">
        <div className="mb-0 d-flex justify-content-between p-4 border-bottom">
          <h6 className="d-flex justify-content-center align-items-center"><span><MdOutlineShoppingBag color="black" size={30} /></span> <span className="ms-2" style={{fontSize: '1.3rem'}}>{numberOfPanier} item</span></h6>
          <button
            style={{ fontSize: "0.9rem" }}
            onClick={() => setOpenCart(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="panier-items">
          {!panierLoading
            ? panier.length !== 0
              ? panier.map((item) => (
                <PanierCard key={item.id} {...item} />
              ))
              : <NoItems />
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Panier;
