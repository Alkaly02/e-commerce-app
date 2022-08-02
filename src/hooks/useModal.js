import { useContext } from "react"
import { createModal } from "../context/ModalProvider"

export const useModal = () => {
    return useContext(createModal)
}