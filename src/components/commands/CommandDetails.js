import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useWhereDocs } from "easy-firestore/hooks";

const CommandDetails = () => {
  const { commandDetailUrl } = useParams();
  const { globalShop } = useAuth();
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
    numberOfData: numberOfCommands,
    dataLoading: commandsLoading,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);
  const { data: products } = useWhereDocs(db, "products", "ownedShop", shopId);

  return (
    <div className="px-4">
      <h1 className="m-0 mb-4">Détails de la commande</h1>
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
                    <div key={product.id} className="d-flex justify-content-between panier-items-details py-3 px-4 align-items-center">
                      <img
                        style={{
                          width: "70px",
                          maxHeight: "76px",
                          objectFit: "contain",
                        }}
                        src={product.imgUrl}
                        alt={product.name}
                        className="ms-3 rounded-4"
                      />
                      <h6>{product.name}</h6>
                      <div className="middle">
                        <div className="ms-3">
                          <p className="m-0 detail-text my-1 fs-6">
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
                  <div className="d-flex justify-content-between mt-3">
                  <h5>Total de commande : <span className="fw-bold fs-4">${totalCommandPrix}</span></h5>
                  <button type="" className="submit" style={{border: 'none'}}>Valider la commande</button>
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
