import * as simpleIcons from 'simple-icons'

// Type definition for Simple Icons data
interface SimpleIconData {
  title: string
  slug: string
  hex: string
  source: string
  svg: string
  path: string
  guidelines?: string
  license?: {
    type: string
    url?: string
  }
}

/**
 * Get a Simple Icon by its name/slug
 * @param iconName - The icon name/slug (e.g., 'react', 'nextdotjs', 'typescript')
 * @returns The icon data or null if not found
 */
export function getSimpleIcon(iconName: string): SimpleIconData | null {
  try {
    // Convert to the format that simple-icons uses (prefixed with 'si' and camelCase)
    const normalizedName = iconName
      .toLowerCase()
      .replace(/[-_.]/g, '') // Remove separators
      .replace(/\s+/g, '') // Remove spaces

    // Create the property name that simple-icons uses
    const siPropertyName = `si${normalizedName.charAt(0).toUpperCase()}${normalizedName.slice(1)}`

    // Try different variations
    const variations = [
      siPropertyName,
      `si${iconName.charAt(0).toUpperCase()}${iconName.slice(1).toLowerCase()}`,
      `si${iconName.toLowerCase()}`,
      `si${iconName}`,
    ]

    for (const variation of variations) {
      // Use index access with safe type assertion for the dynamic property lookup
      const iconsRecord = simpleIcons as unknown as Record<
        string,
        SimpleIconData
      >
      const icon = iconsRecord[variation]
      if (icon && typeof icon === 'object' && 'path' in icon) {
        return {
          svg: icon.svg,
          hex: icon.hex,
          title: icon.title,
          slug: icon.slug,
          path: icon.path,
          source: icon.source,
          guidelines: icon.guidelines,
          license: icon.license,
        }
      }
    }

    return null
  } catch (error) {
    console.warn(`Icon "${iconName}" not found in simple-icons package:`, error)
    return null
  }
}

/**
 * Get SVG path data for rendering
 * @param iconName - The icon name/slug
 * @returns Object with path and hex color or null
 */
export function getSimpleIconData(
  iconName: string
): { path: string; hex: string; title: string } | null {
  const icon = getSimpleIcon(iconName)
  if (!icon) return null

  return {
    path: icon.path,
    hex: icon.hex,
    title: icon.title,
  }
}
