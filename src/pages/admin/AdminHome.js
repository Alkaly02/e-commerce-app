import React from "react";
import Card from "../../components/adminCard/Card";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {RiStore2Line} from 'react-icons/ri'
import Title1 from "../../components/Title1";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase/config";
import {useWhereDocs} from 'easy-firestore/hooks'

const AdminHome = () => {
  const {globalShop} = useAuth()
  const shopId = globalShop[0]?.id
  
  const {numberOfData: numberOfProducts} = useWhereDocs(db, 'products', 'ownedShop', shopId)
  const {numberOfData: numberOfCategories} = useWhereDocs(db, 'categories', 'ownedShop', shopId)
 
  return (
    <div className="px-4">
      <div className="welcome">
        <Title1>Gérer votre boutique avec facilité</Title1>
      </div>
      <div className="d-sm-flex justify-content-start">
        <Card title="Catégories" number={numberOfCategories} icon={<AiOutlineInfoCircle />} />
        <Card title="Produits" number={numberOfProducts} icon={<RiStore2Line />} />
      </div>
    </div>
  );
};

export default AdminHome;
