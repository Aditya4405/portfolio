import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, Code2, Trophy } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
})

const typeIcons = {
  hackathon: Trophy,
  internship: Briefcase,
  workshop: Award,
  education: BookOpen,
  project: Code2,
}

function AchievementsSection({ achievements }) {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '56px' }}>
        <span className="section-eyebrow">Achievements & Certifications</span>
        <h2 className="section-title">Highlights so far</h2>
        <p className="section-description">
          Hackathons, internships, and workshops that have shaped me as a developer.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '18px',
      }}>
        {achievements.map((item, i) => {
          const Icon = typeIcons[item.type] || Award
          return (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.07)}
              className="card"
              style={{ padding: '24px' }}
            >
              {/* Icon + year row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={17} style={{ color: 'var(--accent-light)' }} />
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-soft)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}>
                  {item.year}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', lineHeight: 1.35 }}>
                {item.title}
              </h3>

              {/* Org */}
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-light)', marginBottom: '10px', letterSpacing: '0.03em' }}>
                {item.org}
              </p>

              {/* Description */}
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-soft)' }}>
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default AchievementsSection
