import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi";

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
        to: '/adminShops',
        label: 'Boutiques',
        icon: <HiShoppingBag />
    }
]