import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, Code2, Trophy } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

const experienceItems = [
  {
    type: 'education',
    icon: BookOpen,
    period: '2023 – Present',
    organization: 'PSIT Kanpur',
    title: 'B.Tech — Computer Science & Engineering',
    description: 'Focused on software engineering, backend systems, algorithms, and product-led development through real project builds.',
    badges: ['CSE', '4-Year Program'],
  },
  {
    type: 'internship',
    icon: Briefcase,
    period: '2024',
    organization: 'CodSoft',
    title: 'Java Development Intern',
    description: 'Delivered production-style Java features with emphasis on implementation ownership, code quality, and real-world execution standards.',
    badges: ['Java', 'Backend', 'Internship'],
  },
  {
    type: 'achievement',
    icon: Trophy,
    period: '2024',
    organization: 'Smart India Hackathon',
    title: 'Participant — National Level',
    description: 'Collaborated on solution framing, rapid product thinking, and pitch delivery under tight national-level competition constraints.',
    badges: ['Hackathon', 'Team', 'SIH 2024'],
  },
  {
    type: 'project',
    icon: Code2,
    period: '2025',
    organization: 'Personal Project',
    title: 'Healthcare Backend System',
    description: 'Delivered a full-stack healthcare reporting platform with Spring Boot backend, role-based access, and Firebase real-time sync.',
    badges: ['Spring Boot', 'MySQL', 'Firebase'],
  },
  {
    type: 'achievement',
    icon: Award,
    period: '2025',
    organization: 'AI Workshop',
    title: 'AI Exploration & Applied Learning',
    description: 'Participated in AI-focused workshops expanding skills in computer vision pipelines, intelligent workflows, and applied research.',
    badges: ['AI / ML', 'Computer Vision', 'Workshop'],
  },
]

function ExperienceSection({ milestones, timeline }) {
  return (
    <div className="container" style={{ position: 'relative' }}>
      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '64px', position: 'relative', zIndex: 10 }}>
        <span className="section-eyebrow">Experience & Education</span>
        <h2 className="section-title">The journey so far</h2>
        <p className="section-description">
          Education, internships, hackathons, and key milestones that shaped my growth as a developer.
        </p>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '28px', zIndex: 10 }}>

        {/* Vertical accent line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: `linear-gradient(to bottom, #c0392b, rgba(192,57,43,0.1))`,
          borderRadius: '3px',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {experienceItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} {...fadeUp(i * 0.1)} style={{ position: 'relative' }}>

                {/* Dot on the line */}
                <div style={{
                  position: 'absolute',
                  left: '-35px',
                  top: '20px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#c0392b',
                  border: '2px solid #0a0000',
                  boxShadow: '0 0 10px rgba(192,57,43,0.7), 0 0 20px rgba(192,57,43,0.3)',
                }} />

                {/* Card */}
                <div className="timeline-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(192,57,43,0.12)',
                        border: '1px solid rgba(192,57,43,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={16} style={{ color: '#e05030' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#e05030', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2px' }}>
                          {item.organization}
                        </p>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h3>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.period}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.badges.map((badge) => (
                      <span key={badge} className="tech-pill">{badge}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection
