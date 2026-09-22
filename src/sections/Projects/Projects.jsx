import { useMemo, useState } from 'react'

import Button from '../../components/ui/Button'
import { useLanguage } from '../../hooks'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { translations } from '../../translations'

import styles from './Projects.module.css'

/* ── Constants ── */
const PROJECTS_PER_PAGE = 4

const getHostname = (url) => new URL(url).hostname

/* Two pairs of project cards currently reuse the same screenshot
   (see src/translations/data.js) — this accent wash gives every card
   a distinct identity until real per-project screenshots are added. */
const CARD_ACCENTS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6']

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const [currentPage, setCurrentPage] = useState(1)
  const { scrollToSection } = useSmoothScroll()

  /* =========================
     PAGINATION LOGIC
  ========================= */

  const totalPages = Math.ceil(t.projects.cards.length / PROJECTS_PER_PAGE)

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
    const endIndex = startIndex + PROJECTS_PER_PAGE
    return t.projects.cards.slice(startIndex, endIndex)
  }, [t.projects.cards, currentPage])

  /* Səhifə dəyişəndə yuxarı scroll */
  const handlePageChange = (page) => {
    setCurrentPage(page)
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* Smart page numbers: 1 ... 4 5 6 ... 10 */
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages
  }

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── HEADER ── */}
        <header className={styles.projectsHeader}>
          <div className={styles.projectsHeaderText}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.projects.sectionLabel}
            </span>

            <h2 id="projects-heading" className={styles.projectsTitle}>
              {t.projects.titleTop}
              <br />
              {t.projects.titleBottom}{' '}
              <span className={styles.titleAccent}>
                {t.projects.titleAccent}
              </span>
            </h2>

            <p className={styles.projectsSub}>
              {t.projects.sub.map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== t.projects.sub.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div className={styles.projectsHeaderActions}>
            <Button
              className={styles.btnPrimary}
              onClick={() => handlePageChange(1)}
            >
              {t.projects.buttons.viewAll}
              <svg
                width="16"
                height="16"
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
              onClick={() => scrollToSection('contact')}
            >
              {t.projects.buttons.collaborate}
            </Button>
          </div>
        </header>

        {/* ── PROJECTS GRID ── */}
        <div className={styles.projectsGrid}>
          {paginatedProjects.map((project, index) => {
            const globalIndex = t.projects.cards.indexOf(project)
            const accent = CARD_ACCENTS[globalIndex % CARD_ACCENTS.length]

            return (
            <a
              key={project.title + index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
              aria-label={`View project: ${project.title}`}
              style={{ '--card-accent': accent }}
            >
              {/* Image with overlay */}
              <div className={styles.projectImageWrapper}>
                <div className="terminal-chrome" aria-hidden="true">
                  <span className="terminal-dot terminal-dot-red" />
                  <span className="terminal-dot terminal-dot-yellow" />
                  <span className="terminal-dot terminal-dot-green" />
                </div>
                <img
                  src={project.img}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
                />
                <div className={styles.projectAccentWash} aria-hidden="true" />
                <div className={styles.projectOverlay} aria-hidden="true">
                  <span className={styles.projectOverlayIcon}>
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={styles.projectContent}>
                <div className={styles.projectTitleRow}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectUrl}>{getHostname(project.link)}</span>
                </div>
                <p className={styles.projectDesc}>{project.desc}</p>
              </div>
            </a>
            )
          })}
        </div>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <nav
            className={styles.pagination}
            aria-label="Projects pagination"
          >
            {/* Previous button */}
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              type="button"
            >
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
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page numbers */}
            <div className={styles.paginationNumbers}>
              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span
                    key={`dots-${idx}`}
                    className={styles.paginationDots}
                    aria-hidden="true"
                  >
                    ···
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`${styles.paginationNumber} ${
                      currentPage === page ? styles.paginationNumberActive : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    type="button"
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next button */}
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              type="button"
            >
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
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}