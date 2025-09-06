# 🚀 Space Portfolio

A sophisticated, space-themed personal portfolio website built with cutting-edge technologies. Features a comprehensive admin dashboard, advanced caching strategies, and beautiful cosmic design elements.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6.14-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql)

## ✨ Key Features

### 🎯 Core Capabilities

- **🌌 Space-Themed Design** - Cosmic animations, stellar gradients, and space-inspired UI
- **⚡ Next.js 15 with Turbopack** - Blazing fast development and production builds
- **🔐 Secure Authentication** - NextAuth.js with role-based access control
- **📊 Admin Dashboard** - Complete content management system
- **🗄️ PostgreSQL + Prisma** - Type-safe database operations with optimized queries
- **📱 Responsive Design** - Mobile-first approach with modern layouts

### 🚀 Advanced Features

- **💾 ISR Cache Control** - Advanced caching with tagged invalidation
- **📈 Portfolio Analytics** - Real-time completion tracking and statistics
- **🎨 shadcn/ui Components** - Consistent design system with New York style
- **📧 Email Integration** - Password reset and notifications via Resend
- **🔄 Real-time Updates** - Dynamic content with optimistic UI updates
- **🎭 Theme System** - Dark/light mode with seamless transitions

## 🏗️ Tech Stack

### Frontend & UI

