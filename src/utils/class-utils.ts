import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Enhanced class name utility that merges Tailwind classes intelligently
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Create glass morphism classes based on variant
 */
export const getGlassClass = (
  variant: 'cosmic' | 'nebula' | 'clear' = 'cosmic'
) => {
  const variants = {
    cosmic: 'glass-cosmic',
    nebula: 'glass-nebula',
    clear: 'glass-cosmic-clear',
  }
  return variants[variant]
}

/**
 * Generate category-specific color classes
 */
export const getCategoryColorClass = (category: string) => {
  const colorMap: Record<string, string> = {
    frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    backend: 'bg-green-500/20 text-green-400 border-green-500/30',
    database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    cloud: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    mobile: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    devops: 'bg-red-500/20 text-red-400 border-red-500/30',
    design: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return colorMap[category.toLowerCase()] || colorMap.other
}

/**
 * Generate hover classes for interactive elements
 */
export const getHoverClasses = (
  variant: 'card' | 'button' | 'link' = 'card'
) => {
  const variants = {
    card: 'hover:border-space-gold/50 hover:scale-105 hover:shadow-xl transition-all duration-300',
    button: 'hover:scale-105 hover:shadow-lg transition-all duration-200',
    link: 'hover:text-space-gold transition-colors duration-300',
  }
  return variants[variant]
}
