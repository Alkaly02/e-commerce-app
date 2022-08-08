import React from "react";
import usePanier from "../../hooks/usePanier";
import useProducts from "../../hooks/useProducts";
import "./panier.css";

const Panier = () => {
  const { panier } = usePanier();
  const { products } = useProducts();
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: "1000",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "30%",
          position: "absolute",
          right: "0",
          backgroundColor: "white",
        }}
        className="panier vh-100"
      >
        {panier.length !== 0
          ? panier
              ?.map((p) => {
                let productsInCart = products.filter(
                  (p) => p.id === p.productId
                );
                console.log(productsInCart);
                return productsInCart[0];
              })
              .map((product) => <p key={product?.id}>{product?.name}</p>)
          : "0 Item"}
      </div>
    </div>
  );
};

export default Panier;
