import React from "react";
import emptyCart from "../assets/img/shopping-bag.svg";

const NoItems = () => {
  return (
    <div className="px-4 py-5 text-center mt-5">
      <img
        className="mt-5"
        style={{ width: "30%" }}
        src={emptyCart}
        alt="Empty cart"
      />
      <p className="detail-text mt-3 fs-6">Votre panier est vide !</p>
    </div>
  );
};

export default NoItems;
