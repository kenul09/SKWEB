import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './SKWEBShowcase.module.css'

import showcaseVideo from '../../assets/videos/hero.mp4'

export default function SKWEBShowcase() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      className={styles.skwebShowcase}
      id="responsiveness"
      aria-labelledby="showcase-heading"
    >
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.showcaseGrid}>
          {/* ── Header ── */}
          <header className={styles.showcaseHeader}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.showcase.brand}
            </span>

            <div className={styles.showcaseLabels}>
              <span className={`${styles.sectionPill} ${styles.sectionPillSecondary}`}>
                {t.showcase.feature}
              </span>
            </div>

            <p
              id="showcase-heading"
              className={styles.showcaseLead}
            >
              {t.showcase.description}
            </p>
          </header>

          {/* ── Video Showcase ── */}
          <div className={styles.showcaseVideoWrapper}>
            <video
              className={styles.showcaseVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={t.showcase.description}
            >
              <source src={showcaseVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}