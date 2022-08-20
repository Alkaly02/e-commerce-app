import React from "react";
import { useModal } from "../../hooks/useModal";
import Header from "../../components/header/Header";
import LoginModal from "../../components/loginModal/LoginModal";
import NoShop from "../../components/noShop/NoShop";

const Welcome = () => {
    const {modalIsOpen, setIsOpen} = useModal()
  return (
    <div>
      <Header>
        <h2>Bienvenue</h2>
      </Header>
      <NoShop onlyOpenInAdmin={false} title="à partir de Zéro">
        <button onClick={() => setIsOpen(true)} className="px-5 mt-3 py-3">Créer</button>
      </NoShop>
      {
        modalIsOpen && <LoginModal title="Veuillez vous connecter pour créer votre site" />
      }
    </div>
  );
};

export default Welcome;
