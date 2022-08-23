import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import AddDoc from "../utils/functions/AddDoc";
import {useDocs} from 'easy-firestore/hooks'
import { db } from "../firebase/config";

const Redirect = () => {
  const { auth } = useUser();
  const { globalShop, currentUser } = useAuth();
  const shopName = globalShop[0]?.shopName.toLowerCase();
  const fromCommand = useSelector((state) => state.command.fromCommand);
  const cart = useSelector((state) => state.cart);
  const {data: panier} = useDocs(db, 'panier')

  if (auth?.length !== 0) {
    if (auth[0]?.role === "admin") {
      return <Navigate to={"/adminShops"} />;
    }
    if (auth[0]?.role === "user") {
      if (cart.length !== 0) {
        console.log(cart);
        (async function () {
          cart.forEach(async (c) => {
            await AddDoc("panier", { addedBy: currentUser?.uid, ...c });
            console.log("panier");
          });
        })();
      }
      let navigate = fromCommand ? (
        <Navigate to={`/user/${shopName}/panier`} />
      ) : (
        <Navigate to={`/user/${shopName}`} />
      );
      return navigate;
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Redirect;
