# Space Portfolio - Development Strategy Guide

## Project Architecture

This is a **space-themed personal portfolio** built with Next.js 15 App Router, TypeScript, shadcn/ui, and comprehensive authentication system. The project follows enterprise-grade patterns with service layer architecture and proper separation of concerns.

### Key Tech Stack

- **Next.js 15.5** with Turbopack and App Router (`src/app/`)
- **NextAuth.js v4.24.11** - Authentication with JWT strategy and role-based access
- **Prisma ORM v6.14.0** - Database management with PostgreSQL
- **shadcn/ui (New York style)** - Component system with variants (`src/components/ui/`)
- **Tailwind CSS 4** - Utility-first styling with CSS variables (`src/app/globals.css`)
- **TypeScript strict mode** - Full type safety with path aliases (`@/*`)
- **Service Layer Architecture** - Business logic separation with proper patterns

## 1. 🏗️ Coding Patterns & Architecture

### API Route Patterns

#### Security Wrapper Pattern (Required)

Use consistent security wrappers for all API routes based on access level:

```typescript
// ✅ Import security wrappers
import {
  editorApiRoute,
  publicApiRoute,
  adminApiRoute,
  protectedApiRoute,
} from '@/lib/auth-utils'

// ✅ Public routes (portfolio display)
export const GET = publicApiRoute(
  async (): Promise<NextResponse<ApiResponse<DataType[]>>> => {
    try {
      const data = await getDataFromService()
      return NextResponse.json({
        success: true,
        data,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch data' },
        { status: 500 }
      )
    }
  }
)

// ✅ Editor/Admin routes (content management)
export const POST = editorApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<DataType>>> => {
    try {
      const body = await request.json()
      const validatedData = dataSchema.parse(body)

      const result = await createDataInService(validatedData)

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Data created successfully',
      })
    } catch (error) {
      console.error('Error creating data:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { success: false, error: 'Invalid data provided' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'Failed to create data' },
        { status: 500 }
      )
    }
  }
)
```

#### Individual Resource API Pattern ([id]/route.ts)

```typescript
import { editorApiRoute, publicApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import type { ApiResponse, DataType } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export const GET = publicApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<DataType>>> => {
    try {
      const { id } = await params
      const itemId = parseInt(id)

      if (isNaN(itemId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid ID' },
          { status: 400 }
        )
      }

      const item = await prisma.model.findUnique({
        where: { id: itemId },
        include: { relations: true },
      })

      if (!item) {
        return NextResponse.json(
          { success: false, error: 'Item not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: item,
      })
    } catch (error) {
      console.error('Error fetching item:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch item' },
        { status: 500 }
      )
    }
  }
)
```

### Service Layer Pattern (Required)

Always separate business logic from API routes using service layer:

```typescript
// ✅ Service layer with caching (src/services/*)
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getDataServer = unstable_cache(
  async () => {
    try {
      const data = await prisma.model.findMany({
        where: { isActive: true },
        include: { relations: true },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      })
      return data
    } catch (error) {
      console.error('Error fetching data server-side:', error)
      return []
    }
  },
  ['data-server'],
  {
    tags: ['data', 'portfolio-data'],
    revalidate: 60,
  }
)

// ✅ API route delegates to service
export const GET = publicApiRoute(async () => {
  try {
    const data = await getDataServer()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
})
```

### Validation & Error Handling Pattern (Required)

Centralize validation schemas and use consistent error handling:

```typescript
// ✅ Centralized validation in lib/validations.ts
export const createDataSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  level: z.number().min(1).max(5),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

export type CreateDataForm = z.infer<typeof createDataSchema>

// ✅ Consistent API error handling
try {
  const body = await request.json()
  const validatedData = createDataSchema.parse(body)

  // Process with validated data...
} catch (error) {
  console.error('Error:', error)

  if (error instanceof Error && error.name === 'ZodError') {
    return NextResponse.json(
      { success: false, error: 'Invalid data provided' },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { success: false, error: 'Failed to process request' },
    { status: 500 }
  )
}
```

### Rate Limiting Pattern (Required for Auth APIs)

Use specific rate limits for different API endpoints:

```typescript
// ✅ Import specific rate limits from lib/rate-limit.ts
import {
  applyRateLimit,
  passwordResetRequestRateLimit,
  passwordResetCompletionRateLimit,
  tokenValidationRateLimit,
  loginRateLimit,
} from '@/lib/rate-limit'

// ✅ Apply appropriate rate limit per endpoint
export const POST = publicApiRoute(async (request: NextRequest) => {
  try {
    // Apply rate limiting first
    const rateLimitResult = await applyRateLimit(
      request,
      passwordResetRequestRateLimit // Use specific rate limit
    )

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: rateLimitResult.error },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      )
    }

    // Continue with API logic...
  } catch (error) {
    // Handle errors...
  }
})

// ✅ Rate limit types for different actions:
// - loginRateLimit: 5 attempts/15 minutes
// - passwordResetRequestRateLimit: 3 attempts/hour
// - passwordResetCompletionRateLimit: 5 attempts/hour
// - tokenValidationRateLimit: 10 attempts/hour
```

