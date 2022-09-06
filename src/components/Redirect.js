import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import errorMsg from '../utils/functions/errorMsg';

const Redirect = () => {
  const { auth } = useUser();
  const navigateUser = useNavigate()
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id;

  if (auth?.length !== 0) {
    if (auth[0]?.role === "admin") {
      return <Navigate to={"/adminShops"} />;
    }
    if (auth[0]?.role === "user") {
      // on verifie si l'utilisateur s'est inscrit sur ce site
      if (auth[0]?.ownedShop !== shopId) {
        errorMsg("Désolé, vous n'avez pas accès à cette boutique")
        return navigateUser(-1)
      }
      return <Navigate to={"/redirectUser"} />;
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
