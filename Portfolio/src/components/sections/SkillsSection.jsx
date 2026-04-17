import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const categories = [
  {
    emoji: '🖥️',
    title: 'Frontend',
    color: '#ef4444',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    color: '#ef4444',
    skills: ['Java', 'Spring Boot', 'REST APIs','Authentication'],
  },
  {
    emoji: '🛠️',
    title: 'Tools & Databases',
    color: '#ef4444',
    skills: ['MySQL', 'Firebase', 'Git', 'GitHub', 'Postman','Eclipse'],
  },
]

function SkillsSection() {
  return (
    <section id="skills">
      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">What I work with</h2>
          <p className="section-description">
            Technologies I've used in real projects — nothing I haven't actually touched.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              {...fadeUp(i * 0.07)}
              className="card"
              style={{ padding: '32px', cursor: 'default' }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.6rem' }}>{cat.emoji}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.title}</h3>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SkillsSection
