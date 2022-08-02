import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

const EditCategory = ({ selectedCategory, setOpenEdit, setSuccess }) => {
  const [name, setName] = useState(selectedCategory[0]?.name);
  const [desc, setDesc] = useState(selectedCategory[0]?.description);
  const [loading, setLoading] = useState(false);
  console.log(selectedCategory[0]?.name);

  const editCategory = async (e) => {
    e.preventDefault();

    // Set the "capital" field of the city 'DC'
    await updateDoc(doc(db, "categories", selectedCategory[0]?.id), {
      name,
      description: desc
    });
    setOpenEdit(false);
    setSuccess('Updated succesfully !')
    setTimeout(() => {
        setSuccess('')
    }, 1500)
  };
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      className="vh-100 w-100 d-flex justify-content-center align-items-center fixed-top"
    >
      <form
        onSubmit={editCategory}
        className="d-flex justify-content-start align-items-center"
      >
        <div className="mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form__input"
            id="name"
            aria-describedby="text"
            // placeholder="Category Name"
          />
        </div>
        <div className="mb-3 mx-4">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="form__input"
            id="exampleInputPassword1"
            // placeholder="Description"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn submit px-5">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
