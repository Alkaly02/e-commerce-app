import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import AddDoc from "../utils/functions/AddDoc";

const RedirectUser = () => {
  const { auth } = useUser();
  const { currentUser } = useAuth();
  const userId = currentUser?.uid
  const globalShop = useSelector(state => state.globalShop)
  const shopName = globalShop[0]?.shopName.toLowerCase();
  const fromCommand = useSelector((state) => state.command.fromCommand);
  const cart = useSelector((state) => state.cart);
  const connectedCart = useSelector(state => state.globalCart)

  if (auth?.length !== 0) {
    if (cart.length !== 0) {
      // use some instead of filter
      const userProductsInCart = connectedCart.some(cartItem => cartItem.addedBy === userId)
      // verifier si on a deja des produits dans le panier connecté
      if (userProductsInCart) {
        let goodCart = [...cart]
        // on recupere les produits qui ne sont pas dans le panier connecté
        cart.forEach((cartItem) => {
          connectedCart.forEach(async (cart) => {
            if (cart.productId === cartItem.productId) {
              goodCart = goodCart.filter(item => item.productId !== cartItem.productId)
            }
          })
        });

        goodCart.length !== 0 && goodCart.forEach(async (product) => {
          await AddDoc("panier", { addedBy: userId, ...product });
        })
      }
      else {
        cart.forEach(async (cartItem) => {
          await AddDoc("panier", { addedBy: userId, ...cartItem });
        });
      }

    }

    let navigate = fromCommand ? (
      <Navigate to={`/user/${shopName}/panier`} />
    ) : (
      <Navigate to={`/user/${shopName}`} />
    );

    return navigate;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default RedirectUser;