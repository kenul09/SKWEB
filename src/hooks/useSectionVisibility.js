import { useEffect, useState } from 'react'

/* A thin horizontal "line" across the middle of the viewport — whichever
   section crosses it is the active one. Defined at module level so the
   observer isn't recreated on every render. */
const OBSERVER_OPTIONS = { rootMargin: '-45% 0px -55% 0px', threshold: 0 }

export default function useSectionVisibility(sectionIds = []) {
  const [activeSection, setActiveSection] = useState(null)
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        } else {
          /* Leaving the line without another section taking over (e.g. scrolling
             back up into the hero) clears the active link. */
          setActiveSection((current) => (current === entry.target.id ? null : current))
        }
      })
    }, OBSERVER_OPTIONS)

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return activeSection
}
