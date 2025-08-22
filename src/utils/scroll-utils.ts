/**
 * Scroll to a specific section on the page
 */
export const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(`#${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Scroll to the top of the page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Get the current scroll position
 */
export const getScrollPosition = () => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * Check if an element is in the viewport
 */
export const isElementInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
