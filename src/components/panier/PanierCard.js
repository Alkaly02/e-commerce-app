import React from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useProducts from "../../hooks/useProducts";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import increment from "../../utils/functions/increment";
import decrementProduct from "../../utils/functions/decrementProduct";

const PanierCard = (item, { setOpenCart }) => {
  const { products } = useProducts();

  const deleteCart = async (id) => {
    await deleteDoc(doc(db, "panier", id));
  };

  return (
    <>
      <div className="d-flex panier-items-details py-3 px-4 align-items-center">
        <img
          style={{ width: "70px", maxHeight: "76px", objectFit: "contain" }}
          src={item.imgUrl}
          alt={item.name}
          className="ms-3 rounded-4"
        />
        <div className="middle">
          <div className="ms-3">
            <Link
              onClick={() => setOpenCart(false)}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/product/${item.productId}`}
            >
              <h6 className="m-0 detail-title">{item.name}</h6>
            </Link>
            <p className="m-0 detail-text my-1">
              ${item.prix} * {item.quantities}
            </p>
          </div>
        </div>
        <div className="panier-details d-flex align-items-center mx-5">
          <button onClick={() => increment(item, products)}>
            <HiOutlinePlusSm className="plus-icon" />{" "}
          </button>
          <span className="border px-2" style={{ fontWeight: "600", margin: "0.2rem 0" }}>
            {item.quantities}
          </span>
          <button
            disabled={item.quantities === 1 ? true : false}
            onClick={() => decrementProduct(item, products)}
            className={item.quantities === 1 ? "disabled" : null}
          >
            <HiOutlineMinusSm
              className={
                item.quantities === 1 ? "plus-icon-disabled" : "plus-icon"
              }
            />{" "}
          </button>
        </div>
        {/* prix total du produit */}
        <p className="m-0 mx-2 detail-prix">${item.totalPrix}</p>
        <div className="align-content-icon">
          <IoIosCloseCircleOutline
            onClick={() => deleteCart(item.id)}
            color="#2B3445"
            size={30}
          />
        </div>
      </div>
    </>
  );
};

export default PanierCard;
