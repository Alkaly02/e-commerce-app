import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useDocs } from 'easy-firestore/hooks';
import { useParams } from 'react-router-dom';
import usePanier from '../../hooks/usePanier';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGlobalShop, setGlogalShop } from '../../redux/slices/globalShopSlice';
import { resetGlobalCart } from '../../redux/slices/globalCartSlice';
import { useEffect } from 'react';
import { deleteCart } from '../../redux/slices/cartSlice';
import { Navigate } from 'react-router-dom';
import Header from '../header/Header';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import SidebarMob from '../sidebar/SidebarMob';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { commandsData } from '../../utils/commands-items';
import UserCommands from './UserCommands';
import ReceivedCommands from './ReceivedCommands';
import CanceledCommands from './CanceledCommands';
import { CgShoppingCart } from 'react-icons/cg';

const UserComandsPage = () => {
  const { logout, currentUser } = useAuth();
  const { data: shops } = useDocs(db, "shops");
  const { shopNameUrl } = useParams();
  const { numberOfPanier } = usePanier();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    try {
      await logout();
      navigate(`/${shopNameUrl}`);
      dispatch(deleteGlobalShop());
      dispatch(resetGlobalCart())
    } catch (err) {
      alert(err.code);
    }
  };

  useEffect(() => {
    let selectedShop = shops.filter(
      (shop) => shop.shopName.toLowerCase() === shopNameUrl.toLocaleLowerCase()
    )[0];
    if (selectedShop) {
      dispatch(setGlogalShop(selectedShop));
    }
    dispatch(deleteCart());
  }, [shopNameUrl, shops]);

  if (!currentUser) {
    return <Navigate to={`/${shopNameUrl}`} />;
  }
  return (
    <>
      <Header title={shopNameUrl}>
        <button>AB</button>
        <button onClick={Logout}>
          <AiOutlineLogout className="button__icon" />
        </button>
        <Link to={`/user/${shopNameUrl}/panier`} className="position-relative">
          <MdOutlineShoppingBag className="button__icon" />
          {numberOfPanier > 0 ? (
            <span
              style={{
                position: "absolute",
                top: "-10%",
                right: "-20%",
                backgroundColor: "rgb(75, 180, 180)",
                color: "white",
                borderRadius: "50%",
                padding: "0.1rem 0.5rem",
                fontSize: "0.8rem",
              }}
            >
              {numberOfPanier}
            </span>
          ) : null}
        </Link>
      </Header>
      <div className="home-grid container-site">
        <Sidebar
          title={"Commandes"}
          className="sidebar-containt"
          links={[...commandsData, {
            to: `/user/${shopNameUrl}`,
            label: 'Boutique',
            icon: <CgShoppingCart />
        }]}
          bgColor="#fff"
          activeColor="rgb(75, 180, 180)"
          color="#2B3445"
          isAdmin={false}
        />
        <SidebarMob
          bgColor="#fff"
          activeColor="rgb(75, 180, 180)"
          color="#2B3445"
          isAdmin={false}
          links={[...commandsData, {
            to: `/user/${shopNameUrl}`,
            label: 'Boutique',
            icon: <CgShoppingCart />
        }]}
        />
        <div className="w-100">
          <div className='user-commands-container shadow'>
            <Routes>
              <Route path="" element={<UserCommands />} />
              <Route path=":command-details" element={<p>COMMANDS DETAILS</p>} />
              <Route path="delivered" element={<ReceivedCommands />} />
              <Route path="canceled" element={<CanceledCommands />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserComandsPage