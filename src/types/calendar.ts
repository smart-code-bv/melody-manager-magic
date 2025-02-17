import { Event } from 'react-big-calendar'
import { Lesson as DbLesson, Location as DbLocation } from './database'

export type LessonType = 'individual' | 'duo' | 'trio' | 'group'
export type LessonStatus = 'scheduled' | 'completed' | 'cancelled'

export interface Location {
    id: string
    teacherId: string
    name: string
    address?: string
    roomDetails?: string
    isOnline: boolean
    createdAt: string
    updatedAt: string
}

export interface Lesson {
    id: string
    teacherId: string
    locationId: string
    title: string
    description?: string
    startTime: string
    endTime: string
    lessonType: LessonType
    maxStudents: number
    pricePerStudent?: number
    isRecurring: boolean
    recurrencePattern?: {
        frequency: 'weekly' | 'biweekly' | 'monthly'
        dayOfWeek: number
        endDate?: string
        occurrences?: number
    }
    parentLessonId?: string
    status: LessonStatus
    createdAt: string
    updatedAt: string
}

export interface CalendarEvent extends Event {
    lesson: DbLesson
    location?: DbLocation
}
