import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function decrementProduct (selectedCart, products) {
    let { id, quantities, productId } = selectedCart;

    if (quantities > 1) {
      return await updateDoc(doc(db, "panier", id), {
        quantities: --quantities,
        totalPrix:
          products.filter((p) => p.id === productId)[0]?.prix * quantities,
      });
    }
    // updating the ui before deleting the last item
    await updateDoc(doc(db, "panier", id), {
      quantities: --quantities,
      totalPrix: products.filter((p) => p.id === productId)[0]?.prix,
    });
    await deleteDoc(doc(db, "panier", id));
  };