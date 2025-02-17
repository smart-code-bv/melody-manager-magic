import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const SignIn: FC = () => {
    const navigate = useNavigate()
    const { signIn, error } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await signIn(email, password)
            // After successful sign-in, navigate to app
            navigate('/app')
        } catch (error) {
            console.error('Sign in error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        Don't have an account?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                            onClick={() => navigate('/auth/sign-up')}
                        >
                            Sign up
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
