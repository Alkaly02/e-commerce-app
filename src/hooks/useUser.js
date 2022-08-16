import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

export function useUser() {
  const { currentUser } = useAuth();
  const [auth, setAuth] = useState([]);

  useEffect(() => {
    const getAuth = async () => {
      const q = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAuth(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    };
    getAuth();
  }, []);
  
  return { auth };
}
