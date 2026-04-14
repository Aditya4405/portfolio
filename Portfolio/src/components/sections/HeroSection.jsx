import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
  LeetCode: SiLeetcode,
}

const ROLES = ['Full-Stack Developer', 'MERN Stack Learner', 'Open to Internships']

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
        background: 'var(--accent)',
        marginLeft: '3px',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}

function HeroSection({ personalInfo, resumeUrl }) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        background: 'var(--bg-main)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ marginBottom: '24px' }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '50px',
                border: '1px solid rgba(59,130,246,0.35)',
                background: 'rgba(59,130,246,0.08)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-light)',
                letterSpacing: '0.04em',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
                Open to internships
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-1.5px',
                color: 'var(--text-main)',
                marginBottom: '16px',
              }}
            >
              Aditya Prajapati
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--accent-light)',
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
                color: 'var(--text-soft)',
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
                color: 'var(--text-soft)',
                maxWidth: '500px',
                lineHeight: 1.8,
                marginBottom: '32px',
              }}
            >
              I enjoy building full-stack web apps and solving problems with code. Currently looking for internship opportunities where I can contribute and grow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.38 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}
            >
              <a href="#projects" className="btn-primary">
                View My Work <ArrowRight size={16} />
              </a>
              <a href={resumeUrl} download className="btn-secondary">
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
              style={{ display: 'flex', gap: '10px' }}
            >
              {personalInfo.socials.map((social) => {
                const Icon = socialIcons[social.label]
                if (!Icon) return null
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon-btn"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {/* Clean card around image */}
            <div style={{
              position: 'relative',
              borderRadius: '50%',
              border: '3px solid var(--border)',
              padding: '6px',
              background: 'var(--card-bg)',
              maxWidth: '320px',
              width: '100%',
            }}>
              <img
                src={personalInfo.profileImage}
                alt="Aditya Prajapati"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  display: 'block',
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '0px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 16px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              }}
            >
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                3rd Year
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-soft)', marginTop: '2px' }}>B.Tech CSE</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
