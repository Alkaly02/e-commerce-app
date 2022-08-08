import React from "react";
import Card from "../../components/adminCard/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {RiStore2Line} from 'react-icons/ri'
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";

const AdminHome = () => {
  const {numberOfCategories} = useCategories()
  const {numberOfProducts} = useProducts()
  return (
    <div className="mx-4 pt-3 w-100">
      <div className="welcome">
        <h1 style={{ fontWeight: "700" }} className="text-left mb-4 home-title">
          Gérer votre boutique avec faciliter
        </h1>
      </div>
      <div className="d-flex justify-content-start">
        <Card title="Catégories" number={numberOfCategories} icon={<AiOutlineInfoCircle />} />
        <Card title="Produits" number={numberOfProducts} icon={<RiStore2Line />} />
      </div>
    </div>
  );
};

export default AdminHome;
