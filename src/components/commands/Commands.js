import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useWhereDocs, useDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { GiEyeOfHorus, GiEyeTarget } from "react-icons/gi";
import { useSelector } from "react-redux";

const Commands = () => {
  const globalShop = useSelector(state => state.globalShop)
  const shopId = globalShop[0]?.id;
  const {
    data: commands,
    numberOfData: numberOfCommands,
    dataLoading: commandsLoading,
  } = useWhereDocs(db, "commands", "commandOwnedShop", shopId);
  const { data: users } = useDocs(db, "users");

  useEffect(() => {}, [commands]);

  return (
    <div className="px-3 border-2">
      {!commandsLoading ? (
        numberOfCommands !== 0 ? (
          <div style={{ paddingBottom: "8rem" }} className="table-responsive">
            <table
              style={{ minWidth: "400px" }}
              className="table mt-3 table-hover"
            >
              <thead>
                <tr>
                  <th className="th-head">Nom</th>
                  <th className="th-head">Prenom</th>
                  <th className="th-head">Email</th>
                  <th className="th-head">Telephone</th>
                  <th className="th-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((command) => {
                  return users
                    .filter((user) => user.userId === command.commandedBy)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>mouas@gmail.com</td>
                        <td>789956598</td>
                        <td><Link style={{color: '#2B3445', fontSize: '1.2rem'}} to={`${command.id}`}><GiEyeTarget /></Link></td>
                      </tr>
                    ));
                })}
              </tbody>
            </table>
          </div>
        ) : (
          "No products"
        )
      ) : (
        "loading..."
      )}
      {/* {
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
    } */}
    </div>
  );
};

export default Commands;
