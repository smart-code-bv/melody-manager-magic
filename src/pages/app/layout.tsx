import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface AppLayoutProps {
    children?: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = () => {
    const { user, loading, signOut } = useAuth()

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Redirect if not authenticated
    if (!user) {
        return <Navigate to="/" replace />
    }

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* App Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-xl font-semibold">Melody Manager</div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {user.email}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSignOut}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign out
                            </Button>
                        </div>
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
