import { useState } from 'react'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './Services.module.css'

export default function Services() {
  const { language } = useLanguage()
  const t = translations[language]
  const [hovered, setHovered] = useState(null)

  return (
    <section
      className={styles.services}
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── HEADER ── */}
        <header className={styles.servicesHeader}>
          <div className={styles.servicesHeaderText}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.services.sectionLabel}
            </span>

            <h2 id="services-heading" className={styles.servicesTitle}>
              {t.services.title}
            </h2>
          </div>
        </header>

        {/* ── GRID ── */}
        <div
          className={styles.servicesGrid}
          role="list"
          aria-label="Services list"
        >
          {t.services.cards.map((s, i) => (
            <article
              key={s.num}
              className={`${styles.serviceCard} ${
                hovered === i ? styles.serviceCardHovered : ''
              }`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="listitem"
              aria-label={`Service ${s.num}: ${s.title}`}
            >
              {/* Number badge */}
              <div className={styles.serviceNumWrapper}>
                <span className={styles.serviceNum} aria-hidden="true">
                  #{s.num}
                </span>
              </div>

              {/* Title */}
              <h3 className={styles.serviceTitle}>{s.title}</h3>

              {/* Description */}
              <p className={styles.serviceDesc}>{s.desc}</p>

              {/* Tags */}
              <ul className={styles.serviceTags} aria-label="Service technologies">
                {s.tags.map((tag) => (
                  <li key={tag} className={styles.serviceTag}>
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Arrow icon (hover indicator) */}
              <div className={styles.serviceArrow} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}