import { useThemeContext } from './context/ThemeContext'

import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'

import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Testimonials from './sections/Testimonials'
import SKWEBShowcase from './sections/SKWEBShowcase'

export default function App() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <div className="app">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main>
        <Hero />
        <About />
        <SKWEBShowcase />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}