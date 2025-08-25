import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface DashboardPageHeaderProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  className?: string
  actions?: React.ReactNode
  isLoading?: boolean
}

export function DashboardPageHeader({
  title,
  description,
  className,
  actions,
  isLoading = false,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className='text-center md:text-left'>
        <h1 className='mb-2 text-3xl font-bold tracking-tight text-white'>
          {isLoading ? (
            <Skeleton className='mx-auto h-8 w-64 md:mx-0' />
          ) : (
            title
          )}
        </h1>
        {(description || isLoading) && (
          <p className='text-lg text-white/70'>
            {isLoading ? (
              <Skeleton className='mx-auto h-6 w-96 md:mx-0' />
            ) : (
              description
            )}
          </p>
        )}
      </div>
      {actions && (
        <div className='flex flex-col gap-2 sm:flex-row'>{actions}</div>
      )}
    </div>
  )
}
