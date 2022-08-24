import React, { useEffect, useState } from "react";
import usePanier from "../../hooks/usePanier";
import "./Panier.css";
import PanierCard from "./PanierCard";
import NoItems from "../NoItems";
import { usePanierProvider } from "../../hooks/usePanierProvider";
import CartForm from "../cartForm/CartForm";
import { Link, useParams } from "react-router-dom";
import PanierCardConnected from "./PanierCardConnected";
import { useDispatch, useSelector } from "react-redux";
import {makeCommandFalse} from '../../redux/slices/commandeSlice'
import AddDoc from "../../utils/functions/AddDoc";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import {useDocs} from 'easy-firestore/hooks'
import { setGlogalShop } from "../../redux/slices/globalShopSlice";

const ConnectedPanier = () => {
  const { panier, panierLoading, numberOfPanier } = usePanier();
  const {data: shops} = useDocs(db, 'shops')
  const { setOpenCart } = usePanierProvider();
  const {shopNameUrl} = useParams()
  const [totalCommand, setTotalCommand] = useState(0)
  const EXPEDITION_PRIX = 20
  const globalShop = useSelector((state) => state.globalShop);
  
  const dispatch = useDispatch()

  useEffect(() => {
    // prix total d'une commande
    let totalCommand = panier.reduce((total, item) => {
      return total + Number(item.totalPrix) 
    }, 0)
    // get the globalShop
    let selectedShop = shops.filter(
      (shop) => shop.shopName.toLowerCase() === shopNameUrl.toLocaleLowerCase()
    )[0];
    // if(selectedShop) console.log(selectedShop);
    
    if (selectedShop) {
      dispatch(setGlogalShop(selectedShop));
    }
    setTotalCommand(totalCommand)
    dispatch(makeCommandFalse())
  }, [panier, shops])

  const addToCommand = (panier) => {
    let userId = panier[0].addedBy
    let ownedShop = panier[0].ownedShop
    let commandItems = panier.map(command => {
      return {
        commandProductId: command.productId,
        commandQuantities: command.quantities,
        commandTotalPrix: command.totalPrix
      }
    })
    AddDoc('commands', {
        commandOwnedShop: ownedShop,
        commandedBy: userId,
        userCommands: commandItems 
      })
      panier.forEach(async (cart) => await deleteDoc(doc(db, "panier", cart.id)))
    toast.success("Produits commandés !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "green",
      },
    });
    // console.log(command, totalCommand);
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#EFF2F3",
        paddingTop: "5rem",
      }}
    >
      <div style={{minHeight: '80vh'}} className="panier-container">
        <div className="mb-0 d-flex justify-content-between p-4">
          <Link
            className="ps-2"
            style={{
              textDecoration: "none",
              color: "#2B3445",
              fontWeight: "600",
            }}
            to={`/user/${shopNameUrl}`}
          >
            &larr; Continuer vos achats
          </Link>
        </div>
        <div className="d-lg-flex justify-content-between px-lg-4 px-3">
          <div className="panier-items border-top">
            <div>
              <h6 className="fw-bold">Panier</h6>
              <p style={{fontSize: '0.9rem', fontWeight: '600'}} className="">
                {numberOfPanier > 1
                  ? numberOfPanier + " produits dans votre panier"
                  : numberOfPanier + " produit dans votre panier"}
              </p>
            </div>
            <div>
              {!panierLoading ? (
                numberOfPanier > 0 ? (
                  panier.map((item) => (
                    <PanierCardConnected
                      setOpenCart={setOpenCart}
                      key={item.id}
                      {...item}
                    />
                  ))
                ) : (
                  <NoItems />
                )
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          <div
            className="right-cart py-4 px-4 rounded-5 ms-lg-4"
            style={{ backgroundColor: "#565CBA" }}
          >
            <h6 className="mb-3">Details du panier</h6>
            <CartForm />
            <div className="border-top py-3">
              <p className="d-flex justify-content-between">
                <span className="fs-6">Total</span>{" "}
                <span className="fw-bold">{totalCommand}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="fs-6">Expedition</span>{" "}
                <span className="fw-bold">$20</span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="fs-6">Total TTC</span>{" "}
                <span className="fw-bold">${totalCommand + EXPEDITION_PRIX}</span>
              </p>
              <button
              disabled={panierLoading}
              onClick={() => addToCommand(panier)}
                style={{ textDecoration: "none", border: 'none' }}
                className="d-flex justify-content-between submit px-4 rounded-3 mt-4 w-100"
              >
                <span>${totalCommand + EXPEDITION_PRIX}</span>
                <span>Passer la commande &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedPanier;