import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { ArrowUp } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import ScrollProgress from './components/Effects/ScrollProgress'
import AboutSection from './components/sections/AboutSection'
import AchievementsSection from './components/sections/AchievementsSection'
import ContactSection from './components/sections/ContactSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import emailjs from 'emailjs-com'
import {
  aboutHighlights,
  achievements,
  chatbotReplies,
  personalInfo,
  projects,
} from './data/portfolio'

const LazyChatbot = lazy(() => import('./components/Chatbot'))
const resumeUrl = '/resume.pdf'

const NAV_LINKS = ['about', 'skills', 'projects', 'achievements', 'contact']

function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sendEmail = async (event) => {
    event.preventDefault()
    setFormStatus('Sending...')
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      setFormStatus('EmailJS keys not configured. Please email directly.')
      return
    }
    try {
      await emailjs.send(serviceId, templateId, formState, publicKey)
      setFormStatus('Message sent! Thanks for reaching out.')
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setFormStatus('Something went wrong. Please email me directly.')
    }
  }

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <ScrollProgress />

      {/* ── NAV ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'rgba(15,15,15,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
          {/* Logo */}
          <a href="#home" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Aditya<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {NAV_LINKS.map((id) => (
              <a key={id} href={`#${id}`} className="nav-link">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--text-main)',
                borderRadius: '2px',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
              }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'var(--bg-main)',
            borderTop: '1px solid var(--border)',
            padding: '16px 0',
          }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="nav-link"
                  style={{ padding: '10px 0', fontSize: '1rem' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main>
        <HeroSection personalInfo={personalInfo} resumeUrl={resumeUrl} />

        <section id="about" className="alt-bg" style={{ padding: '90px 0' }}>
          <AboutSection personalInfo={personalInfo} aboutHighlights={aboutHighlights} />
        </section>

        <section id="skills" style={{ padding: '90px 0' }}>
          <SkillsSection />
        </section>

        <section id="projects" className="alt-bg" style={{ padding: '90px 0' }}>
          <ProjectsSection projects={projects} />
        </section>

        <section id="achievements" style={{ padding: '90px 0' }}>
          <AchievementsSection achievements={achievements} />
        </section>

        <section id="contact" className="alt-bg" style={{ padding: '90px 0' }}>
          <ContactSection
            personalInfo={personalInfo}
            resumeUrl={resumeUrl}
            formState={formState}
            setFormState={setFormState}
            sendEmail={sendEmail}
            formStatus={formStatus}
          />
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
            © {new Date().getFullYear()} Aditya Prajapati · Built with React · Open to Internships
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {[
              { icon: FiGithub, href: 'https://github.com/Aditya4405', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/adityaprajapati', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:adityaprajapati.dev@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="social-icon-btn" title={label}>
                <Icon size={16} />
              </a>
            ))}
            <a href="#home" className="btn-secondary" style={{ padding: '7px 16px', fontSize: '0.8rem', borderRadius: '8px', marginLeft: '8px' }}>
              <ArrowUp size={14} /> Top
            </a>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <LazyChatbot replies={chatbotReplies} />
      </Suspense>
    </div>
  )
}

export default App
