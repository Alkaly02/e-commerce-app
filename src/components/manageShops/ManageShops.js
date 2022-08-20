import React, { useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useShops } from "../../hooks/useShops";
import firstLetterUpperCase from "../../utils/functions/firstLetterUpperCase";
import AddBtn from "../AddBtn";
import AddShop from "../AddShop";
import AllShops from "../AllShops";
import ShopCard from "../shopCard/ShopCard";
import Title1 from "../Title1";
import "./manageShops.css";

const ManageShops = () => {
  const [addShop, setAddShop] = useState(false);
  const { shops, shopLoading } = useShops();
  return (
    <div className="manage-shops shop-container">
      <div className="mt-5">
        <Title1>Accéder et gérer vos boutiques</Title1>
      </div>
      <div className="mb-3 w-50">
        <AddBtn onClick={() => setAddShop((state) => !state)} />
        {addShop && <AddShop setAddShop={setAddShop} />}
      </div>
      <AllShops>
        {!shopLoading ? (
          shops.map((shop, index) => (
            <Link style={{textDecoration: 'none'}} to={`/admin/${shop.shopName.toLowerCase()}`}>
              <ShopCard
                key={`${shop.shopName}-${index}`}
                icon={<GiShoppingBag />}
                shopName={firstLetterUpperCase(shop.shopName)}
              />
            </Link>
          ))
        ) : (
          <p>loading...</p>
        )}
      </AllShops>
    </div>
  );
};

export default ManageShops;
