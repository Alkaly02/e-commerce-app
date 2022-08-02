import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVa8stKDsy0FC8jaMOXOMlcBkgmEao4RY",
  authDomain: "e-commerce-app-cacd3.firebaseapp.com",
  projectId: "e-commerce-app-cacd3",
  storageBucket: "e-commerce-app-cacd3.appspot.com",
  messagingSenderId: "412281334965",
  appId: "1:412281334965:web:99bc2940579dd66b6d62fc"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);