import React from "react";
import shopSvg from "../../assets/shopSvg.svg";
import { useModal } from "../../hooks/useModal";
import AddShop from "../addShop/FirstAddShop";
import MyModal from "../modal/Modal";
import "./noShop.css";

const NoShop = ({children, title, onlyOpenInAdmin}) => {
  const { modalIsOpen, setIsOpen } = useModal();
  return (
    <div className="no-shop">
      <div className="d-md-flex align-items-center shop-container">
        <div className="left">
          <h1 style={{ fontSize: "3.5rem" }}>
            Créer votre site{" "}
            <span
              className="d-block"
              style={{ fontWeight: 700, color: "#F9F871" }}
            >
              {title}
            </span>
          </h1>
          {
            children
          }
        </div>
        <div className="text-center mt-5 right">
          <img src={shopSvg} alt="" />
        </div>
        {modalIsOpen && onlyOpenInAdmin && (
          <MyModal>
            <AddShop setIsOpen={setIsOpen} />
          </MyModal>
        )}
      </div>
    </div>
  );
};

export default NoShop;
