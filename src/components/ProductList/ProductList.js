import React from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Link } from "react-router-dom";
import './productList.css'

const ProductList = () => {
  return (
    <div  className='px-sm-5 px-3 pt-3'>
      <Link className="add-product-link mb-3 d-inline-block" to="/admin/add-products">
        <HiOutlinePlusSm size={35} />
      </Link>
      <p>Liste de produits</p>
    </div>
  );
};

export default ProductList;
