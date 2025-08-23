'use client'

import { cn } from '@/lib/utils'
import { Rocket } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'rocket' | 'orbit' | 'pulse'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

const containerSizeClasses = {
  sm: 'h-16',
  md: 'h-32',
  lg: 'h-48',
  xl: 'h-64',
}

function DefaultSpinner({
  size = 'md',
  className,
}: {
  size: LoadingSpinnerProps['size']
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-space-accent/30 border-t-space-gold animate-spin rounded-full border-2',
        sizeClasses[size!],
        className
      )}
    />
  )
}

function RocketSpinner({
  size = 'md',
  className,
}: {
  size: LoadingSpinnerProps['size']
  className?: string
}) {
  return (
    <div className={cn('relative', sizeClasses[size!], className)}>
      <div className='absolute inset-0 animate-spin'>
        <div className='border-space-accent/20 border-t-space-gold h-full w-full rounded-full border-2' />
      </div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <Rocket className='text-space-gold animate-pulse-cosmic h-1/2 w-1/2' />
      </div>
    </div>
  )
}

function OrbitSpinner({
  size = 'md',
  className,
}: {
  size: LoadingSpinnerProps['size']
  className?: string
}) {
  return (
    <div className={cn('relative', sizeClasses[size!], className)}>
      {/* Outer orbit */}
      <div className='animate-spin-slow border-space-accent/30 absolute inset-0 rounded-full border'>
        <div className='bg-space-gold animate-twinkle absolute -top-1 -right-1 h-2 w-2 rounded-full' />
      </div>
      {/* Inner orbit */}
      <div className='animate-spin-reverse border-space-stellar/50 absolute inset-2 rounded-full border'>
        <div
          className='animate-twinkle absolute -top-0.5 -left-0.5 h-1 w-1 rounded-full bg-white'
          style={{ animationDelay: '1s' }}
        />
      </div>
      {/* Center */}
      <div className='bg-gradient-stellar animate-pulse-cosmic absolute inset-1/3 rounded-full' />
    </div>
  )
}

function PulseSpinner({
  size = 'md',
  className,
}: {
  size: LoadingSpinnerProps['size']
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size!],
        className
      )}
    >
      <div className='bg-space-accent/20 absolute h-full w-full animate-ping rounded-full' />
      <div
        className='bg-space-stellar/40 absolute h-3/4 w-3/4 animate-ping rounded-full'
        style={{ animationDelay: '0.5s' }}
      />
      <div className='bg-space-gold animate-pulse-cosmic relative h-1/2 w-1/2 rounded-full' />
    </div>
  )
}

export function LoadingSpinner({
  message = 'Loading...',
  className,
  size = 'md',
  variant = 'default',
}: LoadingSpinnerProps) {
  const SpinnerComponent = {
    default: DefaultSpinner,
    rocket: RocketSpinner,
    orbit: OrbitSpinner,
    pulse: PulseSpinner,
  }[variant]

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        containerSizeClasses[size],
        className
      )}
    >
      <div className='space-y-4 text-center'>
        <div className='flex justify-center'>
          <SpinnerComponent size={size} />
        </div>
        {message && (
          <p className='animate-pulse text-sm font-medium text-white/70'>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

// Compact version for inline use
export function LoadingSpinnerInline({
  size = 'sm',
  variant = 'default',
  className,
}: Omit<LoadingSpinnerProps, 'message'>) {
  const SpinnerComponent = {
    default: DefaultSpinner,
    rocket: RocketSpinner,
    orbit: OrbitSpinner,
    pulse: PulseSpinner,
  }[variant]

  return <SpinnerComponent size={size} className={className} />
}
