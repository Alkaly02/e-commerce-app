import React from "react";
import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";

const customStyles = {
  content: {
    maxWidth: "600px",
    padding: '0',
    margin: "auto",
    left: "0",
    right: '0',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)'

const MyModal = ({ children }) => {
  const {modalIsOpen, setIsOpen} = useModal()

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      
      <div
      >
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {children}
        </Modal>
      </div>
    </>
  );
};

export default MyModal;
