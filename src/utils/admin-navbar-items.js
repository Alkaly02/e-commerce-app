import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

export const adminData = [
    {
        to: '',
        label: 'Acceuil',
        icon: <AiOutlineHome />
    },
    {
        to: 'add-category',
        label: 'Catégories',
        icon: <AiOutlineAppstoreAdd />
    },
    {
        to: 'products',
        label: 'Produits',
        icon: <GiShoppingCart />
    }
]