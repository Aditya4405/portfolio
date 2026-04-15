import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import { FiGithub as Github } from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

function ProjectCard({ project, i }) {
  return (
    <motion.article
      {...fadeUp(i * 0.07)}
      className="card"
      style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Thumbnail */}
      <div style={{ overflow: 'hidden', height: '190px', flexShrink: 0 }}>
        <img
          src={project.preview}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'block',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>

        {/* Stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.stack.map((name) => (
            <span key={name} className="tech-pill">{name}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-secondary)', flex: 1 }}>
          {project.summary}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '18px', borderTop: '1px solid var(--card-border)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem', borderRadius: '12px', flex: 1, justifyContent: 'center' }}
          >
            <Github size={15} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ padding: '10px 16px', fontSize: '0.85rem', borderRadius: '12px', flex: 1, justifyContent: 'center' }}
          >
            Live Demo <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectsSection({ projects }) {
  const [showOthers, setShowOthers] = useState(false)
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="alt-bg">
      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-description">
            A selection of projects I've worked on — each one taught me something new.
          </p>
        </motion.div>

        {/* Featured cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </div>

        {/* Other projects toggle */}
        {others.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <button
              onClick={() => setShowOthers((v) => !v)}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', padding: '12px 28px', fontSize: '0.9rem' }}
            >
              {showOthers ? 'Hide' : 'Other Projects'}
              {showOthers ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showOthers && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                marginTop: '32px',
              }}>
                {others.map((project, i) => (
                  <ProjectCard key={project.title} project={project} i={i} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}

export default ProjectsSection
