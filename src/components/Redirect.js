import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Redirect = () => {
  const { auth } = useUser();
  
    if (auth?.length !== 0) {
      if (auth[0]?.role === "admin") {
        return <Navigate to={"/adminShops"} />;
      }
      if (auth[0]?.role === "user") {
        return <Navigate to={"/redirectUser"} />
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
