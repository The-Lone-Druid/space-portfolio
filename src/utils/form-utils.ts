/**
 * Format form data for API submission
 */
export const formatFormData = (data: Record<string, unknown>) => {
  const formData = new FormData()

  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, String(data[key]))
    }
  })

  return formData
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize form input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
}

/**
 * Generate form submission success message
 */
export const getSuccessMessage = (
  type: 'contact' | 'newsletter' | 'general' = 'contact'
) => {
  const messages = {
    contact: {
      title: 'Mission Control Received! 🚀',
      description:
        "Your message has been sent successfully. I'll get back to you soon!",
    },
    newsletter: {
      title: 'Welcome to the Crew! 🛸',
      description: "You've successfully subscribed to our space updates!",
    },
    general: {
      title: 'Success! ✨',
      description: 'Your request has been processed successfully.',
    },
  }
  return messages[type]
}

/**
 * Generate form submission error message
 */
export const getErrorMessage = (
  type: 'network' | 'validation' | 'general' = 'general'
) => {
  const messages = {
    network: {
      title: 'Houston, we have a problem! 🛰️',
      description:
        'Network error occurred. Please check your connection and try again.',
    },
    validation: {
      title: 'Invalid Data! 📡',
      description: 'Please check your input and try again.',
    },
    general: {
      title: 'Houston, we have a problem! 🛰️',
      description:
        'Something went wrong. Please try again or contact me directly.',
    },
  }
  return messages[type]
}
