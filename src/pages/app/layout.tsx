import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface AppLayoutProps {
    children?: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = () => {
    // TODO: Add authentication check
    const isAuthenticated = false

    if (!isAuthenticated) {
        // For now, redirect to home page if not authenticated
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen bg-background">
            {/* App Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-xl font-semibold">Melody Manager</div>
                        {/* Navigation will go here */}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout
