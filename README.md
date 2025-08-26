# Space Portfolio

A sophisticated, space-themed portfolio website built with Next.js 15, featuring an advanced dashboard with ISR (Incremental Static Regeneration) cache control and real-time content management.

## 🌟 Features

### Core Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS 4
- **Space Theme**: Cosmic design with animations and space-inspired visuals
- **Component System**: shadcn/ui components with consistent design system
- **Authentication**: NextAuth.js with role-based access control (ADMIN/EDITOR)
- **Database**: PostgreSQL with Prisma ORM and optimized queries
- **Responsive Design**: Mobile-first approach with modern layouts

### Advanced Features

- **ISR with Cache Control**: Sophisticated caching with tagged invalidation
- **Real-time Dashboard**: Comprehensive admin panel with live statistics
- **Dynamic Rendering**: Strategic server/client rendering optimization
- **Portfolio Completion**: Automated progress tracking with field validation
- **Cache Management**: On-demand revalidation with granular control
- **Theme System**: Dark/light mode with hydration-safe switching

### Dashboard Capabilities

- **Content Management**: Projects, services, skills, and personal information
- **Progress Tracking**: Real-time portfolio completion percentage
- **Cache Controls**: Manual cache invalidation and ISR management
- **Analytics**: Data insights and portfolio statistics
- **Role Management**: Secure admin and editor access levels

## 🏗️ Architecture

### Cache Strategy

- **Tagged Caching**: Granular cache control with `unstable_cache`
- **ISR Integration**: Static generation with on-demand revalidation
- **Service Layer**: Optimized data fetching with 60-second cache TTL
- **Dynamic Pages**: Real-time updates for admin interface

### Data Flow

```
Client Request → Middleware Auth → ISR Cache Check → Database Query → Response
                     ↓                ↓               ↓
              Role Validation → Cache Hit/Miss → Prisma ORM → Tagged Cache Store
```

### Service Architecture

- `personal-info-server.ts`: Personal data with social links caching
- `projects-server.ts`: Project portfolio with media management
- `services-server.ts`: Service offerings with category organization
- `skills-server.ts`: Technical skills with proficiency tracking
- `dashboard-server.ts`: Aggregated statistics and completion metrics

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: App Router with Turbopack
- **React 19**: Latest features with concurrent rendering
- **TypeScript**: Strict mode with path aliases (`@/*`)
- **Tailwind CSS 4**: Utility-first with CSS variables
- **shadcn/ui**: Component system (New York style)
- **Framer Motion**: Smooth animations and transitions

### Backend & Data

- **NextAuth.js**: Authentication with Prisma adapter
- **PostgreSQL**: Production database with optimized queries
- **Prisma ORM**: Type-safe database operations
- **ISR Caching**: Advanced cache control with tagging
- **Zod**: Runtime validation and type safety

### Development Tools

- **Turbopack**: Fast development and production builds
- **ESLint + Prettier**: Code quality with auto-formatting
- **Husky**: Git hooks with commit validation
- **Standard Version**: Automated changelog and versioning
- **TypeScript**: Full type safety with strict configuration

## 📋 Prerequisites

- **Node.js 18+**
- **PostgreSQL 14+** database
- **npm/yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd space-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/space_portfolio"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Optional: OAuth Providers
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Optional: Database Connection Pool
DATABASE_URL_POOLED="postgresql://username:password@localhost:5432/space_portfolio?pgbouncer=true"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Apply database migrations
npm run db:migrate

# Optional: Seed with sample data
npm run db:seed

# Optional: View data in Prisma Studio
npm run db:studio
```

### 5. Development Server

```bash
# Start development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

### 6. Admin Access

1. Create an account at `/auth/signin`
2. Update user role in database to `ADMIN` or `EDITOR`
3. Access dashboard at `/dashboard`

## 📚 Development Scripts

