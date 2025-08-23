import { cn } from '@/lib/utils'

interface DashboardPageHeaderProps {
  title: string
  description?: string
  className?: string
  actions?: React.ReactNode
}

export function DashboardPageHeader({
  title,
  description,
  className,
  actions,
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
          {title}
        </h1>
        {description && <p className='text-lg text-white/70'>{description}</p>}
      </div>
      {actions && (
        <div className='flex flex-col gap-2 sm:flex-row'>{actions}</div>
      )}
    </div>
  )
}
