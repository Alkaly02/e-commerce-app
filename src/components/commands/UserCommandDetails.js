import React from "react";
import { useParams } from "react-router-dom";
import { useWhereDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import CommandProductCart from "./CommandProductCart";
import CommandHistorique from "./CommandHistorique";

const UserCommandDetails = () => {
  const { details } = useParams();
  const globalShop = useSelector((state) => state.globalShop);
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
    numberOfData: numberOfCommands,
    dataLoading: commandsLoading,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);
  const { data: products } = useWhereDocs(db, "products", "ownedShop", shopId);

  return (
    <div style={{ marginBottom: "10rem" }}>
      <h1 className="border-bottom commands-h1">Détails de la commande</h1>
      <div>
        {!commandsLoading ? (
          numberOfCommands !== 0 &&
          commands.filter((command) => command.id === details).length !== 0 ? (
            commands
              .filter((command) => command.id === details)
              .map((command) => {
                const commandproducts = command.userCommands.map(
                  (userCommand) => {
                    return {
                      isStockAvailable: command.isStockAvailable,
                      isDelivered: command.isDelivered,
                      isConfirmed: command.isConfirmed,

                      commandQuantities: userCommand.commandQuantities,
                      commandTotalPrix: userCommand.commandTotalPrix,
                      ...products.find(
                        (product) => product.id === userCommand.commandProductId
                      ),
                    };
                  }
                );

                const totalCommandPrix = command.userCommands.reduce(
                  (total, item) => {
                    return total + Number(item.commandTotalPrix);
                  },
                  0
                );
                
                return (
                  <div key={command.id} className="p-3 py-4">
                    <div className="d-lg-flex">
                      <div
                        style={{ flexBasis: "400px" }}
                        className="command-process pb-5"
                      >
                        <h6 style={{ fontSize: "0.7rem", fontWeight: "600" }}>
                          HISTORIQUE DE LA COMMANDE
                        </h6>
                        <CommandHistorique
                          {...command}
                        />
                      </div>
                      <div style={{ flexGrow: 1 }} className="">
                        {commandproducts.map((product) => (
                          <CommandProductCart key={product.id} {...product} />
                        ))}
                        <div className="d-flex justify-content-end mt-3">
                          <h5>
                            Total de la commande :{" "}
                            <span className="fw-bold fs-4">
                              {totalCommandPrix} F CFA
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <p className="p-3">Commande vide</p>
          )
        ) : (
          <p className="p-3">loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserCommandDetails;
