import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Lesson, Location } from '@/types/database'
import { CalendarEvent } from '@/types/calendar'
import { useAuth } from '@/lib/auth'
import { startOfMonth, endOfMonth, parseISO } from 'date-fns'

export const useLessons = (date: Date = new Date()) => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    // Query for fetching lessons
    const {
        data: lessons,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['lessons', user?.id, date],
        queryFn: async () => {
            const start = startOfMonth(date)
            const end = endOfMonth(date)

            const { data, error } = await supabase
                .from('lessons')
                .select(`
                    *,
                    locations (*)
                `)
                .eq('teacher_id', user?.id)
                .gte('start_time', start.toISOString())
                .lte('end_time', end.toISOString())
                .order('start_time', { ascending: true })

            if (error) throw error

            // Convert snake_case to camelCase for our frontend types
            return data?.map(lesson => ({
                ...lesson,
                teacherId: lesson.teacher_id,
                locationId: lesson.location_id,
                startTime: lesson.start_time,
                endTime: lesson.end_time,
                lessonType: lesson.lesson_type,
                maxStudents: lesson.max_students,
                pricePerStudent: lesson.price_per_student,
                isRecurring: lesson.is_recurring,
                recurringPattern: lesson.recurring_pattern,
                parentLessonId: lesson.parent_lesson_id,
                createdAt: lesson.created_at,
                locations: lesson.locations ? {
                    ...lesson.locations,
                    teacherId: lesson.locations.teacher_id,
                    roomDetails: lesson.locations.room_details,
                    isOnline: lesson.locations.is_online,
                    createdAt: lesson.locations.created_at,
                    updatedAt: lesson.locations.updated_at,
                } : undefined
            }))
        },
        enabled: !!user,
    })

    // Convert lessons to calendar events
    const events: CalendarEvent[] = lessons?.map((lesson) => ({
        title: lesson.title,
        start: parseISO(lesson.startTime),
        end: parseISO(lesson.endTime),
        lesson: lesson as Lesson,
        location: lesson.locations as Location | undefined,
    })) || []

    // Mutation for creating a lesson
    const createLesson = useMutation({
        mutationFn: async (newLesson: Omit<Lesson, 'id' | 'teacherId' | 'createdAt'>) => {
            console.log('Creating lesson with data:', newLesson)
            const { data, error } = await supabase
                .from('lessons')
                .insert([
                    {
                        teacher_id: user?.id,
                        title: newLesson.title,
                        description: newLesson.description,
                        start_time: newLesson.startTime,
                        end_time: newLesson.endTime,
                        lesson_type: newLesson.lessonType,
                        max_students: newLesson.maxStudents,
                        price_per_student: newLesson.pricePerStudent,
                        location_id: newLesson.locationId,
                        student_id: newLesson.studentId,
                        is_recurring: newLesson.isRecurring,
                        recurring_pattern: newLesson.recurringPattern,
                        parent_lesson_id: newLesson.parentLessonId,
                        status: newLesson.status,
                        notes: newLesson.notes,
                    },
                ])
                .select()
                .single()

            if (error) {
                console.error('Error creating lesson:', error)
                throw error
            }
            console.log('Created lesson:', data)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        },
    })

    // Mutation for updating a lesson
    const updateLesson = useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Lesson> & { id: string }) => {
            const { data, error } = await supabase
                .from('lessons')
                .update({
                    ...updates,
                    teacher_id: updates.teacherId,
                    location_id: updates.locationId,
                    start_time: updates.startTime,
                    end_time: updates.endTime,
                    lesson_type: updates.lessonType,
                    max_students: updates.maxStudents,
                    price_per_student: updates.pricePerStudent,
                    is_recurring: updates.isRecurring,
                    recurring_pattern: updates.recurringPattern,
                    parent_lesson_id: updates.parentLessonId,
                })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        },
    })

    // Mutation for deleting a lesson
    const deleteLesson = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('lessons')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        },
    })

    return {
        events,
        isLoading,
        error,
        createLesson,
        updateLesson,
        deleteLesson,
    }
}
