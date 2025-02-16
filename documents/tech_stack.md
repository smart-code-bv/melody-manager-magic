# Technical Stack Documentation

## Frontend Framework and UI
- **Core Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**:
  - Radix UI for accessible primitives
  - Tailwind CSS for styling
  - Various Radix components including:
    - Dialog
    - Navigation
    - Form elements
    - Layout components
- **State Management & Data Fetching**:
  - TanStack Query (React Query)
  - React Hook Form for form management

## Backend & Database
- **Backend Service**: Supabase
  - Authentication
  - Database
  - Real-time subscriptions
- **Database**: PostgreSQL (via Supabase)

## Development Tools
- **Language**: TypeScript
- **Linting & Type Checking**:
  - ESLint
  - TypeScript compiler
- **Package Management**:
  - npm/Node.js
  - Bun (alternative runtime)

## UI/UX Libraries
- **Animation**: Framer Motion
- **Date Handling**:
  - date-fns
  - react-day-picker
- **Charts & Visualization**: Recharts
- **Toast Notifications**: Sonner
- **Form Validation**: Zod

## Development Environment
- **IDE Support**:
  - TypeScript definitions
  - ESLint configuration
  - Tailwind CSS IntelliSense
- **Build Tools**:
  - PostCSS
  - Autoprefixer
  - Tailwind CSS

## Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── integrations/  # Third-party service integrations
├── lib/          # Utility functions and shared code
├── pages/        # Route components/pages
└── translations.ts # Internationalization support
```

## Key Features
- Type-safe development with TypeScript
- Component-driven development with React
- Responsive design with Tailwind CSS
- Accessible UI components through Radix UI
- Real-time capabilities through Supabase
- Form handling with React Hook Form and Zod validation
- Efficient data fetching with TanStack Query

## Development Workflow
- Development server: `npm run dev`
- Production build: `npm run build`
- Linting: `npm run lint`
- Preview build: `npm run preview`

## Dependencies
The project uses a carefully selected set of modern dependencies to ensure:
- Accessibility (Radix UI)
- Performance (Vite, React 18)
- Developer experience (TypeScript, ESLint)
- UI consistency (Tailwind CSS)
- Data management (TanStack Query, Supabase)
