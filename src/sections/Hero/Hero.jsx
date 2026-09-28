import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiFigma,
} from 'react-icons/si'

import Button from '../../components/ui/Button'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import heroCharacter from '../../assets/images/hero-character.webp'

import styles from './Hero.module.css'

/* ── Orbit badges ──
   Placed evenly on the outer ring (angle → x/y via cos/sin as a % of the
   square .orbitScene). The whole .orbitTrack rotates; each badge
   counter-rotates at the same speed so its icon stays upright.
   `color` is the brand color; `null` falls back to --text-primary so the
   monochrome Next.js mark stays visible in both themes. */
const TECH_BADGES = [
  { label: 'React', Icon: SiReact, color: '#61dafb' },
  { label: 'Next.js', Icon: SiNextdotjs, color: null },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { label: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { label: 'Figma', Icon: SiFigma, color: '#f24e1e' },
]

const badgeStyle = (index) => {
  const angle = -90 + (360 / TECH_BADGES.length) * index
  const rad = (angle * Math.PI) / 180
  return {
    left: `${50 + 50 * Math.cos(rad)}%`,
    top: `${50 + 50 * Math.sin(rad)}%`,
  }
}

/* Entrance stagger — 60ms between content elements */
const stagger = (step) => ({ '--delay': `${step * 60}ms` })

/* ── Component ── */
export default function Hero() {
  const { scrollToSection } = useSmoothScroll()
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        {/* ── LEFT — Content ── */}
        <div className={styles.heroContent}>
          {t.footer.available && (
            <p className={`${styles.statusPill} ${styles.fadeInUp}`} style={stagger(0)}>
              <span className={styles.statusDot} aria-hidden="true" />
              {t.footer.available}
            </p>
          )}

          <h1
            id="hero-heading"
            className={`${styles.heroHeading} ${styles.fadeInUp}`}
            style={stagger(1)}
          >
            Konul <span className={styles.headingAccent}>Samadova</span>
          </h1>

          <p className={`${styles.valueProp} ${styles.fadeInUp}`} style={stagger(2)}>
            {t.hero.valueProp}
          </p>

          <p className={`${styles.heroDesc} ${styles.fadeInUp}`} style={stagger(3)}>
            {t.hero.desc}
          </p>

          <div className={`${styles.heroActions} ${styles.fadeInUp}`} style={stagger(4)}>
            <Button
              className={styles.btnPrimary}
              onClick={() => scrollToSection('contact')}
            >
              {t.startProject}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
            <Button
              className={styles.btnGhost}
              onClick={() => scrollToSection('projects')}
            >
              {t.viewWorks}
            </Button>
          </div>

          {/* Trust row */}
          <ul className={`${styles.trustRow} ${styles.fadeInUp}`} style={stagger(5)}>
            {t.hero.trust.map(({ value, label }) => (
              <li key={value} className={styles.trustItem}>
                <span className={styles.trustValue}>{value}</span>
                <span className={styles.trustLabel}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT — Visual ── */}
        <div className={`${styles.heroVisual} ${styles.fadeInUp}`} style={stagger(6)}>
          <div className={styles.orbitScene}>
            <div className={styles.glow} aria-hidden="true" />

            <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} aria-hidden="true" />
            <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} aria-hidden="true" />

            <div className={styles.characterWrapper}>
              <img
                src={heroCharacter}
                alt="Konul Samadova"
                className={styles.characterImage}
                loading="eager"
              />
            </div>

            <div className={styles.orbitTrack} aria-hidden="true">
              {TECH_BADGES.map(({ label, Icon, color }, i) => (
                <div key={label} className={styles.techBadgeGroup} style={badgeStyle(i)}>
                  <div
                    className={styles.techBadge}
                    title={label}
                    style={color ? { '--brand': color } : undefined}
                  >
                    <Icon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
