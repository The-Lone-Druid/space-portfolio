/**
 * Generate random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

/**
 * Generate random integer between min and max (inclusive)
 */
export const randomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Easing functions for animations
 */
export const easing = {
  linear: (t: number): number => t,
  easeInOut: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number): number => t * t * t,
  bounce: (t: number): number => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
}

/**
 * Lerp (Linear Interpolation) function
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Convert degrees to radians
 */
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

/**
 * Convert radians to degrees
 */
export const radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI)
}
