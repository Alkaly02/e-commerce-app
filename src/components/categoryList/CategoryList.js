import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditCategory from "../../editCategory/EditCategory";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import AddCategory from "../addCategory/AddCategory";
import "./CategoryList.css";

const CategoryList = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const q = query(
        collection(db, "categories"),
        where("userEmail", "==", currentUser?.email)
      );
      onSnapshot(q, (querySnapshot) => {
        const usersInfo = [];
        querySnapshot.forEach((doc) => {
          usersInfo.push({ ...doc.data(), id: doc.id });
          setCategories([...usersInfo]);
        });
        setLoading(false);
      });
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    setSuccess("Category deleted !");
    await deleteDoc(doc(db, "categories", id));
    setTimeout(() => {
      setSuccess("");
    }, 1500);
  };

  const handleUpdate = (id) => {
    setOpenEdit(true);
    let selected = categories.filter((cat) => cat.id === id);
    setSelectedCategory(selected);
  };

  return (
    <div className="mx-4 pt-3 w-100">
      <button
        style={{ fontWeight: "700" }}
        onClick={() => setOpenCategory((state) => !state)}
        className="btn btn-outline-secondary"
      >
        {" "}
        <HiOutlinePlusSm size={35} /> Add Category
      </button>
      {success && (
        <div className="bg-success text-light text-center px-4 py-2 w-25 mt-2 rounded">
          {success}
        </div>
      )}
      {openCategory && (
        <AddCategory
          setSuccess={setSuccess}
          setOpenCategory={setOpenCategory}
        />
      )}
      {!loading ? (
        categories.length !== 0 ? (
          <div className="table-responsive">
            <table style={{minWidth: '400px'}} className="table mt-3">
              <thead>
                <tr>
                  <th className="th-head">Name</th>
                  <th className="th-head">Description</th>
                  <th className="th-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cate) => (
                  <tr key={cate.id}>
                    <td>{cate.name}</td>
                    <td>{cate.description}</td>
                    <td>
                      <span className="action-icon">
                        <AiFillEdit onClick={() => handleUpdate(cate.id)} />
                      </span>
                      <span className="action-icon ms-3 d-inline-block">
                        <MdDelete onClick={() => handleDelete(cate.id)} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-5 text-center">Pas de categories</p>
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
      {openEdit && (
        <EditCategory
          setOpenEdit={setOpenEdit}
          selectedCategory={selectedCategory}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
};

export default CategoryList;
