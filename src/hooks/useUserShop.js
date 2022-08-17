import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

export function useUserShop() {
  const { currentUser } = useAuth();
  const [shops, setShops] = useState([]);
  const [shopLoading, setShopLoading] = useState(true)
  const {globalShop} = useAuth()

  useEffect(() => {
    const getShops = async () => {
      if(!globalShop[0]?.id) return
      const q = query(
        collection(db, "shops"),
        where("ownedShop", "==", globalShop[0]?.id)
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
  }, [globalShop]);
  
  return { shops, shopLoading };
}
