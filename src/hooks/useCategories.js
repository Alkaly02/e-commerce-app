import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";
// import { useCurrentUser } from "./useCurrentUser";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const {currentUser} = useAuth()
//   const { auth } = useCurrentUser();
//   let userId = auth[0]?.id;
  useEffect(() => {
    const getCategories = async () => {
      const q = query(
        collection(db, "categories"),
        where("userId", "==", currentUser?.email)
      );
      onSnapshot(q, (querySnapshot) => {
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
