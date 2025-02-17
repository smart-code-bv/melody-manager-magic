import { FC, useState, useMemo } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer, View, Views, SlotInfo } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useLessons } from '@/hooks/useLessons'
import { CalendarEvent } from '@/types/calendar'
import { Lesson } from '@/types/database'
import { LessonFormDialog } from '@/components/lessons/LessonFormDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export const Calendar: FC = () => {
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState<View>(Views.WEEK)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
    const { events, isLoading, error, createLesson, updateLesson, deleteLesson } = useLessons(date)

    const eventPropGetter = (event: CalendarEvent) => {
        let className = 'bg-primary text-primary-foreground'

        if (event.lesson.status === 'cancelled') {
            className = 'bg-destructive text-destructive-foreground opacity-50'
        } else if (event.lesson.status === 'completed') {
            className = 'bg-muted text-muted-foreground'
        }

        return { className }
    }

    const handleViewChange = (newView: View) => {
        setView(newView)
    }

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo)
        setIsCreateOpen(true)
    }

    const handleSelectEvent = (event: CalendarEvent) => {
        setSelectedEvent(event)
        setIsEditOpen(true)
    }

    const handleCreateLesson = async (values: Partial<Lesson>) => {
        if (!selectedSlot) return
        console.log('Creating lesson with values:', values)
        console.log('Selected slot:', selectedSlot)

        try {
            const lessonData = {
                title: values.title || 'New Lesson',
                description: values.description || '',
                startTime: selectedSlot.start.toISOString(),
                endTime: selectedSlot.end.toISOString(),
                status: 'scheduled' as const,
                lessonType: values.lessonType || 'individual',
                maxStudents: values.maxStudents || 1,
                pricePerStudent: values.pricePerStudent || 0,
                isRecurring: values.isRecurring || false,
                locationId: values.locationId,
                studentId: values.studentId,
                notes: values.notes || '',
                parentLessonId: values.parentLessonId,
                recurringPattern: values.recurringPattern,
            }
            console.log('Submitting lesson data:', lessonData)
            await createLesson.mutateAsync(lessonData)
            setIsCreateOpen(false)
        } catch (error) {
            console.error('Failed to create lesson:', error)
        }
    }

    const handleUpdateLesson = async (values: Partial<Lesson>) => {
        if (!selectedEvent) return

        try {
            await updateLesson.mutateAsync({
                id: selectedEvent.lesson.id,
                ...values,
            })
        } catch (error) {
            console.error('Failed to update lesson:', error)
        }
    }

    const { messages, components } = useMemo(
        () => ({
            messages: {
                week: 'Week',
                work_week: 'Work Week',
                day: 'Day',
                month: 'Month',
                previous: 'Back',
                next: 'Next',
                today: 'Today',
                agenda: 'Agenda',
                showMore: (total: number) => `+${total} more`,
            },
            components: {
                eventWrapper: (props: any) => (
                    <div
                        className={`
                            rounded-md shadow-sm p-1
                            ${props.className}
                            ${props.event.lesson.isRecurring ? 'border-l-4 border-secondary' : ''}
                        `}
                    >
                        <div className="text-sm font-medium">{props.event.title}</div>
                        {props.event.lesson.description && (
                            <div className="text-xs opacity-75">{props.event.lesson.description}</div>
                        )}
                        {props.event.location && (
                            <div className="text-xs mt-1">
                                {props.event.location.isOnline ? '🌐 Online' : `📍 ${props.event.location.name}`}
                            </div>
                        )}
                        {props.event.lesson.lessonType !== 'individual' && (
                            <div className="text-xs mt-1">
                                👥 {props.event.lesson.lessonType.charAt(0).toUpperCase() + props.event.lesson.lessonType.slice(1)}
                            </div>
                        )}
                    </div>
                ),
            },
        }),
        []
    )

    if (isLoading) {
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[600px] flex items-center justify-center text-destructive">
                Error loading calendar: {error.message}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Lesson
                </Button>
            </div>

            <div className="h-[600px]">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.WEEK}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    date={date}
                    onNavigate={setDate}
                    onView={handleViewChange}
                    view={view}
                    eventPropGetter={eventPropGetter}
                    messages={messages}
                    components={components}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    className="bg-background rounded-lg shadow-sm"
                />
            </div>

            <LessonFormDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onSubmit={handleCreateLesson}
                initialValues={
                    selectedSlot
                        ? {
                            startTime: selectedSlot.start.toISOString(),
                            endTime: selectedSlot.end.toISOString(),
                        }
                        : undefined
                }
                title="Create Lesson"
            />

            <LessonFormDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSubmit={handleUpdateLesson}
                initialValues={selectedEvent?.lesson}
                title="Edit Lesson"
            />
        </div>
    )
}

export default Calendar
