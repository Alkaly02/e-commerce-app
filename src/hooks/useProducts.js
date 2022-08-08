import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  useEffect(() => {
    const getProducts = async () => {
      onSnapshot(collection(db, "products"), (querySnapshot) => {
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
  }, []);

  return { products, productsLoading, numberOfProducts };
};

export default useProducts;
