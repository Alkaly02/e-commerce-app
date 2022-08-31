import React from "react";
import { useAuth } from "../../hooks/useAuth";
import CommandCard from "./CommandCard";
import { useWhereDocs } from "easy-firestore/hooks";
import { db } from "../../firebase/config";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const CanceledCommands = () => {
    const { currentUser } = useAuth();
    const userId = currentUser?.uid;
    const {
        data: commands,
        numberOfData: numberOfCommands,
        dataLoading: commandsLoading,
    } = useWhereDocs(db, "commands", "commandedBy", userId);

    const validateCommand = (id) => {
        const selectedCommand = commands.find(command => command.id === id)
        const isConfirmed = selectedCommand.isConfirmed
        updateDoc(doc(db, 'commands', id), {
            isConfirmed: !isConfirmed
        })
    }

    return (
        <div className="">
            <h1 className="border-bottom commands-h1">Commandes annulées</h1>
            {!commandsLoading ? (
                numberOfCommands !== 0 &&
                    commands?.some((command) => command.isConfirmed === false) ? (
                    commands
                        ?.filter((command) => command.isConfirmed === false)
                        .map((command) => (
                            <CommandCard
                                key={command.id}
                                {...command}
                                numberOfCommand={command.userCommands.length}
                                path={command.id}
                            >
                                <button
                                    onClick={() => validateCommand(command.id)}
                                    style={{ fontWeight: "600" }}
                                    className="btn btn-outline-success me-2"
                                    type=""
                                >
                                    Commander à nouveau
                                </button>
                            </CommandCard>
                        ))
                ) : (
                    <p className="p-3">Pas encore de commandes annulées</p>
                )
            ) : (
                <p className="p-3">loading...</p>
            )}
        </div>
    );
};

export default CanceledCommands;
