import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
    session: Session | null
    user: User | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    loading: boolean
    error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state change:', event, session)
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            setError(null)
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (signInError) throw signInError
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            throw error
        }
    }

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            setError(null)
            console.log('Starting sign up process...')
            const { error: signUpError, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            })

            if (signUpError) {
                console.error('Sign up error:', signUpError)
                throw signUpError
            }

            console.log('Auth signup successful:', data)

            // Since email confirmation is disabled, create profile immediately
            if (data?.user) {
                console.log('Creating user profile...')
                const { error: profileError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: data.user.id,
                            email,
                            full_name: fullName,
                            role: 'teacher',
                        },
                    ])

                if (profileError) {
                    console.error('Failed to create user profile:', profileError)
                    throw new Error(`Failed to create user profile: ${profileError.message}`)
                }
                console.log('User profile created successfully')
            }

        } catch (error) {
            console.error('Full signup error:', error)
            setError(error instanceof Error ? error.message : 'An error occurred')
            throw error
        }
    }

    const signOut = async () => {
        try {
            setError(null)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            throw error
        }
    }

    const value = {
        session,
        user,
        signIn,
        signUp,
        signOut,
        loading,
        error,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