````

### Database Transaction Pattern

Use Prisma transactions for complex operations:

```typescript
// ✅ Transaction for related data creation
const result = await prisma.$transaction(async tx => {
  const mainRecord = await tx.model.create({
    data: mainData,
  })

  if (relatedData.length > 0) {
    await tx.relatedModel.createMany({
      data: relatedData.map(item => ({
        ...item,
        mainRecordId: mainRecord.id,
      })),
    })
  }

  return mainRecord
})
````

### Page Component Patterns

#### Server Component Pattern (Default)

Use server components with server-side data fetching:

```typescript
// ✅ Server component with async data fetching
export default async function DataPage() {
  // Server-side data fetching with Promise.all for parallel requests
  const [data, stats] = await Promise.all([
    getDataServer(),
    getDataStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header with DashboardPageHeader component */}
      <DashboardPageHeader
        title='Data Management'
        description='Manage your data across the digital cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-3'>
        <StatsCard icon={Icon} label="Total Items" value={stats.total} />
      </div>

      {/* Main Content */}
      <DataListClient data={data} />
    </div>
  )
}
```

#### Loading Component Pattern (Required)

Create matching loading.tsx for each page with skeleton UI:

```typescript
// ✅ loading.tsx pattern matching page structure
import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DataLoading() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <DashboardPageHeader
        title='Data Management'
        description='Loading your data...'
        isLoading={true}
      />

      {/* Stats skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24 bg-white/20' />
                  <Skeleton className='h-6 w-8 bg-white/20' />
                </div>
                <Skeleton className='h-5 w-5 bg-white/20' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardContent className='p-6'>
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-20 w-full bg-white/20' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Client Component Pattern (When Needed)

Use client components for interactivity with 'use client' directive:

```typescript
// ✅ Client component for interactivity
'use client'

import { useState } from 'react'
import { useDataActions } from '@/hooks/use-data-actions'

export function DataListClient({ data }: { data: DataType[] }) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { deleteData, isLoading } = useDataActions()

  const handleDelete = async (id: number) => {
    const result = await deleteData(id)
    if (result.success) {
      // Handle success (data will be revalidated automatically)
    }
  }

  return (
    <div className='space-y-4'>
      {data.map(item => (
        <DataCard
          key={item.id}
          data={item}
          onDelete={() => handleDelete(item.id)}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
```

### Hook Patterns

#### API Action Hooks (Centralized)

Create centralized hooks for API interactions:

```typescript
// ✅ Centralized API actions (src/hooks/use-data-actions.ts)
export function useDataActions() {
  const [isLoading, setIsLoading] = useState(false)

  const createData = async (data: CreateDataForm): Promise<ActionResult> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Data created successfully!')
        revalidateTag('data')
        return { success: true, data: result.data }
      } else {
        toast.error('Failed to create data', {
          description: result.error,
        })
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = 'Failed to create data. Please try again.'
      toast.error('An error occurred', { description: errorMessage })
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return { createData, isLoading }
}
```

```

## 2. 📁 Folder Structure & Organization

### Strict Folder Hierarchy

Follow this exact structure for consistency and scalability:

```

src/
├── app/ # Next.js 15 App Router
│ ├── (routes)/ # Route groups for organization
│ ├── api/ # API endpoints with route handlers
│ ├── auth/ # Authentication pages
│ ├── dashboard/ # Protected dashboard routes
│ ├── globals.css # Global styles and CSS variables
│ ├── layout.tsx # Root layout with providers
│ └── page.tsx # Homepage
├── components/ # Reusable components by category
│ ├── ui/ # shadcn/ui components ONLY
│ ├── auth/ # Authentication-specific components
│ ├── dashboard/ # Dashboard-specific components
│ ├── forms/ # Form components with validation
│ ├── cards/ # Card-based components
│ ├── sections/ # Page section components
│ ├── animations/ # Animation and motion components
│ └── shared/ # Shared utility components
├── hooks/ # Custom React hooks
│ ├── use-auth.ts # Authentication hooks
│ ├── use-api.ts # API interaction hooks
│ └── use-_.ts # Feature-specific hooks
├── lib/ # Utility libraries and configurations
│ ├── auth.ts # NextAuth configuration
│ ├── db.ts # Database configuration
│ ├── utils.ts # General utilities (cn, etc.)
│ ├── validations.ts # Zod validation schemas
│ └── _.ts # Feature-specific utilities
├── services/ # Business logic layer
│ ├── auth-service.ts # Authentication business logic
│ ├── user-service.ts # User management logic
│ └── \*-service.ts # Feature-specific services
└── types/ # TypeScript type definitions
├── auth.ts # Authentication types
├── api.ts # API response types
└── index.ts # Global type exports

````

### Component Organization Rules

- **UI Components**: Only shadcn/ui components in `components/ui/`
- **Feature Components**: Group by domain in `components/{feature}/`
- **Form Components**: All forms with validation in `components/forms/`
- **Shared Components**: Reusable across features in `components/shared/`

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `user-profile-form.tsx`)
- **Services**: `kebab-case-service.ts` (e.g., `password-reset-service.ts`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-auth-state.ts`)
- **Types**: `kebab-case.ts` (e.g., `api-responses.ts`)
- **API Routes**: `route.ts` in appropriate folder structure

## 3. 🎨 Theming Structure & Design System

### CSS Variables Architecture

Use shadcn/ui's CSS variable system in `globals.css`:

```css
/* ✅ Consistent color system */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --space-cosmic: 230 35% 7%;
  --space-accent: 200 98% 39%;
  --space-gold: 45 93% 58%;
}

