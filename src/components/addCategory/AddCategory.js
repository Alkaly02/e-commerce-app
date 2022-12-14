import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import AddDoc from "../../utils/functions/AddDoc";

const AddCategory = ({ setSuccess, setOpenCategory }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const globalShop = useSelector(state => state.globalShop)
  
  const addCategory = async (e) => {
    e.preventDefault();

    setLoading(true);
    toast.success("Catégorie ajoutée !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "green",
      },
    });
    await AddDoc('categories', {
      categoryName: name,
      description: desc,
      ownedShop: globalShop[0].id
    })
    setLoading(false);
    setOpenCategory(false);
  };

  return (
    <div className="my-3">
      <form
        onSubmit={addCategory}
        className="d-sm-flex justify-content-start align-items-center"
      >
        <div className="mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form__input"
            id="name"
            aria-describedby="text"
            placeholder="Nom de la catégorie"
          />
        </div>
        <div className="mb-3 mx-sm-4">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="form__input"
            id="exampleInputPassword1"
            placeholder="Description"
          />
        </div>
        {/* <div  className="mb-3">
          <select className="form__input w-100">
            {
              shops.map(shop => (
                <option>{shop.shopName}</option>
              ))
            }
          </select>
        </div> */}
        <div className="mb-3">
          <button disabled={loading} type="submit" className="btn w-100 submit px-5">
            {loading ? (
              <div className="text-center">
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="spinner-border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Ajouter"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
