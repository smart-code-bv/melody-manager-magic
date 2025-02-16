# Music Teacher Management Platform - Development Report

## Project Overview
The Music Teacher Management Platform is a comprehensive web-based solution designed to streamline the administrative tasks of music teachers, enabling them to focus more on teaching and less on management. This report documents the key decisions, ideas, and progress throughout the development process.

## Initial Assessment

### Market Opportunity
The music education market presents a significant opportunity for digital transformation:
- Many teachers still rely on manual or fragmented systems (paper, Google Classroom, or homegrown solutions)
- Growing demand for efficient administrative tools
- Increasing adoption of digital solutions in education
- Potential for viral growth through teacher networks
- Initial focus on Dutch market, leveraging deep market understanding from 20 years of teaching experience
- Existing solutions focus primarily on online teaching, while our platform supports hybrid/in-person teaching

### Market Insights

#### Student Demographics & Payment Structure
1. **Student Base**
   - Age range: 7-65 years
   - Parent-managed payments for minors
   - Legal requirement: Invoicing to parents for underage students

2. **Payment Patterns**
   - Annual contracts (September-June):
     * Year-long commitment required
     * No mid-year cancellations (due to duo/trio lesson structure)
     * Payment due before first lesson of each term
   - Payment management:
     * Friendly payment reminder system
     * Payment status warnings in dashboard
     * Personal approach to late payments

3. **Lesson Structure**
   - Focus on in-person/hybrid teaching model
   - Academic year-based contracts
   - Pricing: €700-1000 per season
   - Group dynamics:
     * Solo, duo, and trio lessons supported
     * Year-long commitment protects group lesson structure

#### Competitive Landscape
1. **Current Solutions**
   - Online platforms (e.g., onlinemuziekacademie.nl) focus on virtual teaching
   - Our differentiation: Support for traditional in-person teaching model
   - Gap in market for comprehensive administrative tools

2. **Integration Requirements**
   - Moneybird widely used for invoicing
   - Opportunity for streamlined financial management

### Core Value Proposition
1. **Time Savings**
   - Automated scheduling and rescheduling
   - Streamlined material management
   - Efficient invoice generation and tracking

2. **Professional Image**
   - Modern, user-friendly interface
   - Professional communication tools
   - Organized lesson materials

3. **Financial Management**
   - Automated invoicing with platform fee integration
   - Payment tracking
   - Financial reporting

### Innovative Business Model
1. **Student-Funded Platform**
   - €2/month or €20/year per student
   - Platform fees integrated into lesson invoices
   - Negligible cost compared to lesson fees (€700-1000 per season)
   - Teachers pay minimal to no fees

2. **Key Advantages**
   - Removes financial barrier for teacher adoption
   - Transparent pricing bundled with lesson invoices
   - Sustainable revenue model
   - Scalable across different instruments and teaching styles

3. **Revenue Potential**
   - Example: 15 students × €2/month = €30/month per teacher
   - Scalable across multiple teachers
   - Potential for premium features and upsells

## Development Strategy

### Phase 1: MVP Focus (Dutch Market)
Initial development focuses exclusively on teacher-side features:
1. Core scheduling system
2. Basic material management
3. Essential financial features
   - Smart invoicing system with platform fee integration
   - Payment tracking
4. Simple student management

### Phase 2: Enhanced Features
Planned expansion after MVP:
1. Student/parent portal
2. Advanced analytics
3. Integration capabilities
4. Mobile applications
5. Geographic expansion beyond Dutch market

## Market Entry Strategy
1. **Initial Market**: Netherlands
   - Leverage existing market knowledge
   - Use local teaching network for beta testing
   - Build case studies from early adopters
   - Initial focus on independent teachers before music schools

2. **Target Users**
   - Music teachers of all instruments
   - Focus on independent teachers and small music schools
   - Initial target: 10-50 students per teacher
   - Teachers preferring in-person or hybrid teaching models

3. **Growth Strategy**
   - Leverage teacher networks for organic growth
   - Focus on zero-friction onboarding
   - Build trust through transparent pricing
   - Demonstrate clear value proposition through time savings
   - Future expansion to music schools (post-MVP)

### MVP Priorities
1. **Core Features**
   - Focus on independent teacher needs
   - Parent-centric payment system
   - Age-based VAT handling
   - Payment structure:
     * Three standardized terms of 12 lessons each
     * Automated installment calculations
     * Pro-rated mid-year joining
     * Individual lesson attendance tracking