/* ✅ Space theme extensions */
.glass-cosmic {
  @apply from-space-cosmic/80 to-space-cosmic/40 border border-white/10 bg-gradient-to-br backdrop-blur-xl;
}

.gradient-stellar {
  @apply bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500;
}
````

### Component Styling Patterns

Always use the `cn()` utility for conditional classes:

```typescript
// ✅ Consistent styling pattern
import { cn } from '@/lib/utils'

interface ComponentProps {
  variant?: 'default' | 'cosmic' | 'stellar'
  className?: string
}

export function Component({ variant = 'default', className, ...props }) {
  return (
    <div
      className={cn(
        'base-styles',
        variant === 'cosmic' && 'glass-cosmic',
        variant === 'stellar' && 'gradient-stellar',
        className
      )}
      {...props}
    />
  )
}
```

### Responsive Design Patterns

Mobile-first approach with consistent breakpoints:

```typescript
// ✅ Responsive component pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>

// ✅ Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  {/* Scaling padding with screen size */}
</div>
```

## 4. ⚡ Next.js 15.5 Best Practices

### App Router Patterns

Leverage Next.js 15.5 features properly:

```typescript
// ✅ Server Components by default
export default async function Page() {
  const data = await fetchData() // Server-side data fetching
  return <Component data={data} />
}

// ✅ Client Components when needed
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <div onClick={() => setState(!state)} />
}

// ✅ Route Groups for organization
app/
├── (auth)/
│   ├── signin/
│   └── signup/
└── (dashboard)/
    ├── settings/
    └── profile/
```

### Performance Optimization

Use Next.js 15.5 optimizations:

```typescript
// ✅ Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <LoadingSpinner />
})

// ✅ Image optimization
import Image from 'next/image'
<Image
  src="/hero-bg.jpg"
  alt="Space background"
  fill
  priority
  className="object-cover"
/>

// ✅ Font optimization
import { GeistSans, GeistMono } from 'geist/font'
export const metadata: Metadata = {
  title: 'Space Portfolio',
  fonts: [GeistSans, GeistMono]
}
```

### TypeScript Integration

Strict TypeScript patterns following our established conventions:

```typescript
// ✅ API Response Interface (src/types/index.ts)
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ✅ Extended types with relations
export type ProjectWithDetails = Project & {
  projectTasks: ProjectTask[]
  skillsUtilized: ProjectSkill[]
}

export type PersonalInfoWithSocials = PersonalInfo & {
  socialLinks: SocialLink[]
}

// ✅ Strict component props
interface ComponentProps {
  title: string
  description?: string
  variant: 'cosmic' | 'stellar' | 'default'
  children: React.ReactNode
}

// ✅ API route typing with proper response types
export const GET = publicApiRoute(
  async (): Promise<NextResponse<ApiResponse<DataType[]>>> => {
    // Properly typed API handler
  }
)

// ✅ Server component typing with route params
interface RouteParams {
  params: Promise<{ id: string }>
}

export const GET = publicApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<DataType>>> => {
    const { id } = await params
    // Handle route with typed params
  }
)

// ✅ Hook return types
interface ActionResult {
  success: boolean
  data?: any
  error?: string
}

export function useDataActions(): {
  createData: (data: CreateDataForm) => Promise<ActionResult>
  isLoading: boolean
} {
  // Properly typed hook
}
```

**Type Organization Rules:**

- Global types in `src/types/index.ts`
- Component-specific prop types co-located with components
- Re-use Prisma types with extensions for API responses
- Always type API responses with `ApiResponse<T>` wrapper

## 5. 🔄 Versioning & Commit Strategy

