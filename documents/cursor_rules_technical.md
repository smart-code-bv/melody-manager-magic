# Technical Cursor Rules for Melody Manager Magic

## TypeScript & React Development Rules

### Component Structure
- Use functional components with TypeScript
- Implement proper type definitions for all props
- Use React.FC type for functional components
- Implement error boundaries at appropriate levels
- Use proper React hooks with TypeScript generics

```typescript
// Component Template
import { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  // Add other props with types
}

export const Component: FC<Props> = ({ children, ...props }) => {
  return (
    // Component JSX
  )
}
```

### State Management
- Use TanStack Query for server state
- Implement proper error handling and loading states
- Use proper TypeScript types for query results
- Implement optimistic updates where appropriate

```typescript
// Query Template
const useDataQuery = () => {
  return useQuery({
    queryKey: ['key'],
    queryFn: async () => {
      const response = await fetch('/api/endpoint')
      if (!response.ok) throw new Error('Network error')
      return response.json()
    }
  })
}
```

## Supabase Integration Rules

### Database Access
- Use type-safe database queries
- Implement proper error handling
- Use Supabase's realtime features appropriately
- Keep sensitive operations server-side

```typescript
// Supabase Query Template
const getData = async () => {
  const { data, error } = await supabase
    .from('table')
    .select('*')
    .throwOnError()

  if (error) throw error
  return data
}
```

## UI Component Rules

### Radix UI Integration
- Use Radix UI for complex interactive components
- Implement proper accessibility features
- Use Tailwind for styling Radix components
- Maintain consistent component API

```typescript
// Radix Component Template
import * as Dialog from '@radix-ui/react-dialog'

export const Modal: FC<Props> = ({ children, ...props }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Content className="tailwind-classes">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Tailwind CSS Rules
- Use consistent spacing and sizing
- Implement responsive design patterns
- Use semantic color variables
- Maintain dark mode support

```typescript
// Tailwind Component Template
const Component = () => {
  return (
    <div className="
      p-4
      space-y-4
      bg-background
      dark:bg-background-dark
      rounded-lg
      shadow-md
    ">
      {/* Component content */}
    </div>
  )
}
```

## Testing Rules
- Write unit tests for all components
- Implement integration tests for critical paths
- Use proper TypeScript types in tests
- Test accessibility features

```typescript
// Test Template
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('should render and function correctly', async () => {
    render(<Component />)
    // Test implementation
  })
})
```

## Code Organization Rules
- Maintain consistent file structure
- Use proper naming conventions
- Implement proper error boundaries
- Use TypeScript path aliases

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Basic UI components
│   └── features/  # Feature-specific components
├── hooks/         # Custom React hooks
├── lib/          # Utility functions
├── types/        # TypeScript type definitions
└── features/     # Feature-specific code
```

## Performance Rules
- Implement proper code splitting
- Use React.memo where appropriate
- Optimize images and assets
- Implement proper caching strategies

## Security Rules
- Implement proper authentication flows
- Use proper CORS policies
- Sanitize user input
- Implement proper role-based access control

## Documentation Rules
- Document all components
- Document all custom hooks
- Document all utility functions
- Keep documentation up to date

These rules should be followed in conjunction with the existing project management rules in the main `.cursorrules` file.

## Music Teacher Platform Specific Patterns

### Lesson Management
```typescript
// Lesson Scheduling Component Template
interface LessonProps {
  studentId: string
  teacherId: string
  duration: number
  recurringPattern?: 'weekly' | 'biweekly' | 'monthly'
  instrumentType: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
}

export const LessonScheduler: FC<LessonProps> = (props) => {
  const { data: availability } = useQuery({
    queryKey: ['teacher', props.teacherId, 'availability'],
    queryFn: () => getTeacherAvailability(props.teacherId)
  })

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        available={availability}
        className="rounded-md border"
      />
      <TimeSlotPicker />
      <RecurrenceSelector />
    </div>
  )
}
```

### Student Progress Tracking
```typescript
// Progress Tracking Component Template
interface ProgressEntryProps {
  studentId: string
  lessonId: string
  skillsAssessed: {
    skillName: string
    rating: 1 | 2 | 3 | 4 | 5
    notes: string
  }[]
}

export const ProgressEntry: FC<ProgressEntryProps> = ({ studentId, lessonId, skillsAssessed }) => {
  const mutation = useMutation({
    mutationFn: (progress: ProgressEntryProps) => saveProgressEntry(progress),
    onSuccess: () => {
      queryClient.invalidateQueries(['student', studentId, 'progress'])
    }
  })

  return (
    <Form onSubmit={(data) => mutation.mutate(data)}>
      <SkillAssessmentGrid />
      <NotesEditor />
      <AttachmentUploader />
    </Form>
  )
}
```

### Payment Processing
```typescript
// Payment Processing Template
interface PaymentProps {
  studentId: string
  amount: number
  lessonIds: string[]
  paymentMethod: 'card' | 'bank' | 'cash'
}

export const PaymentProcessor: FC<PaymentProps> = (props) => {
  const { data: paymentMethods } = useQuery({
    queryKey: ['student', props.studentId, 'payment-methods'],
    queryFn: () => getStoredPaymentMethods(props.studentId)
  })

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <PaymentMethodSelector methods={paymentMethods} />
      <InvoicePreview lessonIds={props.lessonIds} />
      <PaymentConfirmation amount={props.amount} />
    </div>
  )
}
```

### Resource Management
```typescript
// Teaching Resource Template
interface ResourceProps {
  resourceType: 'sheet_music' | 'exercise' | 'video' | 'audio'
  instrumentType: string
  skillLevel: string
  tags: string[]
}

export const ResourceLibrary: FC<ResourceProps> = (props) => {
  const { data: resources } = useQuery({
    queryKey: ['resources', props.resourceType, props.instrumentType],
    queryFn: () => fetchResources(props)
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ResourceFilter />
      <ResourceGrid resources={resources} />
      <ResourceUploader />
    </div>
  )
}
```

### Communication Tools
```typescript
// Messaging Component Template
interface MessageProps {
  recipientId: string
  messageType: 'lesson_update' | 'schedule_change' | 'payment_reminder' | 'general'
  attachments?: File[]
}

export const MessageComposer: FC<MessageProps> = (props) => {
  const mutation = useMutation({
    mutationFn: (message: MessageProps) => sendMessage(message),
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', props.recipientId])
    }
  })

  return (
    <div className="space-y-4">
      <MessageTemplateSelector type={props.messageType} />
      <RichTextEditor />
      <AttachmentHandler />
      <SchedulingIntegration />
    </div>
  )
}
```

### Data Models
```typescript
// Common Data Models
interface Student {
  id: string
  name: string
  email: string
  phone?: string
  instrumentType: string
  skillLevel: string
  startDate: Date
  lessonSchedule: LessonSchedule[]
  paymentInfo: PaymentInfo
  progressHistory: ProgressEntry[]
}

interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  instruments: string[]
  availability: TimeSlot[]
  hourlyRate: number
  students: string[]
  resources: Resource[]
}

interface Lesson {
  id: string
  teacherId: string
  studentId: string
  dateTime: Date
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  resources?: Resource[]
  payment?: Payment
}
```