2. **Financial Management**
   - Moneybird integration for invoicing:
     * Payment status sync
     * Optional historical invoice access
     * Term-based payment tracking
   - Automated VAT calculations
   - Mid-year joiner pro-rating

3. **Substitute Teacher System**
   - Network-based substitute finding
     * Word-of-mouth connections
     * Teacher network management
   - Comprehensive substitute access:
     * Full student history and notes
     * Access to teacher's materials
     * Lesson reporting capability
   - Automated invoicing system
     * Substitute → Original teacher billing
     * Integration with Moneybird

4. **Contract & Payment Management**
   - Annual contract handling:
     * Year-long commitment enforcement
     * Group lesson protection
     * Automatic renewal preparation
   - Payment tracking:
     * Pre-term payment monitoring
     * Friendly reminder system
     * Payment status dashboard
     * Integration with Moneybird

5. **Attendance Tracking**
   - Per-lesson attendance recording
   - Teacher absence monitoring (3 max)
   - Automatic reimbursement triggers
   - Substitute teacher assignment tracking

6. **Post-MVP Considerations**
   - Music school management features
   - Room booking system
   - Multi-teacher coordination
   - Enhanced parent/student portal
   - Advanced substitute teacher management

## Progress Updates
[This section will be updated as we progress through the tasks and make key decisions]

## Technical Architecture

### System Overview
1. **Frontend Architecture**
   - SvelteKit for server-side rendering and routing
   - Skeleton UI + Tailwind CSS for responsive design
   - Progressive Web App (PWA) capabilities
   - Real-time updates for payment status and scheduling

2. **Backend Architecture**
   - Supabase as the primary backend platform:
     * PostgreSQL database
     * Real-time subscriptions
     * Row-level security
     * Built-in authentication
     * Storage for teaching materials
   - Edge Functions for custom business logic

3. **Integration Layer**
   - Moneybird API integration:
     * Webhook support for payment status updates
     * Invoice generation and management
     * Payment tracking synchronization
   - Calendar integration (future)
   - Email/notification service

### Security Architecture
1. **Authentication & Authorization**
   - Multi-role support:
     * Teachers (primary account holders)
     * Substitute teachers (temporary access)
     * Parents (future portal access)
   - Row-level security policies:
     * Teacher-specific data isolation
     * Substitute temporary access controls
     * Student/parent data protection

2. **Data Protection**
   - GDPR compliance for EU data protection
   - Secure storage for teaching materials
   - Encrypted communication channels
   - Regular backup procedures

### Database Schema (Core Entities)
1. **Users & Authentication**
   ```sql
   teachers (
     id UUID PRIMARY KEY,
     auth_id UUID REFERENCES auth.users,
     email VARCHAR(255) NOT NULL UNIQUE,
     full_name VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     teaching_instrument VARCHAR(100),
     max_students INTEGER DEFAULT 50,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )

   substitute_teachers (
     id UUID PRIMARY KEY,
     teacher_id UUID REFERENCES teachers,
     substitute_id UUID REFERENCES teachers,
     start_date DATE NOT NULL,
     end_date DATE,
     access_level VARCHAR(50) DEFAULT 'full',
     created_at TIMESTAMPTZ DEFAULT NOW()
   )

   teacher_network (
     id UUID PRIMARY KEY,
     teacher_id UUID REFERENCES teachers,
     network_teacher_id UUID REFERENCES teachers,
     relationship_type VARCHAR(50),
     created_at TIMESTAMPTZ DEFAULT NOW()
   )
   ```

2. **Student & Group Management**
   ```sql
   students (
     id UUID PRIMARY KEY,
     parent_name VARCHAR(255) NOT NULL,
     parent_email VARCHAR(255) NOT NULL,
     parent_phone VARCHAR(50),
     student_name VARCHAR(255) NOT NULL,
     date_of_birth DATE NOT NULL,
     vat_applicable BOOLEAN DEFAULT false,
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )

   groups (
     id UUID PRIMARY KEY,
     teacher_id UUID REFERENCES teachers,
     type VARCHAR(20) CHECK (type IN ('solo', 'duo', 'trio')),
     lesson_duration INTEGER NOT NULL, -- in minutes
     created_at TIMESTAMPTZ DEFAULT NOW()
   )

   group_students (
     group_id UUID REFERENCES groups,
     student_id UUID REFERENCES students,
     joined_date DATE NOT NULL,
     active BOOLEAN DEFAULT true,
     PRIMARY KEY (group_id, student_id)
   )
   ```

