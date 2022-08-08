import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const usePanier = () => {
  const [panier, setPanier] = useState([]);
  const [panierLoading, setPanierLoading] = useState(true);
  const [numberOfPanier, setNumberOfPanier] = useState(0)
  useEffect(() => {
    const getProducts = async () => {
      onSnapshot(collection(db, "panier"), (querySnapshot) => {
        setNumberOfPanier(querySnapshot.size)
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setPanier([...usersInfo]);
        });
        setPanierLoading(false);
      });
    };
    getProducts();
  }, []);

  return { panier, panierLoading, numberOfPanier };
};

export default usePanier;