### Conventional Commits (Enforced)

Follow conventional commit format for automated versioning:

```bash
# Feature additions
feat: add user authentication system
feat(dashboard): implement project management UI

# Bug fixes
fix: resolve password reset email delivery
fix(api): handle authentication edge cases

# Documentation
docs: update API documentation
docs(readme): add deployment instructions

# Styling changes
style: format with prettier
style(components): update space theme colors

# Refactoring
refactor: extract auth logic to service layer
refactor(hooks): simplify data fetching patterns

# Performance improvements
perf: optimize image loading performance
perf(api): add database query caching

# Tests
test: add authentication unit tests
test(e2e): implement dashboard workflow tests

# Build/tooling
build: update dependencies
ci: configure GitHub Actions workflow
chore: update development scripts
```

### Automated Release Workflow

```bash
# Development workflow
npm run dev          # Turbopack development server
npm run type-check   # TypeScript validation
npm run lint:fix     # ESLint + auto-fix
npm run format       # Prettier + Tailwind sorting

# Release workflow (automated)
npm run release      # Auto-bump from conventional commits
npm run release:minor # Force minor version bump
npm run release:patch # Force patch version bump
npm run build        # Production build validation
```

### Git Hooks & Quality Gates

Auto-enforced quality checks:

- **Pre-commit**: `lint-staged` runs ESLint + Prettier on staged files
- **Commit-msg**: `commitlint` validates conventional commit format
- **Pre-push**: TypeScript compilation check
- **Husky**: Manages all git hooks automatically

### Branch Strategy

Simple and effective branching:

```bash
main                 # Production-ready code
├── feature/auth     # Feature branches
├── fix/email-bug    # Bug fix branches
└── refactor/api     # Refactoring branches

# Merge strategy: Squash commits for clean history
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "feat: implement new feature"
# ... create PR and squash merge to main
```

### Changelog Generation

Beautiful automated changelog with emojis and space theme:

```markdown
# Changelog 🚀

## [1.2.0] - 2025-08-26

### ✨ Features

- **auth**: Add password reset system with email templates
- **dashboard**: Implement role-based access control

### 🐛 Bug Fixes

- **api**: Fix authentication middleware edge cases
- **ui**: Resolve mobile responsiveness issues

### 🔧 Improvements

- **perf**: Optimize database queries
- **dx**: Enhance development tooling
```

## Critical Development Workflow

### Build & Development

```bash
npm run dev          # Uses Turbopack for fast dev server
npm run build        # Production build with Turbopack
npm run type-check   # TypeScript validation without emit
```

### Code Quality Pipeline (Auto-enforced)

```bash
npm run lint:fix     # ESLint + auto-fix
npm run format       # Prettier with Tailwind class sorting
```

### VS Code Integration

- **Auto-format on save** with Prettier (single quotes, no semicolons)
- **ESLint auto-fix** on save with import organization
- **Pre-configured debugging** for Next.js server/client
- **Custom tasks** for all npm scripts (Ctrl+Shift+P → "Tasks")

## Project-Specific Patterns

### shadcn/ui Component Usage

```typescript
// Import pattern for UI components
import { Button } from '@/components/ui/button'

// Use variants with cva (class-variance-authority)
<Button variant="destructive" size="lg">Delete</Button>
```

### Space Theme Context

### Visual Direction

- **Dark cosmic backgrounds** with space colors (deep blues, purples)
- **Subtle space animations** (floating, orbital motions)
- **Modern typography** with Geist font family
- **Responsive design** with mobile-first approach

### Content Focus

Portfolio showcasing space exploration, astronomy, and space technology projects.

## Key Integration Points

### shadcn/ui Setup (`components.json`)

- **Style**: "new-york"
- **Base color**: "zinc"
- **CSS Variables**: Enabled
- **Icon library**: "lucide"

### Development Tools Integration

- **Husky**: Git hooks in `.husky/`
- **lint-staged**: Runs ESLint + Prettier on staged files
- **commitlint**: Validates conventional commit format
- **VS Code**: Complete workspace configuration in `.vscode/`

## Immediate Productivity Tips

1. **Start here**: `src/app/page.tsx` (currently just a Button component)
2. **Add components**: Import from `@/components/ui/` or create in `src/components/`
3. **Styling**: Use Tailwind classes, they'll auto-sort on save
4. **Development**: `npm run dev` starts with Turbopack for fast HMR
5. **Debugging**: Use VS Code's pre-configured "Next.js: debug full stack"

## Code Generation Guidelines

- Use `'use client'` for interactive components
- Prefer server components when possible
- Always type component props with interfaces
- Use `cn()` utility for conditional classes
- Import shadcn components from `@/components/ui/`
- Follow space theme with cosmic colors and subtle animations
- Ensure responsive design with Tailwind breakpoints
