import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlinePlusSm } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import "./productList.css";
import logo from '../../assets/img/logo-ecommerce.png'

const ProductList = () => {
  const { products, productsLoading } = useProducts();
  return (
    <div className="px-sm-5 px-3 pt-3">
      <Link
        className="add-product-link mb-3 d-inline-block"
        to="/admin/add-products"
      >
        <HiOutlinePlusSm size={35} />
      </Link>
      {!productsLoading ? (
        products.length !== 0 ? (
          <div className="table-responsive">
            <table style={{ minWidth: "400px" }} className="table mt-3">
            <thead>
                <tr>
                  <th className="th-head">Image</th>
                  <th className="th-head">Name</th>
                  <th className="th-head">Description</th>
                  <th className="th-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img style={{width: '50px'}} src={product.imgUrl ? product.imgUrl : logo} alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>
                      <span className="action-icon">
                        <AiFillEdit /> 
                        {/* onClick={() => handleUpdate(product.id)} */}
                      </span>
                      <span className="action-icon ms-3 d-inline-block">
                        <MdDelete />
                        {/* onClick={() => handleDelete(product.id)}  */}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products</p>
        )
      ) : (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <table className="table"></table>
    </div>
  );
};

export default ProductList;
