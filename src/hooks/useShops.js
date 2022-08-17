import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

export function useShops() {
  const { currentUser } = useAuth();
  const [shops, setShops] = useState([]);
  const [shopLoading, setShopLoading] = useState(true)

  useEffect(() => {
    const getShops = async () => {
      const q = query(
        collection(db, "shops"),
        where("owner", "==", currentUser?.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        // setNumberOfProducts(querySnapshot.size)
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setShops([...usersInfo]);
        });
        setShopLoading(false);
      });
    };
    getShops();
  }, []);
  
  return { shops, shopLoading };
}
