import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import "./productList.css";
import logo from "../../assets/img/logo-ecommerce.png";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useModal } from "../../hooks/useModal";
import EditProduct from "../editProduct/EditProduct";
import MyModal from "../modal/Modal";
import useCategories from "../../hooks/useCategories";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import { useAuth } from "../../hooks/useAuth";

const ProductList = () => {
  const { products, productsLoading,numberOfProducts } = useProducts();
  const { modalIsOpen, setIsOpen } = useModal();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { categories } = useCategories();
  const {globalShop} = useAuth()

  const handleDelete = async (id) => {
    toast.error("Produit supprimé !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "red",
      },
    });
    await deleteDoc(doc(db, "products", id));
  };
  const handleUpdate = (id) => {
    setIsOpen(true);
    let selected = products.filter((product) => product.id === id);
    setSelectedProduct(selected);
  };
  return (
    <div className="px-4">
      <Link
        className="add-product-link mb-3 d-inline-block"
        to={`/admin/${globalShop[0]?.shopName.toLowerCase()}/add-products`}
      >
        <HiOutlinePlusSm size={35} />
      </Link>
      {!productsLoading ? (
        numberOfProducts !== 0 ? (
          <div style={{paddingBottom: '8rem'}} className="table-responsive">
            <table style={{ minWidth: "400px" }} className="table mt-3 table-hover">
              <thead>
                <tr>
                  <th className="th-head">Image</th>
                  <th className="th-head">Nom</th>
                  <th className="th-head">Catégorie</th>
                  <th className="th-head">Stock</th>
                  <th className="th-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        style={{ width: "80px", height: '55px', objectFit: 'cover' }}
                        src={product.imgUrl ? product.imgUrl : logo}
                        alt={product.name}
                      />
                    </td>
                    <td>{firstLetterUpperCase(product.name)}</td>
                    {/* showing the name of the category instead of the id */}
                    <td>
                      {
                        firstLetterUpperCase(categories.filter(
                          (category) => category.id === product.categoryId
                        )[0]?.categoryName)
                      }
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        onClick={() => handleUpdate(product.id)}
                        className="action-icon"
                      >
                        <AiFillEdit />
                      </span>
                      <span
                        onClick={() => handleDelete(product.id)}
                        className="action-icon ms-3 d-inline-block"
                      >
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products</p>
        )
      ) : (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {modalIsOpen && (
        <MyModal>
          <EditProduct
            selectedProduct={selectedProduct}
            setIsOpen={setIsOpen}
          />
        </MyModal>
      )}
    </div>
  );
};

export default ProductList;
