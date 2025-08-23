'use client'

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({
  message = 'Loading...',
  className = 'h-64',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='text-center'>
        <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
        <p className='text-muted-foreground'>{message}</p>
      </div>
    </div>
  )
}
