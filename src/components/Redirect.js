import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase/config";

const Redirect = () => {
  const { currentUser } = useAuth();
  const [auth, setAuth] = useState([]);

  const getAuth = async () => {
    const q = query(
      collection(db, "users"),
      where("email", "==", currentUser.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setAuth(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };
  getAuth();

  if (auth?.length !== 0) {
    if (auth[0]?.role === "admin") {
      return <Navigate to={"/admin"} />;
    }
    if (auth[0]?.role === "user") {
      return <Navigate to={"/user"} />;
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
