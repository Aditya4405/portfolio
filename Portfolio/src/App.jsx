import { useEffect, useState } from 'react'
import Chatbot from './components/Chatbot'
import Lenis from '@studio-freight/lenis'
import { ArrowUp, Sun, Moon } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollProgress from './components/Effects/ScrollProgress'
import AboutSection from './components/sections/AboutSection'
import AchievementsSection from './components/sections/AchievementsSection'
import ContactSection from './components/sections/ContactSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import emailjs from 'emailjs-com'
import BackgroundOrbs from './components/Effects/BackgroundOrbs'
import { useTheme } from './hooks/useTheme.jsx'
import {
  aboutHighlights,
  achievements,
  chatbotReplies,
  personalInfo,
  projects,
} from './data/portfolio'

const resumeUrl = '/resume.pdf'

const NAV_LINKS = ['about', 'skills', 'projects', 'achievements', 'contact']

function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const { scrollYProgress } = useScroll()

  // Dynamic background color transition - adjusted for theme
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    theme === 'dark' 
      ? ['#050505', '#0f0505', '#121212', '#0f0505', '#050505']
      : ['#fafafa', '#fceaea', '#f8f1f1', '#fceaea', '#fafafa']
  )

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.15 })
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

  // Navbar scroll logic
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }
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
    <motion.div style={{ backgroundColor, color: theme === 'dark' ? '#ffffff' : '#0f172a', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      <ScrollProgress />
      <BackgroundOrbs />

      {/* ── NAV ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          background: scrolled 
            ? (theme === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(250, 250, 250, 0.8)')
            : 'transparent',
          borderBottom: scrolled 
            ? (theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)')
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '16px 0' : '24px 0', transition: 'padding 0.4s ease' }}>
          {/* Logo */}
          <a href="#home" style={{ fontSize: '1.2rem', fontWeight: 900, color: theme === 'dark' ? '#ffffff' : '#0f172a', letterSpacing: '-0.03em' }}>
            Aditya<span style={{ color: '#ef4444' }}>.</span>
          </a>

          {/* Desktop Links + Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              {NAV_LINKS.map((id) => (
                <a key={id} href={`#${id}`} className="nav-link" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7' : 'rgba(15, 23, 42, 0.7)' }}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                transition: 'all 0.3s ease',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
                background: theme === 'dark' ? '#ffffff' : '#0f172a',
                borderRadius: '2px',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
              }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'var(--nav-bg)',
            borderTop: '1px solid var(--card-border)',
            padding: '16px 0',
            backdropFilter: 'blur(20px)',
          }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="nav-link"
                  style={{ 
                    padding: '10px 0', 
                    fontSize: '1rem',
                    color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(15, 23, 42, 0.7)'
                  }}
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
      <main style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <HeroSection personalInfo={personalInfo} resumeUrl={resumeUrl} />
        <AboutSection personalInfo={personalInfo} aboutHighlights={aboutHighlights} />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <AchievementsSection achievements={achievements} />
        <ContactSection
          personalInfo={personalInfo}
          resumeUrl={resumeUrl}
          formState={formState}
          setFormState={setFormState}
          sendEmail={sendEmail}
          formStatus={formStatus}
        />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ 
        padding: '64px 0', 
        borderTop: '1px solid var(--card-border)',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Aditya<span style={{ color: '#ef4444' }}>.</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
            Built with React & Framer Motion. © {new Date().getFullYear()} Aditya Prajapati.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[
              { icon: FiGithub, href: 'https://github.com/Aditya4405', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/adityaprajapati', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:adityaprajapati.dev@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="social-icon-btn" title={label}>
                <Icon size={16} />
              </a>
            ))}
            <a href="#home" className="btn-secondary" style={{ padding: '7px 16px', fontSize: '0.75rem', borderRadius: '8px', marginLeft: '8px' }}>
              <ArrowUp size={14} /> Top
            </a>
          </div>
        </div>
      </footer>

    <Chatbot replies={chatbotReplies} />
    </motion.div>
  )
}

export default App
