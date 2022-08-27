import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useWhereDocs } from "easy-firestore/hooks";
import { useSelector } from "react-redux";

const CommandDetails = () => {
  const { commandDetailUrl } = useParams();
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
    numberOfData: numberOfCommands,
    dataLoading: commandsLoading,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);
  const { data: products } = useWhereDocs(db, "products", "ownedShop", shopId);

  return (
    <div className="px-4">
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
      <h1 className="m-0 headline-1">Détails de la commande</h1>
      <div className="d-flex mt-3 mt-sm-0">
        <button type="" className="submit me-3" style={{border: 'none'}}>Valider la commande</button>
        <button type="" className="submit annuler-commande bg-danger" style={{border: 'none'}}>Annuler la commande</button>
      </div>
      </div>
      {/* {console.log(commands.filter(command => command.id === commandDetailUrl))} */}
      {!commandsLoading ? (
        numberOfCommands !== 0 ? (
          commands
            .filter((command) => command.id === commandDetailUrl)
            .map((command) => {
              const commandproducts = command.userCommands.map((command) => {
                return {
                  commandQuantities: command.commandQuantities,
                  commandTotalPrix: command.commandTotalPrix,
                  ...products.find(
                    (product) => product.id === command.commandProductId
                  ),
                };
              });

              const totalCommandPrix = command.userCommands.reduce(
                (total, item) => {
                  return total + Number(item.commandTotalPrix);
                },
                0
              );

              return (
                <>
                  {commandproducts.map((product) => (
                    <div key={product.id} className="d-flex justify-content-between panier-items-details py-3 px-sm-4 px-2 align-items-center">
                      <img
                        style={{
                          width: "70px",
                          maxHeight: "76px",
                          objectFit: "contain",
                        }}
                        src={product.imgUrl}
                        alt={product.name}
                        className="m-0 rounded-4"
                      />
                      <h6>{product.name}</h6>
                      <div className="middle">
                        <div className="ms-3">
                          <p className="m-0 detail-text my-1">
                            Quantité : {product.commandQuantities}
                          </p>
                        </div>
                      </div>
                      <div className="panier-details d-flex align-items-center"></div>
                      {/* prix total du produit */}
                      <p className="m-0 detail-prix">
                        ${product.commandTotalPrix}
                      </p>
                      <div className="align-content-icon"></div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end mt-3">
                  <h5>Total de la commande : <span className="fw-bold fs-4">${totalCommandPrix}</span></h5>
                  </div>
                </>
              );
            })
        ) : (
          <p>No products</p>
        )
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default CommandDetails;
