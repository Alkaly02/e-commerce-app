import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import ManageShops from "../../components/manageShops/ManageShops";
import NoShop from "../../components/noShop/NoShop";
import { useAuth } from "../../hooks/useAuth";
import { useShops } from "../../hooks/useShops";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {shopLoading, numberOfShops } = useShops();

  const Logout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <>
      <Header>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
      </Header>
      {!shopLoading ? (
        numberOfShops !== 0 ? (
          <ManageShops />
        ) : (
          <NoShop />
        )
      ) : (
        <div style={{ padding: "10rem" }} className="text-center">
          <div
            style={{
              width: "30px",
              height: "30px",
              color: "rgb(75, 180, 180)",
            }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
