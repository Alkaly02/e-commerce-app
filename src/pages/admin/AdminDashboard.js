import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import ManageShops from "../../components/manageShops/ManageShops";
import NoShop from "../../components/noShop/NoShop";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import {useWhereDocs} from 'easy-firestore/hooks'
import { useDispatch } from "react-redux";
import { deleteGlobalShop } from "../../redux/slices/globalShopSlice";
import { useUser } from '../../hooks/useUser';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const {currentUser} = useAuth()
  const shopId = currentUser?.uid
  const {numberOfData: numberOfShops, dataLoading: shopLoading} = useWhereDocs(db, 'shops', 'owner', shopId)
  const navigate = useNavigate();
  const { setIsOpen } = useModal();
  const dispatch = useDispatch()
  const {auth} = useUser()

  if(currentUser){
    if(auth[0]?.role !== 'admin'){
      return navigate(-1);
    }
  }
  if(!currentUser){
    return <Navigate to={`/`} />
  }

  const Logout = async () => {
    try {
      await logout();
      navigate("/");
      dispatch(deleteGlobalShop())

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
          <NoShop onlyOpenInAdmin={true} title="site E-commerce">
            <button onClick={() => setIsOpen(true)} className="px-5 mt-3 py-3">
            Créer
          </button>
          </NoShop>
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
      {/* {modalIsOpen && (
          <MyModal>
            <AddShop setIsOpen={setIsOpen} />
          </MyModal>
        )} */}
    </>
  );
};

export default AdminDashboard;
