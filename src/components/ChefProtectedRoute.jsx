import React from 'react'
import { getUserFromToken } from '../api/getUserFromToken'
const ChefProtectedRoute = ({ children }) => {
    const user = getUserFromToken();
    if (!user || user.role?.toLowerCase() !== 'chef') {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ChefProtectedRoute
