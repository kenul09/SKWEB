import { useRef, useState } from 'react'
import { FiPenTool, FiCode, FiTarget, FiShoppingBag, FiChevronRight, FiCheck } from 'react-icons/fi'

import { useLanguage, useResponsive, useSmoothScroll } from '../../hooks'
import { translations } from '../../translations'

import styles from './Services.module.css'

const ICONS = {
  design: FiPenTool,
  development: FiCode,
  landing: FiTarget,
  ecommerce: FiShoppingBag,
}

const MOBILE_BREAKPOINT = 900

export default function Services() {
  const { language } = useLanguage()
  const t = translations[language]
  const { isMobile } = useResponsive(MOBILE_BREAKPOINT)
  const { scrollTo } = useSmoothScroll()

  const cards = t.services.cards
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])

  const focusTab = (index) => {
    tabRefs.current[index]?.focus()
  }

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % cards.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + cards.length) % cards.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = cards.length - 1
    }

    if (nextIndex !== null) {
      e.preventDefault()
      setActiveIndex(nextIndex)
      focusTab(nextIndex)
    }
  }

  const requestService = (key) => {
    window.dispatchEvent(new CustomEvent('services:select', { detail: key }))
    scrollTo('contact')
  }

  return (
    <section
      className={styles.services}
      id="services"
      aria-labelledby="services-heading"
    >
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

          <p className={styles.servicesSub}>{t.services.sub}</p>
        </header>

        {/* ── BODY ── */}
        <div className={styles.servicesBody}>
          {/* LIST */}
          <div
            className={styles.servicesList}
            role={isMobile ? undefined : 'tablist'}
            aria-orientation={isMobile ? undefined : 'vertical'}
            aria-label={isMobile ? undefined : t.services.title}
          >
            {cards.map((card, index) => {
              const Icon = ICONS[card.key]
              const isActive = index === activeIndex

              return (
                <div key={card.key} className={styles.servicesItem}>
                  <button
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    type="button"
                    id={`service-tab-${card.key}`}
                    className={`${styles.servicesRow} ${isActive ? styles.servicesRowActive : ''}`}
                    role={isMobile ? undefined : 'tab'}
                    aria-selected={isMobile ? undefined : isActive}
                    aria-expanded={isMobile ? isActive : undefined}
                    aria-controls={
                      isMobile
                        ? isActive
                          ? `service-panel-${card.key}`
                          : undefined
                        : `service-panel-${card.key}`
                    }
                    tabIndex={isMobile ? 0 : isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => !isMobile && handleTabKeyDown(e, index)}
                  >
                    <span className={styles.servicesRowIcon} aria-hidden="true">
                      <Icon size={20} />
                    </span>

                    <span className={styles.servicesRowText}>
                      <span className={styles.servicesRowTitle}>{card.title}</span>
                      <span className={styles.servicesRowDesc}>{card.desc}</span>
                    </span>

                    <span className={styles.servicesRowChevron} aria-hidden="true">
                      <FiChevronRight size={18} />
                    </span>
                  </button>

                  {isMobile && isActive && (
                    <ServiceDetail
                      card={card}
                      includesLabel={t.services.includesLabel}
                      cta={t.services.cta}
                      onRequest={() => requestService(card.key)}
                      panelId={`service-panel-${card.key}`}
                      tabId={`service-tab-${card.key}`}
                      mobile
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* DETAIL PANEL */}
          {!isMobile && (
            <ServiceDetail
              card={cards[activeIndex]}
              includesLabel={t.services.includesLabel}
              cta={t.services.cta}
              onRequest={() => requestService(cards[activeIndex].key)}
              panelId={`service-panel-${cards[activeIndex].key}`}
              tabId={`service-tab-${cards[activeIndex].key}`}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function ServiceDetail({ card, includesLabel, cta, onRequest, panelId, tabId, mobile }) {
  const Icon = ICONS[card.key]

  return (
    <div
      key={card.key}
      id={panelId}
      className={`${styles.servicesPanel} ${mobile ? styles.servicesPanelMobile : ''}`}
      role={mobile ? 'region' : 'tabpanel'}
      aria-labelledby={mobile ? undefined : tabId}
      tabIndex={mobile ? undefined : 0}
    >
      <Icon className={styles.servicesWatermark} aria-hidden="true" />

      <div className={styles.servicesPanelHeader}>
        <div className={styles.servicesPanelIcon} aria-hidden="true">
          <Icon size={26} />
        </div>

        <h3 className={styles.servicesPanelTitle}>{card.title}</h3>
      </div>

      <p className={styles.servicesPanelDetail}>{card.detail}</p>

      <span className={styles.servicesIncludesLabel}>{includesLabel}</span>
      <ul className={styles.servicesIncludesList}>
        {card.includes.map((item) => (
          <li key={item} className={styles.servicesIncludesItem}>
            <FiCheck className={styles.servicesIncludesIcon} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <button type="button" className={styles.servicesCta} onClick={onRequest}>
        {cta}
      </button>
    </div>
  )
}
