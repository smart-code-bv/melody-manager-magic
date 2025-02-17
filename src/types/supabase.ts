export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string
                    created_at: string
                    updated_at: string
                    role: 'teacher' | 'student' | 'admin'
                    avatar_url?: string
                }
                Insert: {
                    id?: string
                    email: string
                    full_name: string
                    created_at?: string
                    updated_at?: string
                    role?: 'teacher' | 'student' | 'admin'
                    avatar_url?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string
                    created_at?: string
                    updated_at?: string
                    role?: 'teacher' | 'student' | 'admin'
                    avatar_url?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    user_id: string
                    bio?: string
                    teaching_experience?: number
                    instruments: string[]
                    hourly_rate?: number
                    availability?: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    bio?: string
                    teaching_experience?: number
                    instruments?: string[]
                    hourly_rate?: number
                    availability?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    bio?: string
                    teaching_experience?: number
                    instruments?: string[]
                    hourly_rate?: number
                    availability?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
