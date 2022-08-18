import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
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
        where("userId", "==", currentUser?.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setAuth([...usersInfo]);
        });
      });
    };
    getAuth();
  }, [currentUser?.uid]);
  
  return { auth };
}
