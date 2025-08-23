# Dashboard Layout Documentation

## Overview

This dashboard implementation provides a fully responsive, professional admin interface for the Space Portfolio CMS. Built with Next.js 15, TypeScript, and shadcn/ui components.

## Architecture

### 📁 Folder Structure

```
src/
├── components/
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── dashboard-layout.tsx    # Main layout wrapper
│   │   ├── header.tsx              # Top navigation bar
│   │   ├── sidebar.tsx             # Desktop sidebar navigation
│   │   ├── mobile-sidebar.tsx      # Mobile drawer sidebar
│   │   ├── stats-card.tsx          # Reusable stats display
│   │   ├── recent-activity.tsx     # Activity feed component
│   │   ├── quick-actions.tsx       # Quick action buttons
│   │   └── index.ts               # Component exports
│   ├── providers/           # React context providers
│   │   ├── dashboard-provider.tsx  # Dashboard state management
│   │   └── index.ts               # Provider exports
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
│   ├── use-sidebar.ts      # Sidebar state management
│   ├── use-breakpoint.ts   # Responsive breakpoint detection
│   └── index.ts           # Hook exports
├── lib/
│   └── responsive.ts       # Responsive utility functions
└── app/admin/             # Admin dashboard pages
    ├── layout.tsx         # Admin layout wrapper
    ├── page.tsx          # Main dashboard
    ├── projects/         # Projects management
    ├── skills/           # Skills management
    ├── messages/         # Contact messages
    └── settings/         # Settings panel
```

## 🎯 Key Features

### Responsive Design

- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Adaptive Layout**: Sidebar collapses to drawer on mobile, full sidebar on desktop

### Component Architecture

- **Modular Components**: Each component has a single responsibility
- **TypeScript**: Full type safety with proper interfaces
- **Reusable**: Components designed for reuse across different pages
- **Accessible**: Built with accessibility best practices

### State Management

- **Custom Hooks**: Clean separation of state logic
- **Context Providers**: Global state management for dashboard
- **Local State**: Component-specific state where appropriate

## 🛠️ Components

### DashboardLayout

Main layout wrapper that provides consistent structure across all admin pages.

**Props:**

```typescript
interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  className?: string
}
```

**Features:**

- Responsive sidebar handling
- Header with user menu
- Main content area with scrolling
- Mobile-optimized navigation

### Sidebar

Desktop navigation sidebar with organized menu structure.

**Features:**

- Hierarchical navigation
- Active state highlighting
- Icon-based menu items
- Smooth transitions

### Header

Top navigation bar with user controls and actions.

**Features:**

- Mobile menu toggle
- User avatar dropdown
- Notifications badge
- Page title display

### StatsCard

Reusable component for displaying key metrics.

**Props:**

```typescript
interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}
```

## 🔧 Custom Hooks

### useSidebar

Manages sidebar state and responsive behavior.

**Returns:**

```typescript
interface UseSidebarReturn {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  close: () => void
  open: () => void
}
```

### useBreakpoint

Provides current responsive breakpoint information.

**Returns:**

```typescript
interface UseBreakpointReturn {
  breakpoint: 'mobile' | 'tablet' | 'desktop'
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}
```

## 📱 Responsive Behavior

### Mobile (< 768px)

- Sidebar hidden by default
- Hamburger menu in header
- Sidebar opens as slide-out drawer
- Touch-optimized interactions

### Tablet (768px - 1024px)

- Sidebar behavior similar to mobile
- Larger touch targets
- Optimized grid layouts

### Desktop (> 1024px)

- Fixed sidebar always visible
- Full navigation menu
- Optimized for mouse interactions
- Multi-column layouts

## 🎨 Styling System

### Tailwind CSS Classes

- Consistent spacing using Tailwind scale
- Responsive utilities (sm:, md:, lg:)
- Dark mode support built-in
- Custom CSS variables for theming

### Component Variants

- shadcn/ui component variants
- Consistent color scheme
- Accessible contrast ratios
- Smooth animations and transitions

## 🔐 Best Practices

### Code Quality

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Performance

- Lazy loading for heavy components
- Optimized re-renders
- Proper React keys
- Memoization where beneficial

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🚀 Usage Examples

### Basic Dashboard Page

```tsx
import { DashboardLayout, StatsCard } from '@/components/dashboard'

export default function MyPage() {
  return (
    <DashboardLayout title='My Page'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Users'
          value={1234}
          description='Active users'
          trend={{ value: 12, isPositive: true }}
        />
      </div>
    </DashboardLayout>
  )
}
```

### Using Dashboard Context

```tsx
import { useDashboard } from '@/components/providers'

function MyComponent() {
  const { sidebar, breakpoint } = useDashboard()

  return (
    <div>
      {breakpoint.isMobile && (
        <button onClick={sidebar.toggle}>Toggle Menu</button>
      )}
    </div>
  )
}
```

## 📋 Available Pages

1. **Dashboard** (`/admin`) - Overview with stats and recent activity
2. **Projects** (`/admin/projects`) - Project management with cards and stats
3. **Skills** (`/admin/skills`) - Skills management with categories and progress
4. **Messages** (`/admin/messages`) - Contact form submissions with table view
5. **Settings** (`/admin/settings`) - Configuration and preferences

## 🔄 Future Enhancements

- [ ] Data table sorting and filtering
- [ ] Bulk actions for list items
- [ ] Advanced search functionality
- [ ] Real-time notifications
- [ ] Drag-and-drop reordering
- [ ] Export functionality
- [ ] Advanced analytics charts
- [ ] Multi-user roles and permissions

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Dependencies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Lucide React (icons)
- next-auth (authentication)

This dashboard provides a solid foundation for content management with room for future enhancements and customizations.
