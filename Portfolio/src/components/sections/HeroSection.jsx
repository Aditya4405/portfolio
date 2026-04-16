import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { useTheme } from '../../hooks/useTheme.jsx'
import { Link } from 'react-router-dom'

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
  LeetCode: SiLeetcode,
}

const ROLES = ['JAVA Backend Developer', 'Interested in AI/ML', 'Open to Internships']

function TypewriterText({ strings }) {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[roleIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 65)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 35)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIdx((r) => (r + 1) % strings.length)
    }

    setDisplayed(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx, strings])

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1.1em',
        background: '#ef4444',
        marginLeft: '3px',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}

function HeroSection({ personalInfo, resumeUrl }) {
  const { theme } = useTheme()

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container mx-auto px-6 relative z-10" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ marginBottom: '32px' }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: theme === 'dark' ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(239, 68, 68, 0.15)',
                background: theme === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.03)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#ef4444',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
                Welcome to my Universe
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                marginBottom: '24px',
                color: 'var(--text-primary)',
              }}
            >
              Hi, I&#39;m <span style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #ffffff 20%, #ef4444 80%)'
                  : 'none',
                WebkitBackgroundClip: theme === 'dark' ? 'text' : 'unset',
                WebkitTextFillColor: theme === 'dark' ? 'transparent' : 'unset',
                color: theme === 'dark' ? 'transparent' : '#1e293b',
              }}>{personalInfo.name}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 600,
                color: '#ef4444',
                marginBottom: '12px',
                minHeight: '2rem',
              }}
            >
              <TypewriterText strings={ROLES} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              B.Tech CSE · 3rd Year · {personalInfo.college}
            </motion.p>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: '500px',
                lineHeight: 1.8,
                marginBottom: '32px',
              }}
            >
              I'm a 3rd-year Computer Science student passionate about building scalable full-stack applications and solving real-world problems through clean, impactful code. I love turning ideas into products and am actively seeking internship opportunities to grow as a software engineer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <a href="#projects" className="btn-primary" style={{ padding: '16px 36px', fontSize: '15px' }}>
                View My Work <ArrowRight size={18} />
              </a>
              <Link to="/resume" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '15px', color: 'var(--text-primary)', borderColor: 'var(--card-border)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Resume
              </Link>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ display: 'flex', gap: '16px' }}
            >
              {Object.entries(socialIcons).map(([name, Icon], i) => (
                <motion.a
                  key={name}
                  href="#"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--card-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444'
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--card-border)'
                    e.currentTarget.style.background = 'var(--card-bg)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image Column ── */}
          <motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
  style={{
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  }}
>
  <img
    src={personalInfo.profileImage}
    alt="Aditya Prajapati"
    style={{
      width: '100%',
      maxWidth: '420px',
      height: '520px',
      objectFit: 'cover',
      borderRadius: '24px',
      display: 'block',
      boxShadow: '0 28px 65px rgba(0,0,0,0.65), 0 0 0 1px rgba(192,57,43,0.12)',
    }}
  />

  {/* Floating badge */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    style={{
      position: 'absolute',
      bottom: '24px',
      right: '-20px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(192,57,43,0.35)',
      borderRadius: '14px',
      padding: '12px 18px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(239,68,68,0.15)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <p style={{
      fontSize: '0.75rem',
      fontWeight: 800,
      color: '#ef4444',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      3rd Year
    </p>
    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
      B.Tech CSE
    </p>
  </motion.div>
</motion.div>

        </div>
      </section>
  )
}

export default HeroSection
