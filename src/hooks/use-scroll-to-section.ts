export const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(`#${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const useScrollToSection = () => {
  return { scrollToSection }
}
