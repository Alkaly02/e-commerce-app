import { Navigate } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';

const isRoute = (items, id) => {
    const isIdInItems = items.some(item => item.shopName.toLowerCase() === id.toLowerCase())
        return <Navigate to={'/'} />
}

export default isRoute