import React from "react";
import { Link } from "react-router-dom";

const CommandCard = ({
  beingProcessed,
  beingDelivered,
  isDelivered,
  numberOfCommand,
  isConfirmed,
  children,
  path
}) => {
  return (
    <section className="card rounded-0 mx-3 px-2 py-5 my-2 position-relative">
      <span
        className="px-2"
        style={{
          position: "absolute",
          top: "5%",
          backgroundColor: !isConfirmed ? '#dc3545' : isDelivered ? '#6dbd28' : "#75757a",
          color: "white",
          fontSize: "0.8rem",
        }}
      >
        {
          isConfirmed && !beingProcessed
            ? "Confirmée"
            : beingProcessed && !beingDelivered
              ? "En cours de traitement"
              : beingDelivered && !isDelivered
                ? "En cours de livraison"
                : isDelivered
                  ? "Livrée"
                  : 'Annulée'
        }
        {/* {isConfirmed ? (isDelivered ? "Livrée" : "Non livrée") : "Annulée"} */}
      </span>
      <div className="d-flex justify-content-between">
        <span
          className="inline-block"
          style={{ fontWeight: "500", fontSize: "1rem" }}
        >
          {numberOfCommand} produits
        </span>
        <div className="d-flex align-items-center">
          {children}
          <Link className="inline-block user-command-details shadow" to={path}>
            Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommandCard;
