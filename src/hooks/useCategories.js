import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [numberOfCategories, setNumberOfCategories] = useState(0)
  useEffect(() => {
    const getCategories = async () => {
      onSnapshot(collection(db, "categories"), (querySnapshot) => {
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
  }, []);

  return { categories, categoriesLoading, numberOfCategories };
};

export default useCategories;
