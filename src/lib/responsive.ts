/**
 * Responsive utilities for consistent breakpoint usage across the application
 */

// Breakpoint values (matching Tailwind CSS defaults)
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * Check if current screen width matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Get current breakpoint based on screen width
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth

  if (width >= breakpoints.wide) return 'wide'
  if (width >= breakpoints.desktop) return 'desktop'
  if (width >= breakpoints.tablet) return 'tablet'
  return 'mobile'
}

/**
 * Responsive grid classes for consistent layouts
 */
export const responsiveGrids = {
  stats: 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  content: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  sidebar: 'grid gap-6 grid-cols-1 lg:grid-cols-4',
} as const

/**
 * Common responsive padding/margin classes
 */
export const responsiveSpacing = {
  container: 'px-4 sm:px-6 lg:px-8',
  section: 'py-8 sm:py-12 lg:py-16',
  card: 'p-4 sm:p-6',
} as const
