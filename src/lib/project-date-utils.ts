import { format } from 'date-fns'

export interface ProjectDateRange {
  startDate: Date
  endDate?: Date
  isOngoing: boolean
}

export interface LegacyProjectData {
  projectDate: string
}

/**
 * Convert new date range format to legacy string format for API compatibility
 */
export function formatProjectDateRange(dateRange: ProjectDateRange): string {
  const { startDate, endDate, isOngoing } = dateRange

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

/**
 * Parse legacy project date string to extract date range information
 */
export function parseProjectDateString(
  dateString: string
): ProjectDateRange | null {
  try {
    // Handle "Present" cases
    if (dateString.includes('Present')) {
      const startPart = dateString.split(' - ')[0]
      const startDate = new Date(startPart)
      return {
        startDate: isNaN(startDate.getTime()) ? new Date() : startDate,
        isOngoing: true,
      }
    }

    // Handle date ranges
    if (dateString.includes(' - ')) {
      const [startPart, endPart] = dateString.split(' - ')
      const startDate = new Date(startPart)
      const endDate = new Date(endPart)

      return {
        startDate: isNaN(startDate.getTime()) ? new Date() : startDate,
        endDate: isNaN(endDate.getTime()) ? undefined : endDate,
        isOngoing: false,
      }
    }

    // Handle single date
    const singleDate = new Date(dateString)
    return {
      startDate: isNaN(singleDate.getTime()) ? new Date() : singleDate,
      isOngoing: false,
    }
  } catch {
    // Fallback to current date if parsing fails
    return {
      startDate: new Date(),
      isOngoing: false,
    }
  }
}
