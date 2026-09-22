import { useRef } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiAntdesign,
  SiCssmodules,
  SiHtml5,
  SiJavascript,
} from 'react-icons/si'

import Button from '../../components/ui/Button'
import useMountAnimation from '../../hooks/useMountAnimation'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import heroCharacter from '../../assets/images/hero-character.webp'

import styles from './Hero.module.css'

/* ── Orbit badge layout ──
   Positions are computed (angle → x/y via cos/sin), not hand-placed, so
   adding/removing a badge just means editing this array. Percent-based
   radius (of .orbitScene, always a square) keeps it responsive without
   any JS resize-tracking. The first two badges sit near the top of the
   circle, which is where the character's face ends up given she's offset
   toward (59%, 45%) — those two get a larger radius so they clear her
   face instead of sitting on top of it.

   angleJitter/radiusJitter are small fixed (not random-per-render)
   offsets so the ring of badges reads as loosely scattered rather than a
   mechanically perfect 11-gon — same values every render, just not a
   clean multiple of 360/11°. floatDuration/floatDelay likewise vary per
   badge so the bob animation (see .techBadgeGroup) doesn't look
   synchronized. */
const BADGE_RADIUS_PCT = 47
const BADGE_RADIUS_PCT_CLEAR_FACE = 55

const TECH_BADGES = [
  { label: 'React', Icon: SiReact, angle: -90, radius: BADGE_RADIUS_PCT_CLEAR_FACE, angleJitter: -4, radiusJitter: 1.5, floatDuration: 4.2, floatDelay: 0 },
  { label: 'React Native', Icon: null, angle: -57, radius: BADGE_RADIUS_PCT_CLEAR_FACE, angleJitter: 5, radiusJitter: -2, floatDuration: 3.6, floatDelay: 0.4 },
  { label: 'Next.js', Icon: SiNextdotjs, angle: -25, angleJitter: -6, radiusJitter: 2.2, floatDuration: 4.8, floatDelay: 0.9 },
  { label: 'TypeScript', Icon: SiTypescript, angle: 8, angleJitter: 4, radiusJitter: -1.5, floatDuration: 3.3, floatDelay: 1.3 },
  { label: 'Zustand', Icon: null, angle: 41, angleJitter: -3, radiusJitter: 2.8, floatDuration: 4.5, floatDelay: 0.2 },
  { label: 'Tailwind CSS', Icon: SiTailwindcss, angle: 74, angleJitter: 3, radiusJitter: -2.2, floatDuration: 3.9, floatDelay: 1.7 },
  { label: 'Ant Design', Icon: SiAntdesign, angle: 106, angleJitter: -2, radiusJitter: 1.2, floatDuration: 4.1, floatDelay: 0.6 },
  { label: 'CSS Modules', Icon: SiCssmodules, angle: 139, angleJitter: 4, radiusJitter: -1.6, floatDuration: 3.5, floatDelay: 2.1 },
  { label: 'UI/UX Design', Icon: null, lines: ['UI/UX', 'DESIGN'], angle: 172, angleJitter: -6, radiusJitter: 2, floatDuration: 4.4, floatDelay: 1.5 },
  { label: 'HTML', Icon: SiHtml5, angle: 205, angleJitter: 5, radiusJitter: -1.9, floatDuration: 4.7, floatDelay: 0.3 },
  { label: 'JavaScript', Icon: SiJavascript, angle: 237, angleJitter: -3, radiusJitter: 1.1, floatDuration: 3.8, floatDelay: 1.1 },
]

const badgeStyle = ({
  angle,
  angleJitter = 0,
  radius = BADGE_RADIUS_PCT,
  radiusJitter = 0,
  floatDuration,
  floatDelay,
}) => {
  const rad = ((angle + angleJitter) * Math.PI) / 180
  const effectiveRadius = radius + radiusJitter
  return {
    left: `${50 + effectiveRadius * Math.cos(rad)}%`,
    top: `${50 + effectiveRadius * Math.sin(rad)}%`,
    animationDuration: `${floatDuration}s`,
    animationDelay: `${floatDelay}s`,
  }
}

const badgeShortLabel = (label) => {
  const words = label.split(' ')
  const initials = words.length === 1 ? words[0] : words.map((w) => w[0]).join('')
  return initials.slice(0, 2).toUpperCase()
}

/* ── Orbit ring dots ──
   Small glowing dots riding along each ring's own circumference (radius
   is always exactly 50% of that ring's own box). They're children of the
   ring elements, so the rings' rotation animation carries the dots with
   it. Angles are chosen to start in the gaps between badges, though since
   the rings rotate and the badges don't, that alignment only holds at
   the very first frame — which is fine, it's just meant to avoid an
   initial dot-on-top-of-badge look. */