### Core Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build with optimizations
npm run start        # Start production server
npm run type-check   # TypeScript validation without emit
```

### Code Quality

```bash
npm run lint         # Run ESLint checks
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Database Operations

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (GUI)
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database (⚠️ destructive)
```

### Release Management

```bash
npm run release        # Auto-bump version from conventional commits
npm run release:minor  # Force minor version bump
npm run release:major  # Force major version bump
npm run release:patch  # Force patch version bump
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes with ISR controls
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Admin dashboard (protected)
│   ├── globals.css     # Global styles with CSS variables
│   ├── layout.tsx      # Root layout with theme provider
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── animations/     # Space-themed animations
│   ├── auth/           # Authentication components
│   ├── cards/          # Reusable card components
│   ├── dashboard/      # Dashboard-specific components
│   ├── forms/          # Form components with validation
│   ├── sections/       # Page section components
│   ├── shared/         # Shared utility components
│   ├── theme/          # Theme switching components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── auth.ts         # NextAuth configuration
│   ├── db.ts           # Database utilities
│   ├── utils.ts        # General utilities (cn, etc.)
│   └── validations.ts  # Zod schemas
├── services/           # Server-side data services
│   ├── personal-info-server.ts  # Personal data with caching
│   ├── projects-server.ts       # Project portfolio
│   ├── services-server.ts       # Service offerings
│   ├── skills-server.ts         # Technical skills
│   └── dashboard-server.ts      # Dashboard aggregations
└── types/              # TypeScript type definitions
```

## 🔒 Authentication & Authorization

### Setup Admin Access

1. **Create Account**: Visit `/auth/signin` and create an account
2. **Database Update**: Manually update user role in database:
   ```sql
   UPDATE "users" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
3. **Access Dashboard**: Navigate to `/dashboard` with admin privileges

### User Roles

- **ADMIN**: Full access to all dashboard features
- **EDITOR**: Content management access (if needed)
- **USER**: Public portfolio access only

### Protected Routes

- `/dashboard/*` - Requires ADMIN or EDITOR role
- `/auth/*` - Public authentication pages
- `/api/dashboard/*` - Protected API endpoints

## 🎯 ISR & Cache Management

### Cache Strategy Overview

The application uses Next.js 15's advanced caching with tagged invalidation for optimal performance:

### Service-Level Caching

Each service uses `unstable_cache` with specific tags:

```typescript
// Example: Personal Info Service
const cachedPersonalInfo = unstable_cache(
  async () => {
    // Database query logic
  },
  ['personal-info'],
  {
    revalidate: 60,
    tags: ['personal-info', 'social-links'],
  }
)
```

### Cache Tags System

- `personal-info` - Personal information data
- `social-links` - Social media links
- `projects` - Portfolio projects
- `services` - Service offerings
- `skills` - Technical skills
- `dashboard` - Dashboard aggregations

### Manual Cache Control

Dashboard provides cache management interface:

- **Clear All Cache**: `/api/dashboard/cache/clear`
- **Revalidate Tags**: `/api/dashboard/cache/revalidate`
- **Cache Status**: View cache hit/miss statistics

### Dynamic vs Static Rendering

- **Static**: Public portfolio pages (cached for performance)
- **Dynamic**: Dashboard pages (real-time updates)
- **Hybrid**: Selective dynamic rendering with `force-dynamic`

## 🎨 Theming & Styling

### Design System

- **Color Palette**: Space-themed with OKLCH color space
- **Typography**: Geist Sans and Geist Mono fonts
- **Components**: shadcn/ui with New York style
- **Animations**: Framer Motion with cosmic effects

### CSS Variables

Leverages CSS custom properties for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* Space-themed variables */
}
```

### Theme Switching

- **Provider**: `next-themes` with system preference
- **Storage**: localStorage with SSR-safe hydration
- **Components**: Automatic theme adaptation

## 📊 Database Schema

### Core Models

- **User**: Authentication and role management
- **PersonalInfo**: Portfolio owner information
- **Project**: Portfolio projects with media
- **Service**: Service offerings with categories
- **Skill**: Technical skills with proficiency
- **SocialLink**: Social media profiles

### Relationships

- User → PersonalInfo (1:1)
- PersonalInfo → SocialLinks (1:many)
- Projects, Services, Skills → User (many:1)

### Database Features

- **CUID IDs**: Collision-resistant unique identifiers
- **Timestamps**: Automatic created/updated tracking
- **Enums**: Type-safe categorical data
- **Indexes**: Optimized query performance

## 🚀 Production Deployment

### Build Process

```bash
# Install dependencies
npm ci

