import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuth } from "../../hooks/useAuth";

const AddCategory = ({ setSuccess, setOpenCategory }) => {
  const [loading, setLoading] = useState(false);
  const {currentUser} = useAuth()
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "categories"), {
      name,
      description: desc,
      userEmail: currentUser.email,
    });
    setLoading(false);
    setSuccess("Category added !");
    setOpenCategory(false);
    setTimeout(() => {
      setSuccess("");
    }, 1500);
  };
  return (
    <div className="my-3">
      <form
        onSubmit={addCategory}
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
            placeholder="Category Name"
          />
        </div>
        <div className="mb-3 mx-4">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="form__input"
            id="exampleInputPassword1"
            placeholder="Description"
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

export default AddCategory;
