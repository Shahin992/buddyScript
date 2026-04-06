import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface RouteGuardProps {
    children?: React.ReactNode;
}

/**
 * GuestRoute: Prevent authenticated users from accessing login/register.
 */
export const GuestRoute: React.FC<RouteGuardProps> = ({ children }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    if (isAuthenticated) {
        return <Navigate to="/feed" replace />
    }

    return children ? <>{children}</> : <Outlet />
}

/**
 * PrivateRoute: Prevent unauthenticated users from accessing protected pages.
 */
export const PrivateRoute: React.FC<RouteGuardProps> = ({ children }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? <>{children}</> : <Outlet />
}