- **[Next.js 15.5](https://nextjs.org)** - App Router with Turbopack for lightning-fast builds
- **[React 19](https://react.dev)** - Latest features with concurrent rendering
- **[TypeScript 5](https://typescriptlang.org)** - Strict mode with path aliases (`@/*`)
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first styling with CSS variables
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful components (New York style)
- **[Framer Motion](https://framer.com/motion)** - Smooth animations and page transitions

### Backend & Data

- **[NextAuth.js 4.24](https://next-auth.js.org)** - Secure authentication with Prisma adapter
- **[PostgreSQL 14+](https://postgresql.org)** - Robust relational database
- **[Prisma ORM 6.14](https://prisma.io)** - Type-safe database operations
- **[Zod](https://zod.dev)** - Runtime validation and type safety
- **[Resend](https://resend.com)** - Modern email delivery service

### Development & Quality

- **[Turbopack](https://turbo.build)** - Next-generation bundler for fast development
- **[ESLint + Prettier](https://eslint.org)** - Code quality with auto-formatting
- **[Husky](https://typicode.github.io/husky)** - Git hooks with commit validation
- **[Standard Version](https://github.com/conventional-changelog/standard-version)** - Automated changelog and versioning

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org)
- **PostgreSQL 14+** - [Download here](https://postgresql.org/download) or use cloud provider
- **npm/yarn/pnpm** - Package manager (npm comes with Node.js)
- **Git** - [Download here](https://git-scm.com)

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/space-portfolio.git
cd space-portfolio

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/space_portfolio"

# Authentication (Generate a secure secret: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-32-character-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Account (for initial setup)
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-admin-password"

# Email Configuration (for password reset)
EMAIL_SERVICE="console"  # Use "console" for development, "resend" for production
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="re_your_resend_api_key_here"  # Only needed if using Resend

# Site Configuration
SITE_URL="http://localhost:3000"
SITE_NAME="Space Portfolio"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Create and run database migrations
npm run db:migrate

# Optional: Seed with sample data
npm run db:seed
```

### 4. Start Development

```bash
# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio! 🎉

### 5. Access Admin Dashboard

1. **Create Account**: Go to `/auth/signin` and create your account
2. **Set Admin Role**: Update your user role in the database:
   ```sql
   -- Connect to your database and run:
   UPDATE "users" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
3. **Access Dashboard**: Navigate to `/dashboard` to manage your portfolio content

## 📚 Available Scripts

### Development Commands

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server with Turbopack |
| `npm run build`      | Build for production                    |
| `npm run start`      | Start production server                 |
| `npm run type-check` | Run TypeScript type checking            |

### Code Quality Commands

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run lint`         | Run ESLint checks                   |
| `npm run lint:fix`     | Fix ESLint issues automatically     |
| `npm run format`       | Format code with Prettier           |
| `npm run format:check` | Check if code is properly formatted |

### Database Commands

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `npm run db:generate` | Generate Prisma client            |
| `npm run db:migrate`  | Run database migrations           |
| `npm run db:push`     | Push schema changes (development) |
| `npm run db:studio`   | Open Prisma Studio (database GUI) |
| `npm run db:seed`     | Seed database with sample data    |
| `npm run db:reset`    | ⚠️ Reset database (destructive)   |

### Release Commands

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run release`       | Auto-bump version from commits |
| `npm run release:minor` | Force minor version bump       |
| `npm run release:major` | Force major version bump       |
| `npm run release:patch` | Force patch version bump       |

## 📁 Project Structure

```
src/
├── app/                     # Next.js 15 App Router
│   ├── api/                # API routes with security wrappers
│   │   ├── auth/           # Authentication endpoints
│   │   ├── dashboard/      # Protected admin APIs
│   │   ├── hero/           # Public portfolio APIs
│   │   └── personal-info/  # Portfolio data APIs
│   ├── auth/               # Authentication pages
│   │   ├── signin/         # Sign in page
│   │   ├── signup/         # Sign up page
│   │   └── unauthorized/   # Access denied page
│   ├── dashboard/          # Protected admin interface
│   │   ├── projects/       # Project management
│   │   ├── services/       # Service management
│   │   ├── skills/         # Skills management
│   │   └── settings/       # Admin settings
│   ├── globals.css         # Global styles & CSS variables
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage (portfolio display)
├── components/             # React components by category
│   ├── ui/                 # shadcn/ui components ONLY
│   ├── animations/         # Space-themed animations
│   ├── auth/               # Authentication components
│   ├── cards/              # Reusable card components
│   ├── dashboard/          # Dashboard-specific components
│   ├── forms/              # Form components with validation
│   ├── sections/           # Page section components
│   ├── seo/                # SEO and meta components
│   ├── shared/             # Shared utility components
│   └── theme/              # Theme switching components
├── hooks/                  # Custom React hooks
│   ├── use-auth.ts         # Authentication state
│   ├── use-dashboard-data.ts # Dashboard data fetching
│   ├── use-portfolio-data.ts # Portfolio data fetching
│   └── use-*.ts            # Feature-specific hooks
├── lib/                    # Utility libraries & config
│   ├── auth.ts             # NextAuth configuration
│   ├── auth-utils.ts       # Authentication helpers
│   ├── db.ts               # Database utilities
│   ├── email.ts            # Email service (Resend)
│   ├── rate-limit.ts       # API rate limiting
│   ├── utils.ts            # General utilities (cn, etc.)
│   └── validations.ts      # Zod validation schemas
├── services/               # Business logic layer (server-side)
│   ├── dashboard-service.ts     # Dashboard aggregations
│   ├── personal-info-service.ts # Personal data management
│   ├── portfolio-service.ts     # Portfolio data fetching
│   ├── projects-service.ts      # Project management
│   ├── services-service.ts      # Service offerings
│   └── skills-service.ts        # Skills management
└── types/                  # TypeScript definitions
    ├── auth.ts             # Authentication types
    ├── index.ts            # Global types & API responses
    └── *.ts                # Feature-specific types
```

## 🔐 Authentication & Security

### User Roles & Access Control

| Role       | Access Level       | Permissions                                              |
| ---------- | ------------------ | -------------------------------------------------------- |
| **ADMIN**  | Full Access        | All dashboard features, user management, system settings |
| **EDITOR** | Content Management | Create/edit portfolio content, limited admin access      |
| **USER**   | Public Access      | View portfolio only                                      |

### Setting Up Admin Access

#### Method 1: Database Update (Recommended)

```sql
-- Connect to your PostgreSQL database
UPDATE "users" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

#### Method 2: Using Prisma Studio

```bash
# Open Prisma Studio
npm run db:studio

# Navigate to Users table
# Find your user record
# Change role field from 'USER' to 'ADMIN'
# Save changes
```

### Protected Routes

| Route Pattern      | Required Role | Description             |
| ------------------ | ------------- | ----------------------- |
| `/dashboard/*`     | ADMIN/EDITOR  | Admin dashboard access  |
| `/api/dashboard/*` | ADMIN/EDITOR  | Protected API endpoints |
| `/auth/*`          | Public        | Authentication pages    |
| `/*`               | Public        | Portfolio display       |

### Security Features

- **JWT-based Authentication** - Secure session management
- **Role-based Access Control** - Granular permission system
- **Rate Limiting** - API abuse prevention
- **CSRF Protection** - Cross-site request forgery prevention
- **Secure Headers** - Security best practices implemented
- **Password Hashing** - bcryptjs for secure password storage

## 📧 Email Configuration

### Development Setup (Console Logging)

For development, emails are logged to the console:

```env
EMAIL_SERVICE="console"
EMAIL_FROM="noreply@localhost.com"
```

### Production Setup (Resend)

For production, configure [Resend](https://resend.com) for reliable email delivery:

1. **Create Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Verify Domain**: Add and verify your sending domain
3. **Get API Key**: Generate an API key from settings
4. **Configure Environment**:

```env
EMAIL_SERVICE="resend"
EMAIL_FROM="noreply@yourdomain.com"  # Must match verified domain
RESEND_API_KEY="re_your_api_key_here"
```

### Email Features

- **Password Reset** - Secure token-based password recovery
- **Welcome Emails** - Onboarding for new users
- **Security Alerts** - Login notifications and security events
- **Beautiful Templates** - Space-themed HTML email designs

### Testing Email Setup

1. Access `/dashboard/settings` as admin
2. Use the "Email Configuration Test" section
3. Send test emails to verify setup
4. Check Resend dashboard for delivery status

## 🚀 Deployment Guide

### Prerequisites for Production

- **PostgreSQL Database** - Cloud provider (Vercel Postgres, Supabase, Railway, etc.)
- **Domain Name** - For email sending and OAuth callbacks
- **Resend Account** - For email functionality (recommended)

### Environment Variables (Production)

```env
# Database (Production)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth (Production)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="super-secure-secret-at-least-32-characters-long"

# Email (Production)
EMAIL_SERVICE="resend"
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="re_your_production_api_key"

# Admin Account
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="secure-admin-password"

# Site Configuration
SITE_URL="https://yourdomain.com"
SITE_NAME="Your Portfolio Name"
```

### Deployment Steps

#### 1. Database Setup

**Option A: Vercel Postgres**

```bash
# Install Vercel CLI
npm i -g vercel

# Create Postgres database
vercel postgres create your-portfolio-db

# Get connection string from Vercel dashboard
```

**Option B: Supabase**

```bash
# Create project at supabase.com
# Copy PostgreSQL connection string
# Enable row level security if needed
```

**Option C: Railway**

```bash
# Create project at railway.app
# Add PostgreSQL service
# Copy connection string from settings
```

#### 2. Build & Deploy

**Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Deploy again to apply changes
vercel --prod
```

**Netlify**

```bash
# Build the project
npm run build

# Deploy to Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

**Self-hosted**

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm i -g pm2
pm2 start npm --name "space-portfolio" -- start
```

#### 3. Post-Deployment Setup

1. **Run Migrations**:

   ```bash
   # SSH into your server or use your platform's console
   npm run db:migrate
   ```

2. **Create Admin User**:
   - Visit `/auth/signin` on your live site
   - Create your admin account
   - Update role in database to 'ADMIN'

3. **Test Email Functionality**:
   - Go to `/dashboard/settings`
   - Use email test feature
   - Verify emails are being delivered

### Performance Optimizations

- **Database Connection Pooling** - Configure for production load
- **CDN Integration** - Leverage Vercel Edge Network or CloudFlare
- **Image Optimization** - Automatic WebP/AVIF conversion
- **Caching Strategy** - ISR with tagged invalidation
- **Bundle Analysis** - Monitor and optimize bundle size

## 🎨 Customization Guide

### Theming & Design

#### Color Scheme

The space theme uses CSS variables for easy customization:

```css
/* src/app/globals.css */
:root {
  --space-cosmic: 230 35% 7%; /* Deep space blue */
  --space-accent: 200 98% 39%; /* Bright cosmic blue */
  --space-gold: 45 93% 58%; /* Golden nebula */
  --space-purple: 280 100% 70%; /* Cosmic purple */
}
```

#### Custom Components

Create new components following the established patterns:

```typescript
// components/custom/my-component.tsx
import { cn } from '@/lib/utils'

interface MyComponentProps {
  variant?: 'cosmic' | 'stellar' | 'default'
  className?: string
  children: React.ReactNode
}

export function MyComponent({
  variant = 'default',
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        'base-styles',
        variant === 'cosmic' && 'glass-cosmic',
        variant === 'stellar' && 'gradient-stellar',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### Content Management

#### Adding New Portfolio Sections

1. **Update Database Schema**:

   ```prisma
   // prisma/schema.prisma
   model NewSection {
     id        String   @id @default(cuid())
     title     String
     content   String
     isActive  Boolean  @default(true)
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt

     @@map("new_sections")
   }
   ```

2. **Create Service Layer**:

   ```typescript
   // src/services/new-section-service.ts
   import { prisma } from '@/lib/prisma'
   import { unstable_cache } from 'next/cache'

   export const getNewSectionsServer = unstable_cache(
     async () => {
       return await prisma.newSection.findMany({
         where: { isActive: true },
         orderBy: { createdAt: 'desc' },
       })
     },
     ['new-sections'],
     {
       tags: ['new-sections'],
       revalidate: 60,
     }
   )
   ```

3. **Add API Routes**:

   ```typescript
   // src/app/api/new-sections/route.ts
   import { publicApiRoute } from '@/lib/auth-utils'
   import { getNewSectionsServer } from '@/services/new-section-service'

   export const GET = publicApiRoute(async () => {
     const sections = await getNewSectionsServer()
     return NextResponse.json({ success: true, data: sections })
   })
   ```

4. **Create Dashboard Interface**:

   ```typescript
   // src/app/dashboard/new-sections/page.tsx
   import { NewSectionsList } from '@/components/dashboard/new-sections-list'
   import { getNewSectionsServer } from '@/services/new-section-service'

   export default async function NewSectionsPage() {
     const sections = await getNewSectionsServer()

     return (
       <div className="space-y-6">
         <h1>Manage New Sections</h1>
         <NewSectionsList sections={sections} />
       </div>
     )
   }
   ```

## 🛠️ Development Workflow

### Git Workflow & Conventional Commits

This project uses conventional commits for automated versioning:

```bash
# Feature development
git checkout -b feature/portfolio-analytics
git commit -m "feat: add portfolio completion analytics"

# Bug fixes
git commit -m "fix: resolve dashboard loading issue"

# Documentation
git commit -m "docs: update deployment guide"

# Styling changes
git commit -m "style: improve mobile responsiveness"

# Refactoring
git commit -m "refactor: optimize database queries"
```

### Commit Types

| Type       | Description      | Example                            |
| ---------- | ---------------- | ---------------------------------- |
| `feat`     | New feature      | `feat: add project filtering`      |
| `fix`      | Bug fix          | `fix: resolve email sending issue` |
| `docs`     | Documentation    | `docs: update setup guide`         |
| `style`    | Code style       | `style: format with prettier`      |
| `refactor` | Code refactoring | `refactor: extract auth logic`     |
| `perf`     | Performance      | `perf: optimize image loading`     |
| `test`     | Testing          | `test: add authentication tests`   |
| `chore`    | Maintenance      | `chore: update dependencies`       |

### Automated Quality Checks

Git hooks automatically run quality checks:

- **Pre-commit**: ESLint + Prettier on staged files
- **Commit-msg**: Conventional commit format validation
- **Pre-push**: TypeScript compilation check

### Release Process

```bash
# Automated version bumping based on conventional commits
npm run release        # Auto-detect version bump
npm run release:minor  # Force minor version (1.0.0 → 1.1.0)
npm run release:major  # Force major version (1.0.0 → 2.0.0)
npm run release:patch  # Force patch version (1.0.0 → 1.0.1)
```

### VS Code Integration

The project includes VS Code configuration for optimal development:

- **Auto-format on save** with Prettier
- **ESLint integration** with auto-fix
- **TypeScript IntelliSense** with path aliases
- **Debugging configuration** for Next.js
- **Recommended extensions** for best experience

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Database Connection Issues

**Problem**: `Error: Can't reach database server`

**Solutions**:

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Verify connection string format
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Test connection with psql
psql $DATABASE_URL

# Reset Prisma client
npm run db:generate
```

#### Authentication Problems

**Problem**: `NextAuth session not working`

**Solutions**:

```bash
# Verify environment variables
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL

# Clear browser cookies and localStorage
# Check if domain matches NEXTAUTH_URL

# Regenerate NextAuth secret
openssl rand -base64 32
```

#### Build Failures

**Problem**: `Type errors during build`

**Solutions**:

```bash
# Check TypeScript errors
npm run type-check

# Regenerate Prisma types
npm run db:generate

# Clear Next.js cache
rm -rf .next && npm run build
```

#### Email Not Sending

**Problem**: `Emails not being delivered`

**Solutions**:

```bash
# Check Resend API key validity
# Verify sending domain is verified in Resend
# Check email service configuration:

EMAIL_SERVICE="resend"  # Not "console"
EMAIL_FROM="noreply@verified-domain.com"
RESEND_API_KEY="re_valid_api_key"
```

### Performance Issues

**Problem**: `Slow page loading`

**Solutions**:

```bash
# Check database query performance
npm run db:studio

# Analyze bundle size
npm run build && npx @next/bundle-analyzer

# Enable caching
# Check ISR cache configuration in services
```

### Getting Help

If you encounter issues not covered here:

1. **Check the logs**: Browser console and server logs
2. **Review environment variables**: Ensure all required vars are set
3. **Verify database state**: Use Prisma Studio to inspect data
4. **Test in development**: Ensure issues persist across environments
5. **Create an issue**: Include error messages, environment details, and steps to reproduce

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. **Fork the repository**
2. **Clone your fork**: `git clone <your-fork-url>`
3. **Install dependencies**: `npm install`
4. **Create feature branch**: `git checkout -b feature/amazing-feature`
5. **Make your changes** following our coding standards
6. **Commit with conventional format**: `git commit -m "feat: add amazing feature"`
7. **Push to your fork**: `git push origin feature/amazing-feature`
8. **Create Pull Request** with detailed description

### Code Standards

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Follow established patterns in `src/components/`
- **API Routes**: Use security wrappers from `@/lib/auth-utils`
- **Database**: Create migrations for schema changes
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes

### Review Process

1. **Automated Checks**: All PRs must pass ESLint, Prettier, and TypeScript checks
2. **Manual Review**: Code review focusing on architecture and security
3. **Testing**: Verify changes work in development environment
4. **Documentation**: Ensure changes are documented appropriately

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🚀 Built with ❤️ for the cosmos 🌌**

_Ready to launch your space-themed portfolio? Follow the setup guide above and start exploring the digital universe!_

[⭐ Star this repo](https://github.com/yourusername/space-portfolio) if you found it helpful!

</div>
