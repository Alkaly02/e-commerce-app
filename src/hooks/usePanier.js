import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const usePanier = () => {
  const [panier, setPanier] = useState([]);
  const [panierLoading, setPanierLoading] = useState(true);
  const [numberOfPanier, setNumberOfPanier] = useState(0);
  const { currentUser } = useAuth();
  const globalShop = useSelector((state) => state.globalShop);

  let userId = currentUser?.uid;
  let shopId = globalShop[0]?.id;
  useEffect(() => {
    const getPanier = async () => {
      if (!userId) return;
      const q = query(collection(db, "panier"), where("addedBy", "==", userId));

      onSnapshot(q, (querySnapshot) => {
        setNumberOfPanier(querySnapshot.size);
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setPanier([...usersInfo]);
        });
        setPanierLoading(false);
      });
    };
    getPanier();
  }, [userId, globalShop, shopId]);

  return { panier, panierLoading, numberOfPanier, setNumberOfPanier };
};

export default usePanier;
