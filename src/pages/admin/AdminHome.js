import React from "react";
import Card from "../../components/adminCard/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {RiStore2Line} from 'react-icons/ri'
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import Title1 from "../../components/Title1";

const AdminHome = () => {
  const {numberOfCategories} = useCategories()
  const {numberOfProducts} = useProducts()
 
  return (
    <div className="px-4">
      <div className="welcome">
        <Title1>Gérer votre boutique avec faciliter</Title1>
      </div>
      <div className="d-sm-flex justify-content-start">
        <Card title="Catégories" number={numberOfCategories} icon={<AiOutlineInfoCircle />} />
        <Card title="Produits" number={numberOfProducts} icon={<RiStore2Line />} />
      </div>
    </div>
  );
};

export default AdminHome;
