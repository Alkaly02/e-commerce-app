import React from "react";
import shopSvg from '../../assets/shopSvg.svg'
import { useModal } from "../../hooks/useModal";
import AddShop from "../addShop/FirstAddShop";
import MyModal from "../modal/Modal";
import './noShop.css'

const NoShop = () => {
  const {modalIsOpen, setIsOpen} = useModal()
  return (
    <div className="d-md-flex align-items-center shop-container no-shop">
      <div className="left">
        <h1 style={{fontSize: '3.5rem'}}>Créer votre <span className="d-block" style={{fontWeight: 700, color: 'rgb(75, 180, 180)'}}>site E-commerce</span></h1>
        <button onClick={() => setIsOpen(true)} className="px-5 mt-3 py-2">Créer</button>
      </div>
      <div className="text-center mt-5 right">
        <img src={shopSvg} alt="" />
      </div>
      {
        modalIsOpen && <MyModal><AddShop setIsOpen={setIsOpen} /></MyModal>
      }
    </div>
  );
};

export default NoShop;
