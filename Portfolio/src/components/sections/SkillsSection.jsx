import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

const categories = [
  {
    icon: '🖥️',
    title: 'Frontend',
    color: '#A78BFA',
    skills: ['React', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    icon: '⚙️',
    title: 'Backend',
    color: '#7C5CFC',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Node.js', 'Express', 'Microservices'],
  },
  {
    icon: '🗄️',
    title: 'Database',
    color: '#60A5FA',
    skills: ['MySQL', 'Firebase', 'MongoDB', 'PostgreSQL', 'Redis', 'ORM / JPA'],
  },
  {
    icon: '🤖',
    title: 'AI & Tools',
    color: '#34D399',
    skills: ['Python', 'Computer Vision', 'OpenAI API', 'Docker', 'Git & GitHub', 'Vercel / Cloud'],
  },
]

function SkillsSection() {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
        <span className="section-eyebrow">Technical Skills</span>
        <h2 className="section-title">What I work with</h2>
        <p className="section-description">
          A curated set of technologies across frontend, backend, databases, and AI — the stack I ship production-grade projects with.
        </p>
      </motion.div>

      {/* 2×2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
      }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            {...fadeUp(i * 0.08)}
            className="card"
            style={{ padding: '28px', cursor: 'default' }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `${cat.color}18`,
                border: `1px solid ${cat.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
              }}>
                {cat.icon}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>{cat.title}</h3>
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
