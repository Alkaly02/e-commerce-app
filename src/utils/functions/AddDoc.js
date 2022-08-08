import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function AddDoc(collectionName, data) {
    await addDoc(collection(db, collectionName), data);
}