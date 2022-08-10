import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function increment(selectedCart, products) {
    // get infos about the cart(panier)
    let { id, quantities, productId } = selectedCart;

    await updateDoc(doc(db, "panier", id), {
      quantities: ++quantities,
      totalPrix:
        products.filter((p) => p.id === productId)[0]?.prix * quantities,
    });
  };