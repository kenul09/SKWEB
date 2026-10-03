import { useEffect, useRef, useState, useCallback } from 'react'

import { useLanguage } from '../../../hooks'
import useResponsive from '../../../hooks/useResponsive'
import useScrollEffect from '../../../hooks/useScrollEffect'
import useSectionVisibility from '../../../hooks/useSectionVisibility'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

import { BREAKPOINTS, NAV_LINKS } from '../../../config'
import { translations } from '../../../translations'
import LanguageSwitcher from '../../common/LanguageSwitcher'

import styles from './Navbar.module.css'

/* ── Constants ── */
const SCROLL_THRESHOLD = 40

/* ── Component ── */
export default function Navbar({ toggleTheme, theme }) {
  const { language } = useLanguage()
  const t = translations[language]

  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef(null)
  const firstLinkRef = useRef(null)

  const scrolled = useScrollEffect(SCROLL_THRESHOLD)
  const { isMobile } = useResponsive(BREAKPOINTS.tabletPortrait)
  const activeSection = useSectionVisibility(NAV_LINKS)
  const { scrollToSection } = useSmoothScroll()

  /* ── Close mobile menu when switching to desktop (adjusted during render) ── */
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile)
  if (isMobile !== prevIsMobile) {
    setPrevIsMobile(isMobile)
    if (!isMobile) setMenuOpen(false)
  }

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* ── Move focus into the menu when it opens ── */
  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus()
  }, [menuOpen])

  /* ── Close menu on Escape key, returning focus to the burger ── */
  useEffect(() => {
    if (!menuOpen) return undefined
    const handleEsc = (e) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      burgerRef.current?.focus()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [menuOpen])

  /* Real #hash links (work without JS, open in new tab); smooth scroll on click */
  const handleLinkClick = useCallback(
    (e, section) => {
      e.preventDefault()
      scrollToSection(section)
      setMenuOpen(false)
    },
    [scrollToSection]
  )

  const isDark = theme === 'dark'
  const themeLabel = isDark ? t.theme.lightMode : t.theme.darkMode
  const themeEmoji = isDark ? '☀️' : '🌙'

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label={t.navbar.ariaLabel}
      >
        <div className={styles.navInner}>
          {/* ── Logo ── */}
          <a href="/" className={styles.navLogo} aria-label="SK WEB Home">
            <svg
              className={styles.logoIcon}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6L2 12L8 18"
                stroke="url(#logoGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 6L22 12L16 18"
                stroke="url(#logoGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 4L10 20"
                stroke="url(#logoGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.logoText}>
              SK<span className={styles.logoAccent}>WEB</span>
            </span>
            <span
              className={`${styles.logoCursor} cursor-blink`}
              aria-hidden="true"
            >
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className={`${styles.navLink} ${
                    activeSection === link ? styles.active : ''
                  }`}
                  onClick={(e) => handleLinkClick(e, link)}
                  aria-current={activeSection === link ? 'page' : undefined}
                >
                  {t.navbar[link]}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right Section ── */}
          <div className={styles.navRight}>
            <div className={styles.desktopOnly}>
              <LanguageSwitcher />
            </div>

            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <span className={styles.themeIcon} role="img" aria-hidden="true">
                {themeEmoji}
              </span>
            </button>

            <button
              ref={burgerRef}
              className={`${styles.burgerMenu} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={t.navbar.toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Menu ── */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
        aria-label={t.navbar.ariaLabel}
        aria-hidden={!menuOpen}
        /* React 18 doesn't know `inert` as a boolean prop — pass a string */
        inert={!menuOpen ? '' : undefined}
      >
        <div className={styles.mobileMenuInner}>
          <ul className={styles.mobileLinks}>
            {NAV_LINKS.map((link, index) => (
              <li key={link}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${link}`}
                  className={`${styles.mobileLink} ${
                    activeSection === link ? styles.mobileLinkActive : ''
                  }`}
                  onClick={(e) => handleLinkClick(e, link)}
                  aria-current={activeSection === link ? 'page' : undefined}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {t.navbar[link]}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileDivider} />

          <div className={styles.mobileLanguage}>
            <LanguageSwitcher />
          </div>

          <button
            className={styles.mobileThemeToggle}
            onClick={toggleTheme}
            aria-label={themeLabel}
          >
            <span role="img" aria-hidden="true">{themeEmoji}</span>
            <span>{themeLabel}</span>
          </button>
        </div>
      </nav>
    </>
  )
}