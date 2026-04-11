import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { ArrowUp } from 'lucide-react'
import ScrollProgress from './components/Effects/ScrollProgress'
import ProjectModal from './components/ProjectModal'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'
import ExperienceSection from './components/sections/ExperienceSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import {
  chatbotReplies,
  miniAchievements,
  milestones,
  personalInfo,
  projects,
  skills,
  timeline,
} from './data/portfolio'

const LazyChatbot = lazy(() => import('./components/Chatbot'))
const resumeUrl = '/resume.pdf'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [scrolled, setScrolled] = useState(false)

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
          background: scrolled ? 'rgba(30,31,34,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
          <a href="#home" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            Aditya<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {['about', 'skills', 'projects', 'experience', 'contact'].map((id) => (
                <a key={id} href={`#${id}`} className="nav-link">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
            <a href="#contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.83rem' }}>
              Hire Me
            </a>
          </div>
        </nav>
      </header>

      {/* ── MAIN ── */}
      <main>
        <HeroSection personalInfo={personalInfo} resumeUrl={resumeUrl} />

        <section id="about" className="alt-bg" style={{ padding: '110px 0' }}>
          <AboutSection personalInfo={personalInfo} miniAchievements={miniAchievements} />
        </section>

        <section id="skills" style={{ padding: '110px 0' }}>
          <SkillsSection skills={skills} />
        </section>

        <section id="projects" className="alt-bg" style={{ padding: '110px 0' }}>
          <ProjectsSection projects={projects} onOpen={setSelectedProject} />
        </section>

        <section id="experience" style={{ padding: '110px 0' }}>
          <ExperienceSection milestones={milestones} timeline={timeline} />
        </section>

        <section id="contact" className="alt-bg" style={{ padding: '110px 0' }}>
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
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
            © {new Date().getFullYear()} Aditya Prajapati — Built with React & passion.
          </p>
          <a href="#home" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.82rem', borderRadius: '10px' }}>
            <ArrowUp size={15} /> Back to top
          </a>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Suspense fallback={null}>
        <LazyChatbot replies={chatbotReplies} />
      </Suspense>
    </div>
  )
}

export default App
