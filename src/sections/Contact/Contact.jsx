import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './Contact.module.css'

/* ── EmailJS Configuration ── */
const EMAILJS_SERVICE_ID = 'service_htx2k8e'      // ← Öz Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'    // ← Öz Template ID
const EMAILJS_PUBLIC_KEY = 'FX5yH6EbphakDfCrd'           // ← Öz Public Key

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const formRef = useRef(null)
  const successRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'both',
    message: '',
    agreed: false,
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = t.contact.errors.name
    if (!form.email.trim()) newErrors.email = t.contact.errors.email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t.contact.errors.emailInvalid
    if (!form.message.trim()) newErrors.message = t.contact.errors.message
    if (!form.agreed) newErrors.agreed = t.contact.privacyAlert

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      /* EmailJS template parameters */
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        interest: form.interest,
        message: form.message,
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setSent(true)
      /* Reset form */
      setForm({
        name: '',
        email: '',
        interest: 'both',
        message: '',
        agreed: false,
      })
    } catch (error) {
      console.error('Email send failed:', error)
      setErrors({ submit: t.contact.errors.submitFailed })
    } finally {
      setLoading(false)
    }
  }

  const interestOptions = [
    t.contact.options.both,
    t.contact.options.design,
    t.contact.options.development,
    t.contact.options.landing,
    t.contact.options.ecommerce,
  ]

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.contactInner}>
          {/* LEFT */}
          <div className={styles.contactLeft}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.contact.sectionLabel}
            </span>

            <h2 id="contact-heading" className={styles.contactTitle}>
              {t.contact.title}
            </h2>

            <p className={styles.contactDesc}>
              {t.contact.desc}
            </p>
          </div>

          {/* RIGHT */}
          <div className={styles.contactRight}>
            {sent ? (
              <div
                ref={successRef}
                className={styles.successMsg}
                role="status"
                aria-live="polite"
                tabIndex={-1}
              >
                <div className={styles.successIcon} aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>
                  <span aria-hidden="true">{'> '}</span>
                  {t.contact.successTitle}
                </h3>
                <p className={styles.successText}>
                  {t.contact.successMessage}
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                className={styles.contactForm}
                onSubmit={submit}
                noValidate
              >
                {/* Name + Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      {t.contact.placeholders.name}
                      <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                      placeholder={t.contact.placeholders.name}
                      value={form.name}
                      onChange={handle}
                      disabled={loading}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.formError} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      {t.contact.placeholders.email}
                      <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                      placeholder={t.contact.placeholders.email}
                      value={form.email}
                      onChange={handle}
                      disabled={loading}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.formError} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interest */}
                <div className={styles.formGroup}>
                  <label htmlFor="interest" className={styles.formLabel}>
                    {t.contact.interestLabel}
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="interest"
                      name="interest"
                      className={styles.formSelect}
                      value={form.interest}
                      onChange={handle}
                      disabled={loading}
                    >
                      {interestOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <svg className={styles.selectIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    {t.contact.placeholders.message}
                    <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                    placeholder={t.contact.placeholders.message}
                    rows={5}
                    value={form.message}
                    onChange={handle}
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.formError} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Checkbox */}
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="agreed"
                    className={styles.checkboxInput}
                    checked={form.agreed}
                    onChange={handle}
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!errors.agreed}
                  />
                  <span className={styles.checkboxBox} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className={styles.checkboxText}>
                    {t.contact.privacyPrefix}{' '}
                    <a href="#" className={styles.checkboxLink}>
                      {t.contact.privacyLink}
                    </a>{' '}
                    {t.contact.privacySuffix}
                  </span>
                </label>
                {errors.agreed && (
                  <span className={styles.formError} role="alert">
                    {errors.agreed}
                  </span>
                )}

                {/* Submit error */}
                {errors.submit && (
                  <div className={styles.submitError} role="alert">
                    <span className={styles.submitErrorIcon} aria-hidden="true">✗</span>
                    {errors.submit}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className={styles.spinner}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <span className={styles.submitPrompt} aria-hidden="true">$ </span>
                      {t.contact.submit}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}