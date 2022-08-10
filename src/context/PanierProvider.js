import { createContext, useState } from "react";
import usePanier from "../hooks/usePanier";

export const panierContext = createContext();

export const PanierProvider = ({ children }) => {
    const {panier, numberOfPanier: commandAmount} = usePanier()
    const [openCart, setOpenCart] = useState(false)
    // const [commandAmount, setCommandAmount] = useState(0)
  const value = {
    commandAmount,
    panier,
    openCart,
    setOpenCart
    // setCommandAmount
  };


  return (
    <panierContext.Provider value={value}>{children}</panierContext.Provider>
  );
};
