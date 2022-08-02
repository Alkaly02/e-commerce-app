import React from "react";
import Card from "../../components/adminCard/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {RiStore2Line} from 'react-icons/ri'

const AdminHome = () => {
  return (
    <div className="mx-4 pt-3 w-100">
      <div className="welcome">
        <h1 style={{ fontWeight: "700" }} className="text-left mb-4 home-title">
          Gerer Votre Boutique Avec Faciliter
        </h1>
      </div>
      <div className="d-flex justify-content-start">
        <Card title="Categories" number="15" icon={<AiOutlineInfoCircle />} />
        <Card title="Produits" number="20" icon={<RiStore2Line />} />
      </div>
    </div>
  );
};

export default AdminHome;
