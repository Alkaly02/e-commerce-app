import { useContext } from "react"
import { panierContext } from "../context/PanierProvider"

export const usePanierProvider = () => {
    return useContext(panierContext);
}