const OUTER_DOT_ANGLES = [-73, -8, 57, 122, 188]
const MIDDLE_DOT_ANGLES = [-41, 24, 90, 155, 221]
const INNER_DOT_ANGLES = [15, 105, 195, 285]

const dotStyle = (angle) => {
  const rad = (angle * Math.PI) / 180
  return {
    left: `${50 + 50 * Math.cos(rad)}%`,
    top: `${50 + 50 * Math.sin(rad)}%`,
  }
}

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:your@email.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

/* ── Component ── */
export default function Hero() {
  const sectionRef = useRef(null)
  useMountAnimation(sectionRef)

  const { scrollToSection } = useSmoothScroll()
  const { language } = useLanguage()
  const t = translations[language]

  const delay = (time) => ({ '--delay': time })

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Floating rounded card — Navbar (sticky, in App.jsx) lives outside
          and above this, so it keeps its sticky behavior untouched. */}
      <div className={styles.heroFrame}>
        {/* Decorative background — single subtle orb. Clipped to the
            frame's own rounded shape via .heroFrameClip's overflow:
            hidden, independent of .heroFrame's overflow: visible (which
            stays visible so the character/badges can still bleed past
            the edge). */}
        <div className={styles.heroFrameClip} aria-hidden="true">
          <div className={styles.bgOrb} aria-hidden="true" />
        </div>

        <div className={styles.heroInner}>
        {/* ── LEFT — Content ── */}
        <div className={styles.heroContent}>
          <p
            className={`${styles.heroIntro} ${styles.fadeInUp}`}
            style={delay('0.1s')}
          >
            <span className={styles.introDot} aria-hidden="true" />
            <span className={styles.introPrefix} aria-hidden="true">// </span>
            {t.heroTitle}
          </p>

          <h1
            className={`${styles.heroHeading} ${styles.fadeInUp}`}
            style={delay('0.2s')}
          >
            Konul <span className={styles.headingAccent}>Samadova</span>
          </h1>

          <p
            className={`${styles.heroRole} ${styles.fadeInUp}`}
            style={delay('0.3s')}
          >
            Frontend Developer
          </p>

          <p
            className={`${styles.heroPrompt} ${styles.fadeInUp}`}
            style={delay('0.35s')}
            aria-hidden="true"
          >
          
          </p>

          <p
            className={`${styles.heroCopy} ${styles.fadeInUp}`}
            style={delay('0.4s')}
          >
            {t.heroSubtitle}
          </p>

          <div
            className={`${styles.heroActions} ${styles.fadeInUp}`}
            style={delay('0.5s')}
          >
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

          {/* Social Links */}
          <div
            className={`${styles.heroSocials} ${styles.fadeInUp}`}
            style={delay('0.6s')}
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Orbital Visual ── */}
        <div
          className={`${styles.heroRight} ${styles.fadeInUp}`}
          style={delay('0.7s')}
        >
          <div className={styles.orbitScene}>
            {/* Rotating rings — purely decorative. Each carries a few
                small glowing dots along its own circumference, so they
                rotate together with the ring. */}
            <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} aria-hidden="true">
              {OUTER_DOT_ANGLES.map((angle) => (
                <span key={angle} className={styles.orbitDot} style={dotStyle(angle)} />
              ))}
            </div>
            <div className={`${styles.orbitRing} ${styles.orbitRingMiddle}`} aria-hidden="true">
              {MIDDLE_DOT_ANGLES.map((angle) => (
                <span key={angle} className={styles.orbitDot} style={dotStyle(angle)} />
              ))}
            </div>
            <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} aria-hidden="true">
              {INNER_DOT_ANGLES.map((angle) => (
                <span key={angle} className={styles.orbitDot} style={dotStyle(angle)} />
              ))}
            </div>

            {/* Center — character */}
            <div className={styles.characterWrapper}>
              <img
                src={heroCharacter}
                alt="Konul Samadova"
                className={styles.characterImage}
                loading="eager"
              />
            </div>

            {/* Static tech badges — positions computed from angle, not
                hardcoded; do not rotate with the rings */}
            {TECH_BADGES.map((badge) => (
              <div
                key={badge.label}
                className={styles.techBadgeGroup}
                style={badgeStyle(badge)}
                aria-hidden="true"
              >
                <div className={styles.techBadge} title={badge.label}>
                  {badge.lines ? (
                    <span className={styles.techBadgeTwoLine}>
                      {badge.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  ) : badge.Icon ? (
                    <badge.Icon />
                  ) : (
                    <span className={styles.techBadgeText}>
                      {badgeShortLabel(badge.label)}
                    </span>
                  )}
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