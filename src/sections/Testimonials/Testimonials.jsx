import { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './Testimonials.module.css'

const AUTOPLAY_MS = 7000
/* Up to this many reviews, the side list is hidden and dots are used instead */
const MAX_WITHOUT_LIST = 3

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]
  const cards = t.testimonials.cards
  const count = cards.length
  const hasMultiple = count > 1
  const showList = count > MAX_WITHOUT_LIST
  const showDots = hasMultiple && !showList

  const [activeIndex, setActiveIndex] = useState(0)
  const [userDriven, setUserDriven] = useState(false)
  const [paused, setPaused] = useState(false)

  const spotlightRef = useRef(null)
  const hoverRef = useRef(false)
  const focusRef = useRef(false)
  const hiddenRef = useRef(
    typeof document !== 'undefined' && document.visibilityState === 'hidden'
  )

  const recomputePaused = useCallback(() => {
    setPaused(hoverRef.current || focusRef.current || hiddenRef.current)
  }, [])

  useEffect(() => {
    const node = spotlightRef.current
    if (!node) return undefined

    const onEnter = () => {
      hoverRef.current = true
      recomputePaused()
    }
    const onLeave = () => {
      hoverRef.current = false
      recomputePaused()
    }
    const onFocusIn = () => {
      focusRef.current = true
      recomputePaused()
    }
    const onFocusOut = () => {
      requestAnimationFrame(() => {
        focusRef.current = node.contains(document.activeElement)
        recomputePaused()
      })
    }
    const onVisibility = () => {
      hiddenRef.current = document.visibilityState === 'hidden'
      recomputePaused()
    }

    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)
    node.addEventListener('focusin', onFocusIn)
    node.addEventListener('focusout', onFocusOut)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
      node.removeEventListener('focusin', onFocusIn)
      node.removeEventListener('focusout', onFocusOut)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [recomputePaused])

  const goTo = useCallback((index) => {
    setUserDriven(true)
    setActiveIndex(index)
  }, [])

  const goNext = useCallback(
    (isUserDriven) => {
      setUserDriven(isUserDriven)
      setActiveIndex((prev) => (prev + 1) % cards.length)
    },
    [cards.length]
  )

  const goPrev = useCallback(
    (isUserDriven) => {
      setUserDriven(isUserDriven)
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    },
    [cards.length]
  )

  /* Autoplay — restarts on every activeIndex change, so a manual
     navigation resets the 7s countdown for free. */
  useEffect(() => {
    if (!hasMultiple || paused || prefersReducedMotion()) return undefined

    const timer = setInterval(() => goNext(false), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [activeIndex, paused, goNext, hasMultiple])

  /* No reviews yet — render nothing (kept after all hooks) */
  if (count === 0) return null

  const active = cards[activeIndex] ?? cards[0]

  return (
    <section
      className={styles.testimonials}
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        {/* ── HEADER ── */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.testimonials.sectionLabel}
            </span>

            <h2 id="testimonials-heading" className={styles.title}>
              {t.testimonials.title}
            </h2>
          </div>

          {hasMultiple && (
            <div className={styles.navBtns}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => goPrev(true)}
                aria-label={t.testimonials.buttons.prev}
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => goNext(true)}
                aria-label={t.testimonials.buttons.next}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </header>

        {/* ── SPOTLIGHT ── */}
        <div
          className={`${styles.spotlight} ${showList ? '' : styles.spotlightSingle}`}
          ref={spotlightRef}
        >
          <figure key={activeIndex} className={styles.quoteFigure}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>

            <blockquote
              className={styles.quoteText}
              aria-live={userDriven ? 'polite' : 'off'}
            >
              {active.text}
            </blockquote>

            <figcaption className={styles.quoteAuthor}>
              <span
                className={styles.avatarLg}
                style={{ background: active.color }}
                aria-hidden="true"
              >
                {active.initials}
              </span>
              <span className={styles.authorInfo}>
                {active.link ? (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.authorName} ${styles.authorLink}`}
                  >
                    {active.name}
                    <FiArrowUpRight className={styles.authorLinkIcon} aria-hidden="true" />
                  </a>
                ) : (
                  <span className={styles.authorName}>{active.name}</span>
                )}
                <span className={styles.authorRole}>{active.role}</span>
              </span>
            </figcaption>
          </figure>

          {showList && (
            <div className={styles.authorList}>
              {cards.map((card, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.authorRow} ${
                    index === activeIndex ? styles.authorRowActive : ''
                  }`}
                  aria-pressed={index === activeIndex}
                  aria-label={`${card.name} — ${card.role}`}
                  onClick={() => goTo(index)}
                >
                  <span
                    className={styles.avatarSm}
                    style={{ background: card.color }}
                    aria-hidden="true"
                  >
                    {card.initials}
                  </span>
                  <span className={styles.authorRowInfo}>
                    <span className={styles.authorRowName}>{card.name}</span>
                    <span className={styles.authorRowRole}>{card.role}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {showDots && (
          <div className={styles.dots}>
            {cards.map((card, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                aria-label={`${index + 1} / ${count} — ${card.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
