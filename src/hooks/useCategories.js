import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [numberOfCategories, setNumberOfCategories] = useState(0)
  const {globalShop} = useAuth()
  useEffect(() => {
    const getCategories = async () => {
      if(!globalShop[0]?.id) return
      // on recupere toute les categories d'une boutique specifique
      const q = query(
        collection(db, "categories"),
        where("ownedShop", "==", globalShop[0]?.id)
      );
      onSnapshot(q, (querySnapshot) => {
        setNumberOfCategories(querySnapshot.size)
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setCategories([...usersInfo]);
        });
        setCategoriesLoading(false);
      });
    };
    getCategories();
  }, [globalShop]);

  return { categories, categoriesLoading, numberOfCategories };
};

export default useCategories;
