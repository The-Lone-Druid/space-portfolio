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

### Service Layer Pattern

Always separate business logic from API routes and UI components:

```typescript
// ✅ Good: Service layer handles business logic
export class UserService {
  static async createUser(data: CreateUserData): Promise<ServiceResponse> {
    try {
      // Business logic here
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: 'Failed to create user' }
    }
  }
}

// ✅ API route delegates to service
export async function POST(request: NextRequest) {
  const result = await UserService.createUser(data)
  return NextResponse.json(result)
}
```

### API Route Security Wrapper Pattern

Use consistent security wrappers for all API routes:

```typescript
// ✅ Consistent security pattern
export const adminApiRoute = createApiWrapper('ADMIN')
export const editorApiRoute = createApiWrapper('EDITOR')
export const publicApiRoute = createApiWrapper('PUBLIC')

// Usage in API routes
export const POST = adminApiRoute(async (request, { user }) => {
  // Handler with authenticated user context
})
```

### Form Validation Pattern

Centralize validation schemas and use consistent error handling:

```typescript
// ✅ Centralized validation in lib/validations.ts
export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
})

// ✅ Consistent form handling
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(createUserSchema),
})
```

### Error Handling Pattern

Use consistent error handling across the application:

```typescript
// ✅ Standardized service response
interface ServiceResponse<T = any> {
  success: boolean
  error?: string
  data?: T
}

// ✅ Consistent error boundaries
export class AppError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message)
  }
}
```

## 2. 📁 Folder Structure & Organization

### Strict Folder Hierarchy

Follow this exact structure for consistency and scalability:

```
src/
├── app/                 # Next.js 15 App Router
│   ├── (routes)/        # Route groups for organization
│   ├── api/             # API endpoints with route handlers
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Protected dashboard routes
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Homepage
├── components/          # Reusable components by category
│   ├── ui/              # shadcn/ui components ONLY
│   ├── auth/            # Authentication-specific components
│   ├── dashboard/       # Dashboard-specific components
│   ├── forms/           # Form components with validation
│   ├── cards/           # Card-based components
│   ├── sections/        # Page section components
│   ├── animations/      # Animation and motion components
│   └── shared/          # Shared utility components
├── hooks/               # Custom React hooks
│   ├── use-auth.ts      # Authentication hooks
│   ├── use-api.ts       # API interaction hooks
│   └── use-*.ts         # Feature-specific hooks
├── lib/                 # Utility libraries and configurations
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Database configuration
│   ├── utils.ts         # General utilities (cn, etc.)
│   ├── validations.ts   # Zod validation schemas
│   └── *.ts             # Feature-specific utilities
├── services/            # Business logic layer
│   ├── auth-service.ts  # Authentication business logic
│   ├── user-service.ts  # User management logic
│   └── *-service.ts     # Feature-specific services
└── types/               # TypeScript type definitions
    ├── auth.ts          # Authentication types
    ├── api.ts           # API response types
    └── index.ts         # Global type exports
```

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
```

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

Strict TypeScript patterns:

```typescript
// ✅ Strict component props
interface ComponentProps {
  title: string
  description?: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

// ✅ API route typing
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  // Typed request/response
}

// ✅ Server component typing
interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  // Properly typed page props
}
```

Typescript type interfaces should be consistently declared unser src/types folder, but if it's used as a prop then it should be with the component only, try to re-use types as much as possible and keep it clean and consistent.

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
