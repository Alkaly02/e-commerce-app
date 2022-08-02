import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../assets/img/logo-ecommerce.png";
import { collection, getDocs, query, where } from "firebase/firestore";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth)

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <authContext.Provider value={value}>
      {loading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
          <div className="text-center d-flex flex-column align-items-center">
            <img src={logo} alt="Ecomerce Logo" className="logo-loading mb-2" />
            <div
              style={{ width: "65px", height: "65px" }}
              className="spinner-border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </authContext.Provider>
  );
};
