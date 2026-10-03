export const SHOW_TESTIMONIALS = false

/* Section ids shown in the navbar and footer, in page order */
export const NAV_LINKS = ['about', 'responsiveness', 'services', 'projects', 'testimonials', 'contact'].filter(
  (link) => link !== 'testimonials' || SHOW_TESTIMONIALS
)

/* Keep in sync with the @media (max-width: …) values in the CSS modules */
export const BREAKPOINTS = {
  tablet: 1024,
  tabletPortrait: 900,
  mobile: 768,
  small: 480,
}
