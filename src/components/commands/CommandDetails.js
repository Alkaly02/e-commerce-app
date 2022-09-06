import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useWhereDocs } from "easy-firestore/hooks";
import { useSelector } from "react-redux";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import successMsg from "../../utils/functions/successMsg";
import CommandProductCart from "./CommandProductCart";

const CommandDetails = () => {
  const { commandDetailUrl } = useParams();
  const globalShop = useSelector((state) => state.globalShop);
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
    numberOfData: numberOfCommands,
    dataLoading: commandsLoading,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);
  const { data: products } = useWhereDocs(db, "products", "ownedShop", shopId);
  const navigate = useNavigate();
  const date = new Date()

  const validCommand = (id) => {
    const selectedCommand = commands.find((command) => command.id === id);
    const isConfirmed = selectedCommand.isConfirmed;
    updateDoc(doc(db, "commands", id), {
      isConfirmed: !isConfirmed,
    });
    successMsg("Commande confirmée");
  };

  const cancelCommand = (id) => {
    const selectedCommand = commands.find((command) => command.id === id);
    const isConfirmed = selectedCommand.isConfirmed;
    updateDoc(doc(db, "commands", id), {
      isConfirmed: !isConfirmed,
      beingProcessed: false,
      beingDelivered: false,
      beingProcessedAt: null,
      beingDeliveredAt: null,
      deliveredAt: null
    });
    successMsg("Commande annulée");
    navigate("/admin/hijab/commands");
  };

  const beingProcessed = (id) => {
    let beingProcessedAt = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    const selectedCommand = commands.find((command) => command.id === id);
    const beingProcessed = selectedCommand.beingProcessed;
    updateDoc(doc(db, "commands", id), {
      beingProcessed: !beingProcessed,
      beingProcessedAt,
    });
  };

  const beingDelivered = (id) => {
    let beingDeliveredAt = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    const selectedCommand = commands.find((command) => command.id === id);
    const beingDelivered = selectedCommand.beingDelivered;
    updateDoc(doc(db, "commands", id), {
      beingDelivered: !beingDelivered,
      beingDeliveredAt,
    });
  };

  const delivered = (id) => {
    let deliveredAt = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    const selectedCommand = commands.find((command) => command.id === id);
    const isDelivered = selectedCommand.isDelivered;
    updateDoc(doc(db, "commands", id), {
      isDelivered: !isDelivered,
      deliveredAt,
    });
  };

  return (
    <div className="px-4">
      {/* {console.log(commands.filter(command => command.id === commandDetailUrl))} */}
      {!commandsLoading ? (
        numberOfCommands !== 0 ? (
          commands
            .filter((command) => command.isConfirmed === true)
            .filter((command) => command.id === commandDetailUrl)
            .map((command) => {
              const commandproducts = command.userCommands.map((command) => {
                return {
                  isStockAvailable: command.isStockAvailable,
                  isDelivered: command.isDelivered,
                  isConfirmed: command.isConfirmed,
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

              const isConfirmed = command.isConfirmed;

              return (
                <div key={command.id} className="pb-5 mb-5">
                  <div className="d-sm-flex justify-content-between align-items-center mb-5">
                    <h1 className="m-0 headline-1 position-relative">
                      Détails de la commande{" "}
                      <span
                        className="text-center"
                        style={{
                          fontSize: "0.8rem",
                          border: "none",
                          padding: "0.2rem",
                          position: "absolute",
                          top: "-10%",
                          marginLeft: "8px",
                          backgroundColor: "#6dbd28",
                          color: "white",
                          minWidth: '100px'
                        }}
                      >
                        {isConfirmed && !command.beingProcessed
                          ? "Confirmée"
                          : command.beingProcessed && !command.beingDelivered
                            ? "En cours de traitement"
                            : command.beingDelivered && !command.isDelivered
                              ? "En cours de livraison"
                              : command.isDelivered
                                ? "Livrée"
                                : null}
                      </span>
                    </h1>
                    <div className="d-flex mt-3 mt-sm-0">
                      {
                        !command.isDelivered && <button
                          onClick={() => cancelCommand(command.id)}
                          type=""
                          className="submit annuler-commande bg-danger"
                          style={{ border: "none" }}
                        >
                          Annuler la commande
                        </button>
                      }
                    </div>
                  </div>
                  {commandproducts.map((product) => (
                    <CommandProductCart key={product.id} {...product} />
                  ))}
                  <div className="d-sm-flex justify-content-between mt-3">
                    <div className="mb-3 mb-sm-0">
                      <button
                        onClick={() => beingProcessed(command.id)}
                        disabled={command.beingProcessed}
                        className="btn btn-outline-secondary"
                      >
                        Traiter
                      </button>
                      {command.beingProcessed && (
                        <button
                          onClick={() => beingDelivered(command.id)}
                          disabled={command.beingDelivered}
                          className="btn btn-outline-info mx-2"
                        >
                          En livraison
                        </button>
                      )}

                      {command.beingProcessed && command.beingDelivered ? (
                        <button
                          onClick={() => delivered(command.id)}
                          disabled={command.isDelivered}
                          className="btn btn-outline-success"
                        >
                          Livrée
                        </button>
                      ) : null}
                    </div>
                    <h5>
                      Total de la commande :{" "}
                      <span className="fw-bold fs-4">{totalCommandPrix} F CFA</span>
                    </h5>
                  </div>
                </div>
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