3. **Academic Year & Lesson Management**
   ```sql
   academic_years (
     id UUID PRIMARY KEY,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     total_lessons INTEGER DEFAULT 36,
     terms_count INTEGER DEFAULT 3,
     created_at TIMESTAMPTZ DEFAULT NOW()
   )

   terms (
     id UUID PRIMARY KEY,
     academic_year_id UUID REFERENCES academic_years,
     term_number INTEGER CHECK (term_number IN (1, 2, 3)),
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     lessons_count INTEGER DEFAULT 12,
     payment_due_date DATE NOT NULL,
     UNIQUE (academic_year_id, term_number)
   )

   lessons (
     id UUID PRIMARY KEY,
     group_id UUID REFERENCES groups,
     term_id UUID REFERENCES terms,
     scheduled_date DATE NOT NULL,
     start_time TIME NOT NULL,
     end_time TIME NOT NULL,
     status VARCHAR(50) DEFAULT 'scheduled',
     substitute_teacher_id UUID REFERENCES teachers,
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   )

   attendance (
     id UUID PRIMARY KEY,
     lesson_id UUID REFERENCES lessons,
     student_id UUID REFERENCES students,
     status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late')),
     notes TEXT,
     recorded_by UUID REFERENCES teachers,
     created_at TIMESTAMPTZ DEFAULT NOW()
   )
   ```

4. **Financial Management**
   ```sql
   contracts (
     id UUID PRIMARY KEY,
     academic_year_id UUID REFERENCES academic_years,
     group_id UUID REFERENCES groups,
     student_id UUID REFERENCES students,
     annual_amount DECIMAL(10,2) NOT NULL,
     platform_fee_annual DECIMAL(10,2) NOT NULL,
     payment_frequency VARCHAR(20) CHECK (payment_frequency IN ('term')),
     status VARCHAR(50) DEFAULT 'active',
     created_at TIMESTAMPTZ DEFAULT NOW()
   )

   term_payments (
     id UUID PRIMARY KEY,
     contract_id UUID REFERENCES contracts,
     term_id UUID REFERENCES terms,
     base_amount DECIMAL(10,2) NOT NULL,
     platform_fee DECIMAL(10,2) NOT NULL,
     vat_amount DECIMAL(10,2) DEFAULT 0,
     total_amount DECIMAL(10,2) NOT NULL,
     status VARCHAR(50) DEFAULT 'pending',
     moneybird_invoice_id VARCHAR(255),
     due_date DATE NOT NULL,
     paid_date DATE,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )

   substitute_payments (
     id UUID PRIMARY KEY,
     lesson_id UUID REFERENCES lessons,
     substitute_teacher_id UUID REFERENCES teachers,
     amount DECIMAL(10,2) NOT NULL,
     status VARCHAR(50) DEFAULT 'pending',
     moneybird_invoice_id VARCHAR(255),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     paid_at TIMESTAMPTZ
   )
   ```

5. **Teaching Materials**
   ```sql
   materials (
     id UUID PRIMARY KEY,
     teacher_id UUID REFERENCES teachers,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     file_path VARCHAR(255),
     file_type VARCHAR(50),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )

   lesson_materials (
     lesson_id UUID REFERENCES lessons,
     material_id UUID REFERENCES materials,
     assigned_at TIMESTAMPTZ DEFAULT NOW(),
     PRIMARY KEY (lesson_id, material_id)
   )
   ```

### Scalability Considerations
1. **Performance Optimization**
   - Database indexing strategy
   - Caching layer for frequent queries
   - Optimized real-time subscriptions
   - Efficient file storage access

2. **Infrastructure Scaling**
   - Fly.io deployment:
     * Global edge presence
     * Automatic scaling
     * Load balancing
   - Database scaling strategy:
     * Connection pooling
     * Read replicas (future)
     * Backup strategy

### Integration Architecture
1. **Moneybird Integration**
   - Webhook endpoints for status updates
   - Cached API responses
   - Rate limiting compliance
   - Error handling and retry logic

2. **Communication System**
   - Email service integration
   - Payment reminder system
   - Absence notification workflow
   - System status updates

### Development & Deployment
1. **Development Environment**
   - Local development setup
   - Testing environment
   - Staging environment
   - Production environment

2. **CI/CD Pipeline**
   - Automated testing
   - Code quality checks
   - Security scanning
   - Deployment automation
