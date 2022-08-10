import React from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useProducts from "../../hooks/useProducts";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const PanierCard = (item, { setOpenCart }) => {
  const { products } = useProducts();

  const increment = async (selectedCart) => {
    // get infos about the cart(panier)
    let { id, quantities, productId } = selectedCart;

    await updateDoc(doc(db, "panier", id), {
      quantities: ++quantities,
      totalPrix:
        products.filter((p) => p.id === productId)[0]?.prix * quantities,
    });
  };

  const decrement = async (selectedCart) => {
    let { id, quantities, productId } = selectedCart;

    if (quantities > 1) {
      return await updateDoc(doc(db, "panier", id), {
        quantities: --quantities,
        totalPrix:
          products.filter((p) => p.id === productId)[0]?.prix * quantities,
      });
    }

    // updating the ui before de leting the last item
    await updateDoc(doc(db, "panier", id), {
      quantities: --quantities,
      totalPrix: products.filter((p) => p.id === productId)[0]?.prix,
    });
    await deleteDoc(doc(db, "panier", id));
  };

  const deleteCart = async (id) => {
    await deleteDoc(doc(db, "panier", id));
  };

  return (
    <>
      <div className="d-flex panier-items-details py-3 px-4 align-items-center">
        <div className="panier-details d-flex flex-column justify-content-center align-items-center">
          <button onClick={() => increment(item)}>
            <HiOutlinePlusSm className="plus-icon" />{" "}
          </button>
          <span style={{ fontWeight: "600", margin: "0.2rem 0" }}>
            {item.quantities}
          </span>
          <button
            disabled={item.quantities === 1 ? true : false}
            onClick={() => decrement(item)}
            className={item.quantities === 1 ? "disabled" : null}
          >
            <HiOutlineMinusSm
              className={
                item.quantities === 1 ? "plus-icon-disabled" : "plus-icon"
              }
            />{" "}
          </button>
        </div>
        <img
          style={{ width: "70px", maxHeight: "76px", objectFit: "contain" }}
          src={item.imgUrl}
          alt={item.name}
          className="ms-3"
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
            <p className="m-0 detail-prix">${item.totalPrix}</p>
          </div>
        </div>
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
