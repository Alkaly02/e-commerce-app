import React from "react";
import { useWhereDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import CommandCard from "./CommandCard";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const UserCommands = () => {
    const { currentUser } = useAuth();
    const userId = currentUser?.uid;
    const {
        data: commands,
        numberOfData: numberOfCommands,
        dataLoading: commandsLoading,
    } = useWhereDocs(db, "commands", "commandedBy", userId);

    const canceledCommand = (id) => {
        const selectedCommand = commands.find(command => command.id === id)
        const isConfirmed = selectedCommand.isConfirmed
        updateDoc(doc(db, 'commands', id), {
            isConfirmed: !isConfirmed,
            beingProcessed: false,
            beingDelivered: false,
            beingProcessedAt: null,
            beingDeliveredAt: null,
            deliveredAt: null
        })
    }

    return (
        <div className="">
            <h1 className="border-bottom commands-h1">Liste de vos commandes</h1>
            {!commandsLoading ? (
                numberOfCommands !== 0 &&
                    commands?.some((command) => command.isConfirmed === true) ? (
                    commands
                        ?.filter((command) => command.isConfirmed === true)
                        .map((command) => (
                            <CommandCard
                                key={command.id}
                                {...command}
                                numberOfCommand={command.userCommands.length}
                                path={command.id}
                            >
                                {
                                    !command.isDelivered && <button
                                        onClick={() => canceledCommand(command.id)}
                                        style={{ fontWeight: "600" }}
                                        className="btn btn-outline-danger me-2"
                                        type=""
                                    >
                                        Annuler
                                    </button>
                                }
                            </CommandCard>
                        ))
                ) : (
                    <p className="p-3">Pas encore de commandes</p>
                )
            ) : (
                <p className="p-3">loading...</p>
            )}
        </div>
    );
};

export default UserCommands;
