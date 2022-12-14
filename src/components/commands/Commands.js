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

  useEffect(() => { }, [commands]);

  return (
    <div className="px-3 border-2">
      <h6 className="mt-3">Liste des commandes</h6>
      {!commandsLoading ? (
        numberOfCommands !== 0 && commands.some(command => command.isConfirmed === true ) ? (
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
                {commands.filter(command => command.isConfirmed === true ).map((command) => {
                  return users
                    .filter((user) => user.userId === command.commandedBy)
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="position-relative"><Link style={{textDecoration: 'none', color: '#2B3445'}} className="stretched-link" to={`${command.id}`}>{user.lastname}</Link></td>
                        <td className="position-relative"><Link style={{textDecoration: 'none', color: '#2B3445'}} className="stretched-link" to={`${command.id}`}>{user.firstname}</Link></td>
                        <td className="position-relative"><Link style={{textDecoration: 'none', color: '#2B3445'}} className="stretched-link" to={`${command.id}`}>mouas@gmail.com</Link></td>
                        <td className="position-relative"><Link style={{textDecoration: 'none', color: '#2B3445'}} className="stretched-link" to={`${command.id}`}>789956598</Link></td>
                        <td><Link style={{ color: '#2B3445', fontSize: '1.2rem' }} to={`${command.id}`}><GiEyeTarget /></Link></td>
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
                    <p style={{fontWeight: '600'}}>Quantit??s : {command.quantities}</p>
                    <p>Prix de la commande : {command.totalPrix}</p>
                </div>
            </div>
        )) : 'No products' : 'loading...'
    } */}
    </div>
  );
};

export default Commands;
