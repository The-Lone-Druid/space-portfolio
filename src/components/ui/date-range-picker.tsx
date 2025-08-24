'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  isOngoing?: boolean
  onStartDateChange: (date: Date | undefined) => void
  onEndDateChange: (date: Date | undefined) => void
  onOngoingChange: (ongoing: boolean) => void
  disabled?: boolean
  placeholder?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  isOngoing = false,
  onStartDateChange,
  onEndDateChange,
  onOngoingChange,
  disabled = false,
  placeholder = 'Pick project dates',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start')

  const handleDateSelect = (date: Date | undefined) => {
    if (activeInput === 'start') {
      onStartDateChange(date)
      // If start date is selected and no end date, focus end date next
      if (date && !endDate && !isOngoing) {
        setActiveInput('end')
      }
    } else {
      onEndDateChange(date)
      // Close popover when end date is selected
      if (date) {
        setIsOpen(false)
      }
    }
  }

  const handleOngoingToggle = (ongoing: boolean) => {
    onOngoingChange(ongoing)
    if (ongoing) {
      onEndDateChange(undefined)
    }
  }

  const formatDateRange = () => {
    if (!startDate) return placeholder

    const startFormatted = format(startDate, 'MMM yyyy')

    if (isOngoing) {
      return `${startFormatted} - Present`
    }

    if (endDate) {
      const endFormatted = format(endDate, 'MMM yyyy')
      return `${startFormatted} - ${endFormatted}`
    }

    return startFormatted
  }

  return (
    <div className='space-y-3'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'bg-card/50 border-border/50 text-foreground hover:bg-card/80 w-full justify-start text-left font-normal backdrop-blur-sm transition-all duration-300',
              !startDate && 'text-muted-foreground'
            )}
            disabled={disabled}
          >
            <CalendarIcon className='text-space-accent mr-2 h-4 w-4' />
            {formatDateRange()}
          </Button>
        </DialogTrigger>
        <DialogContent className='border-border/50 bg-card/95 max-h-[85vh] max-w-lg overflow-y-auto backdrop-blur-md'>
          <DialogHeader>
            <DialogTitle className='text-foreground flex items-center gap-2'>
              <CalendarIcon className='text-space-accent h-5 w-5' />
              Select Project Dates
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-6 p-1'>
            {/* Toggle for ongoing project */}
            <div className='bg-card/50 border-border/30 flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <label className='text-foreground text-sm font-medium'>
                  Ongoing Project
                </label>
                <p className='text-muted-foreground text-xs'>
                  Toggle if this project is currently active
                </p>
              </div>
              <Switch
                checked={isOngoing}
                onCheckedChange={handleOngoingToggle}
              />
            </div>

            {/* Date input selection */}
            <div className='flex gap-2'>
              <Button
                variant={activeInput === 'start' ? 'space' : 'outline'}
                size='sm'
                onClick={() => setActiveInput('start')}
                className={cn(
                  'flex-1 transition-all duration-200',
                  activeInput === 'start'
                    ? 'bg-space-accent hover:bg-space-stellar text-white shadow-lg'
                    : 'bg-card/30 border-border/50 hover:bg-space-accent/10 hover:border-space-accent/30'
                )}
              >
                Start Date
              </Button>
              {!isOngoing && (
                <Button
                  variant={activeInput === 'end' ? 'space' : 'outline'}
                  size='sm'
                  onClick={() => setActiveInput('end')}
                  className={cn(
                    'flex-1 transition-all duration-200',
                    activeInput === 'end'
                      ? 'bg-space-accent hover:bg-space-stellar text-white shadow-lg'
                      : 'bg-card/30 border-border/50 hover:bg-space-accent/10 hover:border-space-accent/30'
                  )}
                >
                  End Date
                </Button>
              )}
            </div>

            {/* Calendar with dropdown navigation */}
            <div className='border-border/30 bg-card/30 w-full rounded-lg border p-4'>
              <Calendar
                mode='single'
                captionLayout='dropdown'
                fromDate={new Date(1990, 0)} // Allow selection from 1990
                toDate={new Date()} // Don't allow future dates
                defaultMonth={activeInput === 'start' ? startDate : endDate}
                selected={activeInput === 'start' ? startDate : endDate}
                onSelect={handleDateSelect}
                disabled={date => {
                  // Disable future dates for both start and end
                  if (date > new Date()) return true

                  // If selecting end date, disable dates before start date
                  if (activeInput === 'end' && startDate) {
                    return date < startDate
                  }

                  return false
                }}
                className='w-full'
                classNames={{
                  months_dropdown: 'text-muted-foreground',
                  years_dropdown: 'text-muted-foreground',
                  caption_label: 'text-primary flex items-center gap-2 p-2',
                  table: 'w-full border-collapse mt-4',
                  head_row: 'flex w-full',
                  head_cell:
                    'text-muted-foreground rounded-md font-normal text-[0.8rem] flex-1 text-center py-2',
                  row: 'flex w-full mt-1',
                  cell: 'text-center text-sm p-0 relative flex-1 focus-within:relative focus-within:z-20',
                  day: 'h-9 w-full p-0 font-normal text-foreground hover:bg-space-accent/20 hover:text-space-accent transition-all duration-200 rounded-md mx-1',
                  day_selected:
                    'bg-space-accent text-white hover:bg-space-stellar focus:bg-space-accent focus:text-white shadow-md',
                  day_today:
                    'bg-accent border border-space-accent/50 text-foreground font-semibold',
                  day_outside: 'text-muted-foreground/50 opacity-50',
                  day_disabled:
                    'text-muted-foreground/30 opacity-30 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground/30',
                  day_hidden: 'invisible',
                }}
              />
            </div>

            {/* Current selection display */}
            <div className='border-border/30 border-t pt-4 text-sm'>
              <div className='bg-card/30 border-border/20 space-y-2 rounded-lg border p-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-foreground font-medium'>Start:</span>
                  <span className='text-muted-foreground'>
                    {startDate ? format(startDate, 'PPP') : 'Not selected'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-foreground font-medium'>End:</span>
                  <span className='text-muted-foreground'>
                    {isOngoing
                      ? 'Present'
                      : endDate
                        ? format(endDate, 'PPP')
                        : 'Not selected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
