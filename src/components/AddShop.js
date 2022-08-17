import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import AddDoc from "../utils/functions/AddDoc";
import FormInput from "./FormInput";

const AddShop = ({setAddShop}) => {
  const { currentUser } = useAuth();
  const shopNameRef = useRef();

  const addShop = async (e) => {
    e.preventDefault();
    

    await AddDoc("shops", {
      shopName: shopNameRef.current.value,
      owner: currentUser.uid,
    });

    toast.success("Création de la boutique réussie !", {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "green",
        },
      });
    setAddShop(false)

    
  };

  return (
    <form onSubmit={addShop} className="mt-3">
      <FormInput
        refInput={shopNameRef}
        placeholder="Ajouter un nouvelle boutique"
      />
      <button
        style={{ border: "none" }}
        type="submit"
        className="submit px-5 mt-3"
      >
        Créer
      </button>
    </form>
  );
};

export default AddShop;
