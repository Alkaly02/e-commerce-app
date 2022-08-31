import React from "react";
import Card from "../../components/adminCard/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiStore2Line } from 'react-icons/ri'
import Title1 from "../../components/Title1";
import { db } from "../../firebase/config";
import { useWhereDocs } from 'easy-firestore/hooks'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id
  const { numberOfData: numberOfProducts } = useWhereDocs(db, 'products', 'ownedShop', shopId)
  const { numberOfData: numberOfCategories } = useWhereDocs(db, 'categories', 'ownedShop', shopId)

  return (
    <div className="px-4">
      <div className="welcome">
        <Title1>Gérer votre boutique avec facilité</Title1>
      </div>
      <div className="d-sm-flex justify-content-start">
        <Link style={{textDecoration: 'none', display: 'block', flexBasis: "300px"}} to="categories" className="me-sm-3" >
          <Card title="Catégories" number={numberOfCategories} icon={<AiOutlineInfoCircle />} />
        </Link>
        <Link style={{textDecoration: 'none', display: 'block', flexBasis: '300px'}} to="products" className="me-sm-3">
          <Card title="Produits" number={numberOfProducts} icon={<RiStore2Line />} />
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
