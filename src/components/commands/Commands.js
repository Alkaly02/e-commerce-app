import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useWhereDocs, useDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";

const Commands = () => {
  const { globalShop } = useAuth();
  const shopId = globalShop[0]?.id;
  const { data: commands, numberOfData: numberOfCommands, dataLoading: commandsLoading } = useWhereDocs(db, "panier", "ownedShop", shopId);
  const {data: users} = useDocs(db, 'users')

  return (<div className="px-3 border-2">
    {
        !commandsLoading ? numberOfCommands !== 0 ? commands.map(command => (
            <div className="mb-3 d-flex justify-content-between align-items-center p-3 rounded-2" style={{ backgroundColor: 'rgba(75, 180, 180, .9)', color: 'rgba(255,255,255, 1'}} key={command.id}>
                <div>
                    <img style={{width: '100px', borderRadius: '10px'}} src={command.imgUrl} alt={command.name} />
                    <p className="mt-2 fw-bold">{command.name}</p>
                </div>
                <div>
                    <h2>Commander par : {users.filter(user => user.userId === command.addedBy)[0]?.firstname}</h2>
                    <p style={{fontWeight: '600'}}>Quantités : {command.quantities}</p>
                    <p>Prix de la commande : {command.totalPrix}</p>
                </div>
            </div>
        )) : 'No products' : 'loading...'
    }
  </div>)
};

export default Commands;
