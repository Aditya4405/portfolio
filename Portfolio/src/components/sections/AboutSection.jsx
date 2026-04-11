import { motion } from 'framer-motion'
import { BadgeCheck, Sparkles, Trophy } from 'lucide-react'

const miniIcons = { Sparkles, Trophy, BadgeCheck }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function AboutSection({ personalInfo, miniAchievements }) {
  return (
    <div className="container">
      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
        <span className="section-eyebrow">About Me</span>
        <h2 className="section-title">Backend-first builder<br />with a product eye</h2>
      </motion.div>

      {/* 2-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '56px',
        alignItems: 'start',
      }}>

        {/* LEFT: Profile Image */}
        <motion.div {...fadeUp(0.1)} style={{ position: 'relative' }}>
          <div style={{
            borderRadius: '24px',
            border: '1px solid var(--border)',
            background: 'var(--card-bg)',
            padding: '10px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <img
              src={personalInfo.profileImage}
              alt="Aditya Prajapati"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '18px',
                display: 'block',
              }}
            />
          </div>

          {/* Subtle accent glow */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '20px',
            right: '20px',
            height: '60px',
            background: 'var(--accent)',
            opacity: 0.12,
            filter: 'blur(30px)',
            borderRadius: '50%',
            zIndex: 0,
          }} />
        </motion.div>

        {/* RIGHT: bio + stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Bio */}
          <motion.div {...fadeUp(0.15)}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-soft)', marginBottom: '18px' }}>
              I'm Aditya — a full stack developer and Java backend engineer from India. I focus on building reliable systems, clean APIs, and thoughtful interfaces that feel polished and production-ready.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-soft)' }}>
              My current focus is on Spring Boot backend architecture, applied AI projects, and creating software that solves real problems with minimal friction.
            </p>
          </motion.div>

          {/* Education highlight */}
          <motion.div {...fadeUp(0.2)} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: '16px',
            padding: '20px 22px',
          }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '6px' }}>Education</p>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Computer Science & Engineering</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)' }}>Focused on software engineering, backend systems, and product-led development.</p>
          </motion.div>

          {/* 3 Stat Cards */}
          <motion.div {...fadeUp(0.25)} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {miniAchievements.map((item, i) => {
              const Icon = miniIcons[item.icon] || Sparkles
              return (
                <div key={item.label} className="stat-card" style={{ textAlign: 'center' }}>
                  <Icon size={18} style={{ color: 'var(--accent)', margin: '0 auto 10px' }} />
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>{item.value}</p>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-soft)' }}>{item.label}</p>
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default AboutSection
