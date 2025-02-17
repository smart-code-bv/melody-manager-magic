import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth()

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Redirect to sign in if not authenticated
    if (!user) {
        return <Navigate to="/auth/sign-in" replace />
    }

    // Render protected content
    return <>{children}</>
}

export default ProtectedRoute
