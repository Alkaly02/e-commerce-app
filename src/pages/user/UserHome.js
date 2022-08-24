import React from "react";
import { CgLoadbar } from "react-icons/cg";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProductCard from "../../components/productCard/ProductCard";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import usePanier from "../../hooks/usePanier";
import decrementProduct from "../../utils/functions/decrementProduct";
import increment from "../../utils/functions/increment";
import firstAddToCartDetails from "../../utils/functions/firstAddToCartDetails";
import { useAuth } from "../../hooks/useAuth";
import {useWhereDocs} from 'easy-firestore/hooks'
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

const UserHome = () => {
  const {currentUser} = useAuth()
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id
  const {data: products, numberOfData: numberOfProducts, dataLoading: productsLoading} = useWhereDocs(db, 'products', 'ownedShop', shopId)
  const { panier } = usePanier();

  return (
    <>
      <ProductsContainer
        title="Tous les produits"
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {!productsLoading
          ? numberOfProducts !== 0
            ? products.map((product) => (
                <ProductCard key={product.id} {...product}>
                  {panier.filter((p) => p.productId === product.id)[0]
                    ?.quantities > 0 ? (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() =>
                          decrementProduct(
                            panier.filter((p) => p.productId === product.id)[0],
                            products
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <CgLoadbar className="plus-icon" />{" "}
                      </button>
                      <p className="m-0 align-self-center mx-3 fw-bold">
                        {
                          panier.filter((p) => p.productId === product.id)[0]
                            ?.quantities
                        }
                      </p>
                      <button
                        onClick={() =>
                          increment(
                            panier.filter((p) => p.productId === product.id)[0],
                            products
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => firstAddToCartDetails(product, currentUser.uid, globalShop[0].id)}
                      className="w-100 py-1"
                    >
                      {" "}
                      <HiOutlinePlusSm className="plus-icon" />{" "}
                    </button>
                  )}
                </ProductCard>
              ))
            : "No products"
          : "loading"}
      </ProductsContainer>
    </>
  );
};

export default UserHome;
