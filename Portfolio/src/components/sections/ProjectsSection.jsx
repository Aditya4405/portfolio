import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FiGithub as Github } from 'react-icons/fi'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function ProjectsSection({ projects, onOpen }) {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
        <span className="section-eyebrow">Featured Projects</span>
        <h2 className="section-title">Things I've built</h2>
        <p className="section-description">
          A selection of projects spanning backend architecture, AI integrations, and polished full stack experiences.
        </p>
      </motion.div>

      {/* 2×2 Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            {...fadeUp(i * 0.08)}
            className="card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                overflow: 'hidden',
                borderRadius: '22px 22px 0 0',
                height: '200px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onClick={() => onOpen(project)}
            >
              <img
                src={project.preview}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>

              {/* Tech stack pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.stack.map((icon, idx) => (
                  <span key={idx} className="tech-pill">
                    <img src={icon} alt="" style={{ width: '14px', height: '14px' }} />
                    {project.stackNames?.[idx] ?? ''}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onClick={() => onOpen(project)}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.75,
                color: 'var(--text-soft)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1,
              }}>
                {project.summary}
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '9px 16px', fontSize: '0.82rem', borderRadius: '10px', flex: 1, justifyContent: 'center' }}
                >
                  <Github size={15} /> GitHub
                </a>
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  className="btn-primary"
                  style={{ padding: '9px 16px', fontSize: '0.82rem', borderRadius: '10px', flex: 1 }}
                >
                  Details <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

    </div>
  )
}

export default ProjectsSection
