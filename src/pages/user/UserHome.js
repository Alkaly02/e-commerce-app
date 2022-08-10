import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { CgLoadbar } from 'react-icons/cg';
import { HiOutlinePlusSm } from 'react-icons/hi';
import ProductCard from '../../components/productCard/ProductCard';
import ProductsContainer from '../../components/productsContainer/ProductsContainer'
import { db } from '../../firebase/config';
import usePanier from '../../hooks/usePanier';
import useProducts from "../../hooks/useProducts";
import AddDoc from '../../utils/functions/AddDoc';

const UserHome = () => {
    const { products, productsLoading } = useProducts();

  const { panier } = usePanier();
  const increment = async (selectedCart) => {
    // get infos about the cart(panier)
    let { id, quantities, productId } = selectedCart[0];

    await updateDoc(doc(db, "panier", id), {
      quantities: ++quantities,
      totalPrix:
        products.filter((p) => p.id === productId)[0]?.prix * quantities,
    });
  };

  const decrement = async (selectedCart) => {
    let { id, quantities, productId } = selectedCart[0];

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
  const firstTimeAddToCart = async (product) => {
    // get all the product data
    const { category, description, id, imgUrl, name, prix } = product;
    await AddDoc("panier", {
      category,
      description,
      productId: id,
      imgUrl,
      name,
      prix,
      quantities: 1,
      totalPrix: prix,
    });
  };
  return (
    <>
      <ProductsContainer
        title="Tous les produits"
        description="Meilleure collection de 2021 pour vous !"
        className="main-content"
      >
        {!productsLoading
          ? products.length !== 0
            ? products.map((product) => (
                <ProductCard key={product.id} {...product}>
                  {panier.filter((p) => p.productId === product.id)[0]
                    ?.quantities > 0 ? (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() =>
                          decrement(
                            panier.filter((p) => p.productId === product.id)
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <CgLoadbar className="plus-icon" />{" "}
                      </button>
                      <p className="m-0 align-self-center mx-3 fw-bold">
                        {
                          panier.filter((p) => p.productId === product.id)[0]
                            ?.quantities
                        }
                      </p>
                      <button
                        onClick={() =>
                          increment(
                            panier.filter((p) => p.productId === product.id)
                          )
                        }
                        className="w-50 py-1"
                      >
                        {" "}
                        <HiOutlinePlusSm className="plus-icon" />{" "}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => firstTimeAddToCart(product)}
                      className="w-100 py-1"
                    >
                      {" "}
                      <HiOutlinePlusSm className="plus-icon" />{" "}
                    </button>
                  )}
                </ProductCard>
              ))
            : "No products"
          : "loading"}
      </ProductsContainer>
    </>
  )
}

export default UserHome