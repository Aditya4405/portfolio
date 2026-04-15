import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, Code2, Trophy } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
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
    <section id="achievements">
      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '64px', position: 'relative', zIndex: 10 }}>
          <span className="section-eyebrow">Highlights</span>
          <h2 className="section-title">Achievements so far</h2>
          <p className="section-description">
            Hackathons, internships, and workshops that have shaped me as a developer.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          position: 'relative',
          zIndex: 10,
        }}>
          {achievements.map((item, i) => {
            const Icon = typeIcons[item.type] || Award
            return (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.07)}
                className="card"
                style={{ padding: '28px' }}
              >
                {/* Icon + year row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color: '#ef4444' }} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--card-border)',
                    padding: '4px 12px',
                    borderRadius: '8px',
                  }}>
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.4 }}>
                  {item.title}
                </h3>

                {/* Org */}
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ef4444', marginBottom: '12px', letterSpacing: '0.04em' }}>
                  {item.org}
                </p>

                {/* Description */}
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default AchievementsSection
