import { collection, getDocs, query, where } from "firebase/firestore";
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
        where("owner", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setShops(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      setShopLoading(false)
    };
    getShops();
  }, []);
  
  return { shops, shopLoading };
}
