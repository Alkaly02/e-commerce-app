import React from "react";
import Modal from "react-modal";
import { useModal } from "../../hooks/useModal";
import "./modal.css";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    // maxWidth: '600px',
    // width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    padding: "0",
    margin: "auto"
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const MyModal = ({ children }) => {
  const { modalIsOpen, setIsOpen } = useModal();

  function closeModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
          closeTimeoutMS={1000}
        >
          {children}
        </Modal>
      </div>
    </>
  );
};

export default MyModal;
