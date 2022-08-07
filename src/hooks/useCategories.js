import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      onSnapshot(collection(db, "categories"), (querySnapshot) => {
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setCategories([...usersInfo]);
        });
        setCategoriesLoading(false);
      });
    };
    getCategories();
  }, []);

  return { categories, categoriesLoading };
};

export default useCategories;
