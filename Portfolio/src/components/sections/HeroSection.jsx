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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

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
        background: `
          radial-gradient(circle at 18% 20%, rgba(124,92,252,0.13), transparent 35%),
          radial-gradient(circle at 82% 28%, rgba(124,92,252,0.08), transparent 32%),
          var(--bg-main)
        `,
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

            {/* Eyebrow badge */}
            <motion.div {...fadeUp(0)} style={{ marginBottom: '24px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px',
                borderRadius: '50px',
                border: '1px solid rgba(124,92,252,0.35)',
                background: 'rgba(124,92,252,0.08)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-light)',
                letterSpacing: '0.08em',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 {...fadeUp(0.1)} style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-1px',
              color: 'var(--text-main)',
              marginBottom: '20px',
            }}>
              Hi, I'm{' '}
              <span style={{ color: 'var(--accent-light)' }}>Aditya</span>
              <br />
              Full Stack &{' '}
              <br />
              <span style={{ color: 'var(--text-soft)' }}>AI Developer</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p {...fadeUp(0.2)} style={{
              fontSize: '1.05rem',
              color: 'var(--text-soft)',
              maxWidth: '520px',
              lineHeight: 1.8,
              marginBottom: '36px',
            }}>
              I build clean interfaces, reliable Java backend systems, and practical AI-powered experiences. Focused on code that feels calm, useful, and production-ready.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={17} />
              </a>
              <a href={resumeUrl} download className="btn-secondary">
                <Download size={17} /> Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '10px' }}>
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

            {/* Stats row */}
            <motion.div {...fadeUp(0.5)} style={{
              display: 'flex',
              gap: '40px',
              marginTop: '44px',
              paddingTop: '28px',
              borderTop: '1px solid var(--border)',
            }}>
              {[
                { value: '12+', label: 'Projects Shipped' },
                { value: '3+', label: 'Years Building' },
                { value: '6+', label: 'Certifications' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>{stat.value}</p>
                  <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-soft)', fontWeight: 600 }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {/* Glow ring behind image */}
            <div style={{
              position: 'absolute',
              inset: '-24px',
              borderRadius: '32px',
              background: 'radial-gradient(circle, rgba(124,92,252,0.22) 0%, transparent 70%)',
              filter: 'blur(32px)',
              zIndex: 0,
            }} />

            {/* Glass card */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '28px',
              border: '1px solid var(--border)',
              background: 'var(--card-bg)',
              padding: '12px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,92,252,0.12)',
              maxWidth: '400px',
              width: '100%',
            }}>
              <img
                src={personalInfo.profileImage}
                alt="Aditya Prajapati"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  display: 'block',
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                position: 'absolute',
                bottom: '28px',
                right: '-12px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '10px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                AI + Full Stack
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-soft)', marginTop: '2px' }}>Developer</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
