import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";

const EditCategory = ({ selectedCategory, setIsOpen }) => {
  const [name, setName] = useState(selectedCategory[0]?.name);
  const [desc, setDesc] = useState(selectedCategory[0]?.description);
  const [loading, setLoading] = useState(false);
  console.log(selectedCategory[0]?.name);

  const editCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Set the "capital" field of the city 'DC'
    await updateDoc(doc(db, "categories", selectedCategory[0]?.id), {
      name,
      description: desc,
    });
    toast.success("Catégorie mise a jour !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "green",
      },
    });
    setLoading(false);
    setIsOpen(false);
  };
  return (
    <div
      // style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      className="w-100 bg-white p-5 rounded"
    >
      <div className="modal-header mb-4">
        <h5 className="modal-title fs-5">Mettre à jour la catégorie</h5>
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <form onSubmit={editCategory} className="">
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
        <div className="mb-3">
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
          <button type="submit" className="btn submit px-5 w-100">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Mettre à jour"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
