export default function useSmoothScroll() {
  const scrollTo = (id) => {
    if (typeof document === 'undefined') return
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    scrollTo,
    scrollToSection: scrollTo,
  }
}
