import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function MilestonesSection({ milestones }) {
  return (
    <div className="container">
      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '80px' }}>
        <span className="section-eyebrow">Evolution</span>
        <h2 className="section-title">Academic & Growth Milestones</h2>
        <p className="section-description">
          A collection of academic highlights, internships, hackathons, and product-building experiences shaping my engineering journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.title}
            {...fadeUp(index * 0.1)}
            className="card"
            style={{ padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#e05030',
                background: 'rgba(192,57,43,0.1)',
                border: '1px solid rgba(192,57,43,0.28)',
                borderRadius: '6px',
              }}>
                {milestone.category || 'Experience'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', opacity: 0.5 }}>
                {milestone.year}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {milestone.title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                {milestone.description || milestone.text}
              </p>
            </div>

            {milestone.skills && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
                {milestone.skills.map((skill) => (
                  <span key={skill} className="tech-pill">{skill}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MilestonesSection