# Generate Prisma client
npm run db:generate

# Build with Turbopack
npm run build
```

### Environment Variables (Production)

```env
# Database (Production)
DATABASE_URL="postgresql://prod_user:password@prod_host:5432/space_portfolio"
DATABASE_URL_POOLED="postgresql://prod_user:password@pooler_host:5432/space_portfolio?pgbouncer=true"

# NextAuth (Production)
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="secure-production-secret"

# Email Configuration (Resend)
EMAIL_SERVICE="resend"
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="re_your_resend_api_key_here"

# Optional: OAuth Providers
GITHUB_ID="prod-github-client-id"
GITHUB_SECRET="prod-github-client-secret"
```

### Email Configuration (Resend)

This application uses [Resend](https://resend.com) for transactional emails including password reset functionality.

#### Setup Steps:

1. **Create Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Add Domain**: Verify your sending domain in Resend dashboard
3. **Get API Key**: Generate an API key from your Resend settings
4. **Configure Environment**:
   ```env
   EMAIL_SERVICE="resend"
   EMAIL_FROM="noreply@yourdomain.com"  # Must be verified domain
   RESEND_API_KEY="re_your_api_key_here"
   ```

#### Development Mode:

For development, use console logging:

```env
EMAIL_SERVICE="console"
EMAIL_FROM="noreply@localhost.com"
```

#### Email Testing:

- Access `/dashboard/settings` as admin
- Use the "Email Configuration Test" card
- Send test emails to verify setup
- Check Resend dashboard for delivery status

#### Features:

- Beautiful HTML email templates with space theme
- Password reset with secure token generation
- Rate limiting to prevent abuse
- Audit logging for security monitoring

### Performance Optimizations

- **Turbopack**: Fast builds and development
- **ISR Caching**: Reduced database load
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Optimized chunk splitting
- **Database Pooling**: Connection optimization

## 📈 Performance Features

### Caching Layers

1. **Browser Cache**: Static assets and API responses
2. **CDN Cache**: Vercel Edge Network (if deployed)
3. **ISR Cache**: Server-side static generation
4. **Database Cache**: Query result caching
5. **Component Cache**: React component memoization

### Optimization Techniques

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP/AVIF with lazy loading
- **Font Optimization**: Subset loading with `next/font`
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🔧 Development Workflow

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new portfolio feature"
git push origin feature/new-feature

# Automated checks run via Husky hooks
# - ESLint with auto-fix
# - Prettier formatting
# - Conventional commit validation
```

### Commit Convention

Uses conventional commits for automated changelog:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
perf: performance improvements
test: add tests
chore: maintenance tasks
```

### Release Process

```bash
# Automated versioning
npm run release        # Auto-detect version bump
npm run release:minor  # Force minor version
npm run release:major  # Force major version
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection

```bash
# Check database connection
npm run db:studio

# Reset database if needed
npm run db:reset
```

#### Cache Issues

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules && npm install
```

#### TypeScript Errors

```bash
# Check types without building
npm run type-check

# Regenerate Prisma types
npm run db:generate
```

### Debug Mode

Enable debug logging by setting environment variables:

```env
# Next.js debug
DEBUG=1

# Prisma debug
DEBUG="prisma:*"
```

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create feature branch: `git checkout -b feature/your-feature`
5. Make changes and commit: `git commit -m "feat: your feature"`
6. Push and create PR: `git push origin feature/your-feature`

### Code Standards

- **TypeScript**: Strict mode with proper typing
- **ESLint**: Configured rules with auto-fix
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🚀 Space-Themed Features

### Animations

- **Orbital Motion**: CSS animations for floating elements
- **Particle Systems**: Background space particles
- **Smooth Transitions**: Framer Motion page transitions
- **Hover Effects**: Interactive cosmic elements

### Visual Design

- **Color Palette**: Deep space blues and cosmic purples
- **Typography**: Modern fonts with space-age styling
- **Iconography**: Space-themed icons and graphics
- **Layout**: Cosmic-inspired component arrangements

---

**Built with ❤️ and ⭐ for the cosmos**
