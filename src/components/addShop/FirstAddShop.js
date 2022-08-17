import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AddDoc from "../../utils/functions/AddDoc";

const AddShop = ({ setIsOpen }) => {
    const {currentUser} = useAuth()
  const inputRef = useRef();
  const navigate = useNavigate()
  const addShop = async (e) => {
    e.preventDefault();
    await AddDoc('shops', {
        shopName: inputRef.current.value,
        owner: currentUser.uid
    })
    setIsOpen(false)
    toast.success("Création de la boutique réussie !", {
        style: {
            backgroundColor: "#2B3445",
            color: "white",
        },
        iconTheme: {
            primary: "green",
        },
    });
    // window.location.reload()
  };
  return (
    <form
      onSubmit={addShop}
      style={{ height: "35vh" }}
      className="p-sm-5 p-2 mt-5 bg-light rounded-3"
    >
      <div className="text-end">
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <label className="form__label mb-2" htmlFor="">
        Nom de votre boutique
      </label>
      <input
        ref={inputRef}
        className="form__input"
        type="text"
        placeholder="myShop"
      />
      <button
        style={{ border: "none" }}
        type="submit"
        className="submit px-5 mt-3 rounded-3 w-100"
      >
        Créer
      </button>
    </form>
  );
};

export default AddShop;
