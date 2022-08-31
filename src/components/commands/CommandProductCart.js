import React from "react";

const CommandProductCart = (
  {imgUrl,
  name,
  commandQuantities,
  commandTotalPrix}
) => {
  return (
    <div className="d-flex justify-content-between panier-items-details py-3 px-sm-4 px-2 align-items-center">
      <img
        style={{
          width: "70px",
          maxHeight: "76px",
          objectFit: "contain",
        }}
        src={imgUrl}
        alt={name}
        className="m-0 rounded-4"
      />
      <h6>{name}</h6>
      <div className="middle">
        <div className="ms-3">
          <p className="m-0 detail-text my-1">Quantité : {commandQuantities}</p>
        </div>
      </div>
      <div className="panier-details d-flex align-items-center"></div>
      {/* prix total du produit */}
      <p className="m-0 detail-prix">${commandTotalPrix}</p>
      <div className="align-content-icon"></div>
    </div>
  );
};

export default CommandProductCart;
