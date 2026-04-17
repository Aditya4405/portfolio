import { useRef, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Code2, Cpu, CheckCircle2, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react'
import { FiGithub as Github, FiArrowRight as ArrowRight } from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

/**
 * ShowcasePanel component for featured projects (Split Layout)
 */
function ShowcasePanel({ project, index, theme }) {
  const containerRef = useRef(null)
  const isEven = index % 2 === 0
  const projectNumber = String(index + 1).padStart(2, '0')

  const impactStatement = useMemo(() => {
    const sentences = project.summary.split('. ')
    return sentences[0] + (sentences[0].endsWith('.') ? '' : '.')
  }, [project.summary])

  const mainDescription = useMemo(() => {
    const sentences = project.summary.split('. ')
    return sentences.slice(1).join('. ')
  }, [project.summary])

  const statusBadge = useMemo(() => {
    if (project.featured) return { text: 'Featured Project', icon: <CheckCircle2 size={12} /> }
    return { text: 'Experimental', icon: <FlaskConical size={12} /> }
  }, [project.featured])



  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [3, -3])
  const rotateY = useTransform(scrollYProgress, [0, 1], [isEven ? -3 : 3, isEven ? 3 : -3])

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        padding: '50px 0',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          flexDirection: isEven ? 'row' : 'row-reverse',
          alignItems: 'center',
          gap: 'clamp(32px, 6vw, 80px)',
          width: '100%',
        }}
      >
        {/* Visual Side (52%) */}
        <motion.div 
          className="project-visual-side"
          style={{
            flex: '0 0 52%',
            position: 'relative',
            perspective: '1200px',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            zIndex: -1,
          }} />

          <motion.div
            className="project-visual-frame"
            style={{
              width: '100%',
              maxHeight: '400px',
              aspectRatio: '16/10',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--card-shadow)',
              rotateX,
              rotateY,
            }}
          >
            <div style={{ height: '32px', background: 'rgba(120, 120, 120, 0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '6px', borderBottom: '1px solid var(--card-border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', opacity: 0.6 }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', opacity: 0.6 }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', opacity: 0.6 }} />
            </div>
            <div style={{ width: '100%', height: 'calc(100% - 32px)', overflow: 'hidden' }}>
              <img src={project.preview} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Content Side (48%) */}
        <motion.div 
          className="project-content-side"
          style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: '10px' }}
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>{projectNumber}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--primary-glow)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {statusBadge.icon}{statusBadge.text}
            </div>
          </div>
          <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>{project.title}</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', opacity: 0.9, lineHeight: 1.4, margin: '4px 0' }}>{impactStatement}</p>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{mainDescription}</p>
          
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '10px 14px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Cpu size={14} style={{ color: 'var(--primary)' }} />
             <div>
                <p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 800, margin: 0 }}>Core Achievement</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>{project.achievement || 'Industrial Architecture'}</p>
             </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '14px 0' }}>
            {project.stack.map(tech => (
              <span key={tech} className="tech-pill" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{tech}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.7rem' }}>
              Launch App <ArrowUpRight size={14} />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.7rem' }}>
              <Github size={14} /> Source
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * SmallProjectCard component for the Expandable Grid
 */
function SmallProjectCard({ project }) {
  return (
    <motion.div 
      className="card"
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
    >
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img src={project.preview} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary), transparent)', opacity: 0.6 }} />
        
        {/* Under Development Badge */}
        {project.status && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(251, 191, 36, 0.9)',
            color: '#000',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {project.status}
          </div>
        )}
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{project.title}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{project.summary}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.stack.map(t => <span key={t} className="tech-pill" style={{ fontSize: '0.65rem' }}>{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
          <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px', borderRadius: '8px', flex: 1, fontSize: '0.75rem' }}><Github size={14} /> GitHub</a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary" style={{ 
            padding: '8px', 
            borderRadius: '8px', 
            flex: 1, 
            fontSize: '0.75rem',
            opacity: project.status ? 0.5 : 1,
            pointerEvents: project.status ? 'none' : 'auto'
          }}>
            {project.status ? 'Coming Soon' : 'Live Demo'}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsSection({ projects }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme()
  
  const featured = projects.slice(0, 2)
  const others = projects.slice(2)

  return (
    <section id="projects" style={{ padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span className="section-eyebrow">Production</span>
          <h2 className="section-title">Industrial Projects</h2>
          <p className="section-description" style={{ margin: '0 auto' }}>Specialized in building full-stack applications with architectural depth and refined UI.</p>
        </motion.div>

        {/* Featured Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {featured.map((project, i) => (
            <ShowcasePanel key={project.title} project={project} index={i} theme={theme} />
          ))}
        </div>

        {/* Explore More Button */}
        {others.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '80px', position: 'relative' }}>
             <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05, boxShadow: theme === 'dark' ? '0 0 20px rgba(239, 68, 68, 0.3)' : '0 10px 20px rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              animate={theme === 'dark' ? { boxShadow: ['0 0 0px rgba(192, 57, 43, 0)', '0 0 15px rgba(192, 57, 43, 0.2)', '0 0 0px rgba(192, 57, 43, 0)'] } : {}}
              transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                border: theme === 'dark' ? '1px solid rgba(192, 57, 43, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
                padding: '16px 32px',
                borderRadius: '16px',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                boxShadow: 'var(--card-shadow)',
              }}
             >
               {isExpanded ? 'Show Less' : 'Explore More Projects'}
               <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ArrowRight size={18} />
               </motion.div>
             </motion.button>
          </div>
        )}

        {/* Expandable Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 60 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div 
                className="other-projects-grid" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                  gap: '30px' 
                }}
              >
                {others.map((project) => (
                  <SmallProjectCard key={project.title} project={project} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Responsive Overrides for this section */}
        <style>
          {`
            @media (max-width: 768px) {
              #projects { 
                padding: 60px 0 !important; 
              }

              /* The project row wrapper */
              #projects .container > div:nth-child(2) > div {
                min-height: auto !important; /* Remove the 480px gap */
                padding: 30px 0 !important;
              }

              /* The actual flex row that needs to become a column */
              #projects .container > div:nth-child(2) > div > .container {
                flex-direction: column !important;
                gap: 20px !important;
                align-items: flex-start !important;
              }

              .project-visual-side {
                flex: 0 0 auto !important;
                width: 100% !important;
                margin-bottom: 20px !important;
              }

              .project-content-side {
                flex: 0 0 auto !important;
                width: 100% !important;
                padding: 0 !important;
                opacity: 1 !important; /* Force visibility */
                transform: none !important; /* Prevent scroll-trigger delay/hidden state */
              }

              .project-visual-frame {
                max-height: 220px !important;
                height: auto !important;
                aspect-ratio: 16/10 !important;
              }

              .project-content-side h3 {
                font-size: 1.5rem !important;
                margin-bottom: 8px !important;
              }

              .project-content-side p {
                font-size: 0.9rem !important;
                line-height: 1.5 !important;
              }

              /* Buttons spacing fix */
              .project-content-side div[style*="display: flex"][style*="gap: 10px"] {
                flex-wrap: wrap !important;
                margin-top: 15px !important;
              }

              /* Safe bottom space - adjusted for better fit */
              #projects .container > div:last-child {
                margin-top: 40px !important;
                padding-bottom: 60px !important;
              }

              .other-projects-grid {
                grid-template-columns: 1fr !important;
                padding-bottom: 80px !important;
              }
            }
          `}
        </style>
      </div>
    </section>
  )
}

export default ProjectsSection
