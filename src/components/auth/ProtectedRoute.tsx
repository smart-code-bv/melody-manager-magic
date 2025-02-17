import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { session, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        // TODO: Add proper loading state
        return <div>Loading...</div>
    }

    if (!session) {
        // Redirect to home page, but save the attempted URL
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
