import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

export function useShops() {
  const { currentUser } = useAuth();
  const [shops, setShops] = useState([]);
  const [shopLoading, setShopLoading] = useState(true)
  const [numberOfShops, setNumberOfShops] = useState(0)

  const userId = currentUser?.uid;
  
  useEffect(() => {
    const getShops = async () => {
      if(!userId) return
      const q = query(
        collection(db, "shops"),
        where("owner", "==", userId)
      );
      onSnapshot(q, (querySnapshot) => {
        setNumberOfShops(querySnapshot.size)
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setShops([...usersInfo]);
        });
        setShopLoading(false);
      });
    };
    getShops();
  }, [userId]);
  
  return { shops, shopLoading, numberOfShops };
}
