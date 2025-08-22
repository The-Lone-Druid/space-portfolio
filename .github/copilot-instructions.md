# Space Portfolio - AI Coding Guide

## Project Architecture

This is a **space-themed portfolio** built with Next.js 15 App Router, TypeScript, and shadcn/ui. The project is in early development with robust development tooling already established.

### Key Tech Stack

- **Next.js 15** with Turbopack and App Router (`src/app/`)
- **shadcn/ui (New York style)** - Component system with variants (`src/components/ui/`)
- **Tailwind CSS 4** - Utility-first styling with CSS variables (`src/app/globals.css`)
- **TypeScript strict mode** - Full type safety with path aliases (`@/*`)

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

### Versioning & Releases

```bash
npm run release      # Auto-bump version from conventional commits
npm run release:minor # Force minor version bump
npm run release:patch # Force patch version bump
```

**Git hooks auto-run**: `lint-staged` on pre-commit + `commitlint` validation

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

### Styling System

- **CSS Variables**: Use shadcn theme variables in `globals.css`
- **Tailwind Classes**: Auto-sorted by prettier-plugin-tailwindcss
- **Color Scheme**: OKLCH color space with light/dark theme support
- **Typography**: Geist Sans (`--font-geist-sans`) and Geist Mono fonts

### File Structure & Conventions

```
src/
├── app/             # Next.js App Router (pages, layouts, globals.css)
├── components/ui/   # shadcn/ui components only
├── components/      # Custom components (currently empty)
├── lib/utils.ts     # cn() utility for class merging
└── hooks/           # Custom hooks (not yet created)
```

### TypeScript Patterns

- **Path aliases**: `@/*` maps to `src/*`
- **Import order**: React/Next → 3rd party → internal → types
- **Component props**: Always use interfaces, prefer `ComponentNameProps`

## Commit Message Convention (Enforced)

```
feat: add space navigation component
fix: resolve mobile menu visibility issue
docs: update installation instructions
style: format with prettier
```

Types: `feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert`

**Beautiful changelog**: Auto-generated with emojis and space theme formatting

## Space Theme Context

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
