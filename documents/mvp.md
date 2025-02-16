# Music Teacher Management Platform MVP Specification

## Application Summary for LLM Implementation

### Core Application Purpose
This is a web-based platform for music teachers to manage their teaching business. The MVP focuses exclusively on the teacher-side features, with student/parent features planned for future releases. The application handles lesson scheduling, material management, and financial administration.

### Primary User
Music teachers who:
- Teach multiple students (10-50 typical range)
- Offer various lesson types (individual, duo, trio, group)
- Work across multiple locations
- Need to manage lesson materials and schedules
- Require invoice and payment tracking

### Key Technical Specifications
- Backend: Elixir/Phoenix
- Database: PostgreSQL
- Frontend: Progressive Web App
- External Integrations: Moneybird, Google Calendar, iCal
- Communication: Email and SMS capabilities

## Design Layout and Functionality

### 1. Authentication & Dashboard

#### Login Screen
```
Layout:
- Clean, minimal design
- Logo centered at top
- Login form in center:
  * Email input
  * Password input
  * "Remember me" checkbox
  * Login button
- "Forgot password" link below form
```

#### Teacher Dashboard
```
Layout:
- Top navigation bar:
  * Logo (left)
  * Quick actions (right):
    - Add new student
    - Create lesson
    - Upload material
  * Profile menu (far right)
- Left sidebar:
  * Navigation menu:
    - Dashboard
    - Schedule
    - Students
    - Materials
    - Invoices
    - Settings
- Main content area:
  * Today's schedule
  * Recent activity
  * Upcoming lessons
  * Payment notifications
```

### 2. Schedule Management Interface

#### Calendar View
```
Layout:
- Calendar grid (main area):
  * Week view (default)
  * Month view (toggle)
  * Day view (toggle)
- Sidebar (right):
  * Quick add lesson
  * Filter options:
    - By location
    - By lesson type
    - By student
- Time slots:
  * Color-coded by lesson type
  * Drag-and-drop enabled
  * Click to expand details
```

#### Lesson Creation Modal
```
Layout:
- Form elements:
  * Student selection (multi-select for group lessons)
  * Lesson type dropdown
  * Duration input
  * Location selection
  * Recurring options
  * Price calculation (automatic)
- Preview panel:
  * Schedule visualization
  * Conflict detection
```

### 3. Material Management

#### Material Library
```
Layout:
- Grid/list toggle view
- Folder structure:
  * By instrument
  * By level
  * By student
- Upload area:
  * Drag-and-drop zone
  * File browser button
- Preview panel:
  * PDF viewer
  * Audio player
  * YouTube embed
```

### 4. Financial Management

#### Invoice Dashboard
```
Layout:
- Summary cards:
  * Outstanding payments
  * Recent payments
  * Next invoices due
- Action buttons:
  * Create invoice
  * Sync with Moneybird
  * Upload invoice
- Invoice list:
  * Sortable columns
  * Status indicators
  * Quick actions
```

## Complete Feature Checklist

### 1. User Authentication & Management
- [ ] Teacher registration
  * Purpose: Create new teacher accounts
  * Fields: Name, email, password, teaching details
  * Validation: Email verification required

- [ ] Login system
  * Purpose: Secure access to platform
  * Features: Remember me, password reset
  * Security: JWT tokens, secure session management

- [ ] Profile management
  * Purpose: Maintain teacher information
  * Fields: Contact details, teaching locations, rates
  * Features: Profile photo, bio, credentials

### 2. Schedule Management
- [ ] Calendar interface
  * Purpose: Visual schedule management
  * Features: Multiple views (day/week/month)
  * Integration: External calendar sync

- [ ] Lesson creation
  * Purpose: Schedule new lessons
  * Features: Recurring options, conflict detection
  * Types: Individual, duo, trio, group lessons

- [ ] Location management
  * Purpose: Track teaching locations
  * Features: Multiple location support
  * Data: Address, room details, availability

### 3. Student Management
- [ ] Student profiles
  * Purpose: Store student information
  * Fields: Contact details, lesson preferences, notes
  * Features: Progress tracking, attendance history

- [ ] Lesson type management
  * Purpose: Define different lesson formats
  * Features: Custom pricing, duration settings
  * Types: Individual, group, workshop

### 4. Material Management
- [ ] File upload system
  * Purpose: Store and organize teaching materials
  * Formats: PDF, audio, video
  * Features: Tagging, categorization

- [ ] YouTube integration
  * Purpose: Link external teaching resources
  * Features: Embed videos, create playlists
  * Usage: Reference materials, demonstrations

### 5. Financial Management
- [ ] Moneybird integration
  * Purpose: Professional invoice management
  * Features: Auto-sync, payment tracking
  * Usage: Dutch market primary billing system

- [ ] Manual invoice system
  * Purpose: Alternative to Moneybird
  * Features: Custom template, PDF generation
  * Usage: Backup system, custom invoicing

- [ ] Payment tracking
  * Purpose: Monitor financial status
  * Features: Payment status, overdue alerts
  * Reports: Financial summaries, tax calculations

### 6. Communication System
- [ ] Email notifications
  * Purpose: Automated communications
  * Types: Lesson reminders, schedule changes
  * Features: Customizable templates

- [ ] SMS notifications
  * Purpose: Urgent communications
  * Types: Last-minute changes, reminders
  * Features: Opt-in/out, delivery confirmation

### 7. Settings & Configuration
- [ ] Notification preferences
  * Purpose: Customize communication
  * Options: Email, SMS, timing preferences
  * Features: Per-event settings

- [ ] Calendar settings
  * Purpose: Configure schedule display
  * Options: Default view, working hours
  * Features: External calendar sync

- [ ] Invoice settings
  * Purpose: Configure financial defaults
  * Options: Payment terms, tax rates
  * Features: Template customization

Each feature includes:
- Error handling
- Loading states
- Validation
- Responsive design
- Offline capability where applicable
- Data backup
- User feedback mechanisms

Implementation Priority:
1. Core scheduling system
2. Basic material management
3. Essential financial features
4. Communication system
5. Advanced features and integrations
