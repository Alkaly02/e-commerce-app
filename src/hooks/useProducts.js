import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const globalShop = useSelector(state => state.globalShop)
  useEffect(() => {
    const getProducts = async () => {
      // on recupere tous les produits qui appartiennent a une boutique specifique
      if(!globalShop[0]?.id) return
      const q = query(
        collection(db, "products"),
        where("ownedShop", "==", globalShop[0]?.id)
      );
      onSnapshot(q, (querySnapshot) => {
        setNumberOfProducts(querySnapshot.size)
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setProducts([...usersInfo]);
        });
        setProductsLoading(false);
      });
    };
    getProducts();
  }, [globalShop]);

  return { products, productsLoading, numberOfProducts };
};

export default useProducts;
