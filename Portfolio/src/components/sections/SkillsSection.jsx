import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
})

const categories = [
  {
    emoji: '🖥️',
    title: 'Frontend',
    color: '#3B82F6',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    color: '#3B82F6',
    skills: ['Node.js', 'Express', 'Java', 'Spring Boot', 'REST APIs'],
  },
  {
    emoji: '🛠️',
    title: 'Tools & Databases',
    color: '#3B82F6',
    skills: ['MongoDB', 'MySQL', 'Firebase', 'Git', 'GitHub', 'Postman'],
  },
]

function SkillsSection() {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '56px' }}>
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
        gap: '20px',
      }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            {...fadeUp(i * 0.07)}
            className="card"
            style={{ padding: '28px', cursor: 'default' }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.4rem' }}>{cat.emoji}</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{cat.title}</h3>
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
  )
}

export default SkillsSection
