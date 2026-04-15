import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 16px',
            background: 'rgba(4, 0, 0, 0.85)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            style={{
              position: 'relative',
              maxHeight: '90vh',
              width: '100%',
              maxWidth: '900px',
              overflowY: 'auto',
              borderRadius: '24px',
              border: '1px solid rgba(192,57,43,0.25)',
              background: 'linear-gradient(180deg, rgba(16,4,4,0.98) 0%, rgba(10,0,0,0.97) 100%)',
              padding: '28px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(192,57,43,0.06)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                padding: '10px',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(192,57,43,0.5)'
                e.currentTarget.style.color = '#e05030'
                e.currentTarget.style.background = 'rgba(192,57,43,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              <X size={18} />
            </button>

            {/* Preview image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img
                src={project.preview}
                alt={`${project.title} preview`}
                style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Header info */}
            <div style={{ marginTop: '28px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.35em', color: '#e05030', fontWeight: 700 }}>
                Case Study
              </p>
              <h3 style={{ marginTop: '10px', fontSize: '2rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em' }}>
                {project.title}
              </h3>
              <p style={{ marginTop: '14px', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', maxWidth: '680px' }}>
                {project.summary}
              </p>
            </div>

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {project.stack.map((item, i) => (
                  <span key={i} style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(192,57,43,0.28)',
                    background: 'rgba(192,57,43,0.08)',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#e07860',
                  }}>
                    {typeof item === 'string' ? item : <img src={item} alt="" style={{ height: '20px', width: '20px', objectFit: 'contain' }} />}
                  </span>
                ))}
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div style={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px',
              }}>
                {project.features.map((feature) => (
                  <div key={feature} style={{
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '18px',
                    fontSize: '0.88rem',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.65)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    {feature}
                  </div>
                ))}
              </div>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '14px',
              }}>
                {project.metrics.map((metric) => (
                  <div key={metric.label} style={{
                    borderRadius: '14px',
                    border: '1px solid rgba(192,57,43,0.2)',
                    background: 'rgba(192,57,43,0.05)',
                    padding: '18px',
                  }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>{metric.value}</p>
                    <p style={{ marginTop: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)' }}>
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">
                View GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
                Live Demo <ArrowUpRight size={16} />
              </a>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectModal
