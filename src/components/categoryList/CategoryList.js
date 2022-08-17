import {
  deleteDoc,
  doc
} from "firebase/firestore";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import EditCategory from "../editCategory/EditCategory";
import { db } from "../../firebase/config";
import AddCategory from "../addCategory/AddCategory";
import "./CategoryList.css";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/useModal";
import MyModal from "../modal/Modal";
import useCategories from "../../hooks/useCategories";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import AddBtn from "../AddBtn";
import { useAuth } from "../../hooks/useAuth";

const CategoryList = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { modalIsOpen, setIsOpen } = useModal();
  const {globalShop} = useAuth()

  const { categories, categoriesLoading, numberOfCategories } = useCategories()

  const handleDelete = async (id) => {
    toast.error("Catégorie supprimée !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "red",
      },
    });
    await deleteDoc(doc(db, "categories", id));
  };

  const handleUpdate = (id) => {
    setIsOpen(true);
    let selected = categories.filter((cat) => cat.id === id);
    setSelectedCategory(selected);
  };

  return (
    <div className="px-4">
      <AddBtn onClick={() => setOpenCategory((state) => !state)} />
      {openCategory && <AddCategory setOpenCategory={setOpenCategory} />}
      {!categoriesLoading ? (
        numberOfCategories !== 0 ? (
          <div style={{ paddingBottom: '10rem' }} className="table-responsive">
            <table style={{ minWidth: "400px" }} className="table mt-3 table-hover">
              <thead>
                <tr>
                  <th className="th-head">Name</th>
                  <th className="th-head">Description</th>
                  <th className="th-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* display only categories of a specific shop */}
                {categories?.filter(category => category.ownedShop === globalShop[0]?.id).map((cate) => (
                  <tr key={cate.id}>
                    <td>{firstLetterUpperCase(cate.categoryName)}</td>
                    <td>{cate.description}</td>
                    <td>
                      <span onClick={() => handleUpdate(cate.id)} className="action-icon">
                        <AiFillEdit />
                      </span>
                      <span onClick={() => handleDelete(cate.id)} className="action-icon ms-3 d-inline-block">
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-5 text-center">Pas de catégories</p>
        )
      ) : (
        <div className="text-center pt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {modalIsOpen && (
        <MyModal>
          <EditCategory
            setIsOpen={setIsOpen}
            selectedCategory={selectedCategory}
          />
        </MyModal>
      )}
    </div>
  );
};

export default CategoryList;
