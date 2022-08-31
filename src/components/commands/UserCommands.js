import React from 'react'
import { useWhereDocs } from 'easy-firestore/hooks';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import CommandCard from './CommandCard';

const UserCommands = () => {
    const { currentUser } = useAuth()
    const userId = currentUser?.uid
    const { data: commands, numberOfData: numberOfCommands, dataLoading: commandsLoading } = useWhereDocs(db, 'commands', 'commandedBy', userId)
    return (
        <div className=''>
            <h1 className='border-bottom commands-h1'>Liste de vos commandes</h1>
            {
                !commandsLoading ? numberOfCommands !== 0 && commands?.filter(command => command.isConfirmed === true).length !== 0 ? commands?.filter(command => command.isConfirmed === true).map(command => (
                    <CommandCard key={command.id} {...command} numberOfCommand={command.userCommands.length}>
                        <button style={{ fontWeight: '600' }} className='btn btn-outline-danger me-2' type="">Annuler la commande</button>
                    </CommandCard>
                )) : <p className='p-3'>Pas encore  de commandes</p> : <p className='p-3'>loading...</p>
            }
        </div>
    )
}

export default UserCommands