import React from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useProducts from "../../hooks/useProducts";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import increment from "../../utils/functions/increment";
import decrementProduct from "../../utils/functions/decrementProduct";

const PanierCardConnected = (item, { setOpenCart }) => {
  const { products } = useProducts();

  const deleteCart = async (id) => {
    await deleteDoc(doc(db, "panier", id));
  };

  return (
    <>
      <div className="d-flex justify-content-between panier-items-details py-3 px-lg-4 px-2 align-items-center">
        <img
          style={{ width: "70px", maxHeight: "76px", objectFit: "contain" }}
          src={item.imgUrl}
          alt={item.name}
          className="ms-lg-3 rounded-4"
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
              {item.prix} * {item.quantities} F CFA
            </p>
          </div>
        </div>
        <div className="panier-details d-flex align-items-center">
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
        <p className="m-0 detail-prix">{item.totalPrix} F CFA</p>
        <div className="align-content-icon">
          <RiDeleteBin6Line
          style={{cursor: 'pointer'}}
            onClick={() => deleteCart(item.id)}
            color="#DD2424"
            size={30}
          />
        </div>
      </div>
    </>
  );
};

export default PanierCardConnected;