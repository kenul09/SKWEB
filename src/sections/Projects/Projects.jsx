import { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Button from '../../components/ui/Button'
import { useLanguage } from '../../hooks'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { translations } from '../../translations'

import styles from './Projects.module.css'

const OVERFLOW_EPSILON = 2

function getHostname(url) {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

function BrowserBar({ link, soonLabel }) {
  const hostname = link ? getHostname(link) : ''

  return (
    <div className={styles.browserBar} aria-hidden="true">
      <span className={styles.browserDot} />
      <span className={styles.browserDot} />
      <span className={styles.browserDot} />
      <span className={styles.browserUrl}>{hostname || soonLabel}</span>
    </div>
  )
}

function ProjectCard({ project, buttons }) {
  const hasLink = Boolean(project.link)
  const Wrapper = hasLink ? 'a' : 'article'
  const wrapperProps = hasLink
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper className={styles.card} {...wrapperProps}>
      <BrowserBar link={project.link} soonLabel={buttons.soon} />

      <div className={styles.mediaBody}>
        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div
            className={styles.cover}
            style={{ '--project-color': project.color }}
          >
            <span className={styles.coverTitle}>{project.title}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.type}>{project.type}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <span className={hasLink ? styles.visitLink : styles.soonLink}>
          {hasLink ? (
            <>
              {buttons.visit}
              <FiArrowUpRight aria-hidden="true" />
            </>
          ) : (
            buttons.soon
          )}
        </span>
      </div>
    </Wrapper>
  )
}

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const { scrollToSection } = useSmoothScroll()

  const trackRef = useRef(null)
  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    atStart: true,
    atEnd: true,
  })

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    const hasOverflow = scrollWidth - clientWidth > OVERFLOW_EPSILON

    setScrollState({
      hasOverflow,
      atStart: scrollLeft <= OVERFLOW_EPSILON,
      atEnd: scrollLeft >= scrollWidth - clientWidth - OVERFLOW_EPSILON,
    })
  }, [])

  useEffect(() => {
    updateScrollState()

    const track = trackRef.current
    if (!track) return

    window.addEventListener('resize', updateScrollState)
    track.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      window.removeEventListener('resize', updateScrollState)
      track.removeEventListener('scroll', updateScrollState)
    }
  }, [updateScrollState, language])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return

    const firstSlide = track.querySelector(`.${styles.slide}`)
    if (!firstSlide) return

    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    const distance = firstSlide.offsetWidth + gap

    track.scrollBy({
      left: direction * distance,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── HEADER ── */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.projects.sectionLabel}
            </span>

            <h2 id="projects-heading" className={styles.title}>
              {t.projects.title}
            </h2>

            <p className={styles.sub}>{t.projects.sub}</p>
          </div>

          <div className={styles.headerActions}>
            {scrollState.hasOverflow && (
              <div className={styles.navBtns}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => scrollByCard(-1)}
                  disabled={scrollState.atStart}
                  aria-label={t.projects.buttons.prev}
                  aria-controls="projects-track"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => scrollByCard(1)}
                  disabled={scrollState.atEnd}
                  aria-label={t.projects.buttons.next}
                  aria-controls="projects-track"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}

            <Button
              className={styles.btnGhost}
              onClick={() => scrollToSection('contact')}
            >
              {t.projects.buttons.collaborate}
            </Button>
          </div>
        </header>

        {/* ── CAROUSEL ── */}
        <ul
          id="projects-track"
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          aria-label={t.projects.title}
        >
          {t.projects.cards.map((project) => (
            <li key={project.title} className={styles.slide}>
              <ProjectCard project={project} buttons={t.projects.buttons} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
