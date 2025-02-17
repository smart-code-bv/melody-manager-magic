import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Lesson } from '@/types/database'

const lessonFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    lessonType: z.enum(['individual', 'duo', 'trio', 'group']),
    maxStudents: z.number().min(1).max(20),
    pricePerStudent: z.number().min(0).optional(),
    locationId: z.string().optional(),
    isRecurring: z.boolean().default(false),
    recurringPattern: z.object({
        frequency: z.enum(['weekly', 'biweekly', 'monthly']),
        dayOfWeek: z.number().min(0).max(6),
        endDate: z.string().optional(),
        occurrences: z.number().optional(),
    }).optional(),
})

type LessonFormValues = z.infer<typeof lessonFormSchema>

interface LessonFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (values: LessonFormValues) => void
    initialValues?: Partial<Lesson>
    title?: string
}

export const LessonFormDialog: FC<LessonFormDialogProps> = ({
    open,
    onOpenChange,
    onSubmit,
    initialValues,
    title = 'Create Lesson',
}) => {
    const form = useForm<LessonFormValues>({
        resolver: zodResolver(lessonFormSchema),
        defaultValues: {
            title: initialValues?.title || '',
            description: initialValues?.description || '',
            startTime: initialValues?.startTime ? format(new Date(initialValues.startTime), "yyyy-MM-dd'T'HH:mm") : '',
            endTime: initialValues?.endTime ? format(new Date(initialValues.endTime), "yyyy-MM-dd'T'HH:mm") : '',
            lessonType: initialValues?.lessonType || 'individual',
            maxStudents: initialValues?.maxStudents || 1,
            pricePerStudent: initialValues?.pricePerStudent || undefined,
            locationId: initialValues?.locationId || undefined,
            isRecurring: initialValues?.isRecurring || false,
            recurringPattern: initialValues?.recurringPattern ? {
                frequency: (initialValues.recurringPattern as any)?.frequency || 'weekly',
                dayOfWeek: (initialValues.recurringPattern as any)?.dayOfWeek || 0,
                endDate: (initialValues.recurringPattern as any)?.endDate,
                occurrences: (initialValues.recurringPattern as any)?.occurrences,
            } : undefined,
        },
    })

    const handleSubmit = (values: LessonFormValues) => {
        console.log('Form values before submission:', values)
        const submissionValues = {
            ...values,
            recurringPattern: values.isRecurring && values.recurringPattern ? {
                frequency: values.recurringPattern.frequency,
                dayOfWeek: values.recurringPattern.dayOfWeek,
                endDate: values.recurringPattern.endDate,
                occurrences: values.recurringPattern.occurrences,
            } : null,
        }
        console.log('Form values after processing:', submissionValues)
        onSubmit(submissionValues)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lesson title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Lesson description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="lessonType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select lesson type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="individual">Individual</SelectItem>
                                                <SelectItem value="duo">Duo</SelectItem>
                                                <SelectItem value="trio">Trio</SelectItem>
                                                <SelectItem value="group">Group</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maxStudents"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Students</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={20}
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="pricePerStudent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price per Student</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            {...field}
                                            onChange={e => field.onChange(parseFloat(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default LessonFormDialog
