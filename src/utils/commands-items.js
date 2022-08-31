import { MdOutlineFreeCancellation } from "react-icons/md";
import { RiCommandLine, RiFolderReceivedLine } from "react-icons/ri";


export const commandsData = [
    {
        to: '',
        label: 'Commandes',
        icon: <RiCommandLine />
    },
    {
        to: 'delivered',
        label: 'Reçues',
        icon: <RiFolderReceivedLine />
    },
    {
        to: 'canceled',
        label: 'Annulées',
        icon: <MdOutlineFreeCancellation />
    }
]