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
        label: 'Ajouter Categorie',
        icon: <AiOutlineAppstoreAdd />
    },
    {
        to: 'add-products',
        label: 'Ajouter Produis',
        icon: <GiShoppingCart />
    }
]