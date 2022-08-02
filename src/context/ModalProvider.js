import { createContext, useState } from "react"


export const createModal = createContext()

export const ModalProvider = ({children}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    return(
        <createModal.Provider value={{modalIsOpen, setIsOpen}}>
            {children}
        </createModal.Provider>
    )
}
