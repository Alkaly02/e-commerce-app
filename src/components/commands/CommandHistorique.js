import React from "react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { useWhereDocs } from 'easy-firestore/hooks';

const CommandHistorique = ({
  id,
  isConfirmed,
  beingProcessed,
  beingDelivered,
  isDelivered,
  confirmedAt,
  beingProcessedAt,
  beingDeliveredAt,
  deliveredAt
}) => {
  const globalShop = useSelector((state) => state.globalShop);
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);

  const validateCommand = (id) => {
    const selectedCommand = commands.find(command => command.id === id)
    const isConfirmed = selectedCommand.isConfirmed
    updateDoc(doc(db, 'commands', id), {
      isConfirmed: !isConfirmed
    })
  }

  return (
    <div>
      <ul className="timeline">
        {isConfirmed ? (
          <>
            <li>
              <div className="d-flex align-items-center">
                {isConfirmed ? (
                  <FaRegCheckCircle
                    style={isConfirmed ? { color: "#7cb2c3" } : null}
                    className="timeline__icon"
                  />
                ) : (
                  <FaRegCircle className="timeline__icon" />
                )}
                <span
                  style={isConfirmed ? { color: "#7cb2c3" } : null}
                  className={
                    isConfirmed
                      ? "command-status--active-true ms-3"
                      : "command-status--active-false ms-3"
                  }
                >
                  En cours
                </span>
              </div>
              <span className="timeline-date">{confirmedAt}</span>{" "}
            </li>

            <li>
              <div className="d-flex align-items-center">
                {beingProcessed ? (
                  <FaRegCheckCircle
                    style={beingProcessed ? { color: "#7cb2c3" } : null}
                    className="timeline__icon"
                  />
                ) : (
                  <FaRegCircle className="timeline__icon" />
                )}
                <span
                  style={beingProcessed ? { color: "#7cb2c3" } : null}
                  className={
                    beingProcessed
                      ? "command-status--active-true ms-3"
                      : "command-status--active-false ms-3"
                  }
                >
                  Traité
                </span>{" "}
              </div>
              <span className="timeline-date">{beingProcessedAt ? beingProcessedAt : "En attente"}</span>
            </li>

            <li>
              <div className="d-flex align-items-center">
                {beingDelivered ? (
                  <FaRegCheckCircle
                    style={beingDelivered ? { color: "#7cb2c3" } : null}
                    className="timeline__icon"
                  />
                ) : (
                  <FaRegCircle className="timeline__icon" />
                )}
                <span
                  style={beingDelivered ? { color: "#7cb2c3" } : null}
                  className={
                    beingDelivered
                      ? "command-status--active-true ms-3"
                      : "command-status--active-false ms-3"
                  }
                >
                  En livraison
                </span>{" "}
              </div>
              <span className="timeline-date">{beingDeliveredAt ? beingDeliveredAt : 'En attente'}</span>
            </li>

            <li>
              <div className="d-flex align-items-center">
                {isDelivered ? (
                  <FaRegCheckCircle style={{ color: '#6dbd28' }} className="timeline__icon" />
                ) : (
                  <FaRegCircle className="timeline__icon" />
                )}
                <span className={isDelivered ? "delivered--active-true ms-3" : 'ms-3'}>Livrée</span>{" "}
              </div>
              <span className="timeline-date">{deliveredAt ? deliveredAt : 'En attente'}</span>
            </li>
          </>
        ) : (
          <div>
            <p style={{ width: '90px', fontSize: '0.9rem' }} className="bg-danger px-3 text-light">Annulée</p>
            <button onClick={() => validateCommand(id)} className="btn btn-outline-success">Commander à nouveau</button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CommandHistorique;
