export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type UserRole = 'admin' | 'teacher' | 'student'

export type InstrumentType =
    | 'piano'
    | 'guitar'
    | 'violin'
    | 'drums'
    | 'voice'
    | 'flute'
    | 'cello'
    | 'saxophone'
    | 'trumpet'
    | 'clarinet'
    | 'bass_guitar'
    | 'viola'
    | 'trombone'
    | 'harp'
    | 'ukulele'
    | 'vibraphone'
    | 'accordion'
    | 'other'

export interface Profile {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
    active?: boolean
    avatarUrl?: string
    bio?: string
    timeZone?: string
    yearsTeaching?: number
    createdAt: string
}

export interface Location {
    id: string
    teacherId: string
    name: string
    address: string
    city: string
    isOnline?: boolean
    notes?: string
    roomDetails?: string
    createdAt: string
    updatedAt?: string
}

export interface Lesson {
    id: string
    teacherId: string
    studentId?: string
    locationId?: string
    title: string
    description?: string
    startTime: string
    endTime: string
    lessonType: 'individual' | 'duo' | 'trio' | 'group'
    maxStudents: number
    pricePerStudent?: number
    isRecurring?: boolean
    recurringPattern?: Json
    parentLessonId?: string
    status?: 'scheduled' | 'completed' | 'cancelled'
    notes?: string
    createdAt: string
}

export interface Student {
    id: string
    teacherId: string
    firstName: string
    lastName: string
    email?: string
    phone?: string
    level?: string
    notes?: string
    active?: boolean
    startDate?: string
    createdAt: string
}

export interface Material {
    id: string
    teacherId: string
    title: string
    description?: string
    fileUrl?: string
    type: string
    tags?: string[]
    createdAt: string
}

export interface Payment {
    id: string
    teacherId: string
    studentId?: string
    amount: number
    status?: string
    dueDate?: string
    paidDate?: string
    invoiceNumber?: string
    notes?: string
    createdAt: string
}

export interface Waitlist {
    id: string
    name: string
    email: string
    userType: string
    teacherName?: string
    lessonCity?: string
    instrumentsList: InstrumentType[]
    otherInstruments?: string
    studentCount?: string
    betaTester?: boolean
    surveyConsent?: boolean
    createdAt: string
}

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'id' | 'createdAt'>
                Update: Partial<Omit<Profile, 'id' | 'createdAt'>>
            }
            locations: {
                Row: Location
                Insert: Omit<Location, 'id' | 'createdAt'>
                Update: Partial<Omit<Location, 'id' | 'createdAt'>>
            }
            lessons: {
                Row: Lesson
                Insert: Omit<Lesson, 'id' | 'createdAt'>
                Update: Partial<Omit<Lesson, 'id' | 'createdAt'>>
            }
            students: {
                Row: Student
                Insert: Omit<Student, 'id' | 'createdAt'>
                Update: Partial<Omit<Student, 'id' | 'createdAt'>>
            }
            materials: {
                Row: Material
                Insert: Omit<Material, 'id' | 'createdAt'>
                Update: Partial<Omit<Material, 'id' | 'createdAt'>>
            }
            payments: {
                Row: Payment
                Insert: Omit<Payment, 'id' | 'createdAt'>
                Update: Partial<Omit<Payment, 'id' | 'createdAt'>>
            }
            waitlist: {
                Row: Waitlist
                Insert: Omit<Waitlist, 'id' | 'createdAt'>
                Update: Partial<Omit<Waitlist, 'id' | 'createdAt'>>
            }
        }
        Views: Record<string, never>
        Functions: Record<string, never>
        Enums: {
            user_role: UserRole
            instrument_enum: InstrumentType
        }
    }
}
