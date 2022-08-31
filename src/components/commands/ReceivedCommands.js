import React from 'react'
import CommandCard from './CommandCard';
import { useAuth } from '../../hooks/useAuth';
import { useWhereDocs } from 'easy-firestore/hooks';
import { db } from '../../firebase/config';
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const ReceivedCommands = () => {
  const { currentUser } = useAuth();
    const userId = currentUser?.uid;
    const {
        data: commands,
        numberOfData: numberOfCommands,
        dataLoading: commandsLoading,
    } = useWhereDocs(db, "commands", "commandedBy", userId);

    return (
        <div className="">
            <h1 className="border-bottom commands-h1">Commandes reçues</h1>
            {!commandsLoading ? (
                numberOfCommands !== 0 &&
                    commands?.some((command) => command.isDelivered === true) ? (
                    commands
                        ?.filter((command) => command.isDelivered === true)
                        .map((command) => (
                            <CommandCard
                                key={command.id}
                                {...command}
                                numberOfCommand={command.userCommands.length}
                                path={command.id}
                            >
                            </CommandCard>
                        ))
                ) : (
                    <p className="p-3">Pas encore de reçues</p>
                )
            ) : (
                <p className="p-3">loading...</p>
            )}
        </div>
    );
}

export default ReceivedCommands