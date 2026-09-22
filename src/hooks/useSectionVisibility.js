import { useEffect, useState } from 'react'

export default function useSectionVisibility(sectionIds = [], options = { rootMargin: '-20% 0px -60% 0px', threshold: 0.3 }) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || null)

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, options)

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds.join(','), options])

  return activeSection
}
