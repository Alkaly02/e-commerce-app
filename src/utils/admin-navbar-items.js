import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi";
import { RiCommandFill } from "react-icons/ri";

export const adminData = [
    {
        to: '',
        label: 'Acceuil',
        icon: <AiOutlineHome />
    },
    {
        to: 'categories',
        label: 'Catégories',
        icon: <AiOutlineAppstoreAdd />
    },
    {
        to: 'products',
        label: 'Produits',
        icon: <GiShoppingCart />
    },
    {
        to: 'commands',
        label: 'Commandes',
        icon: <RiCommandFill />
    },
    {
        to: '/adminShops',
        label: 'Boutiques',
        icon: <HiShoppingBag />
    }
]