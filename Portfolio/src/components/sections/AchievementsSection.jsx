import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink, Award, Cpu, BookOpen, Trophy } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.jsx'

function AchievementsSection({ achievements }) {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const isDark = theme === 'dark'

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length)
  }

  const cert = achievements[currentIndex]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const [[page, direction], setPage] = useState([0, 0])
  const paginate = (newDirection) => {
    const nextIndex = (currentIndex + newDirection + achievements.length) % achievements.length
    setPage([page + newDirection, newDirection])
    setCurrentIndex(nextIndex)
  }

  return (
    <section id="achievements" style={{ padding: '100px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <span className="section-eyebrow">Validations</span>
          <h2 className="section-title">Certifying Excellence</h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            A compilation of professional certifications and competitive wins that validate my technical journey.
          </p>
        </motion.div>

        {/* Certificate Showcase Split Layout */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'stretch',
          minHeight: '520px',
          position: 'relative',
          zIndex: 10,
        }} className="achievements-split">
        <style>{`
            @media (max-width: 768px) {
              /* Section Header */
              .section-title { font-size: clamp(1.8rem, 8vw, 2.5rem) !important; }
              
              /* Split Layout Fix */
              .achievements-split { 
                flex-direction: column !important; 
                min-height: auto !important;
                gap: 20px !important;
              }
              
              /* Certificate Viewer - MUST BE VISIBLE */
              .cert-viewer-side { 
                flex: 0 0 auto !important; 
                width: 100% !important;
                height: 280px !important; /* Fixed height to prevent collapse */
                min-height: 260px !important;
                position: relative !important;
                overflow: hidden !important;
              }

              .cert-viewer-side > div {
                padding: 15px !important;
              }

              /* Certificate Image */
              .cert-viewer-side img {
                max-height: 180px !important;
                width: auto !important;
                height: auto !important;
              }

              /* Slider Controls - Attached to Image */
              .cert-viewer-side button {
                width: 36px !important;
                height: 36px !important;
                left: 10px !important;
              }
              .cert-viewer-side button:last-of-type {
                left: auto !important;
                right: 10px !important;
              }
              
              /* Dots progress */
              .cert-viewer-side div[style*="bottom: 20px"] {
                bottom: 10px !important;
              }

              /* Details Side */
              .cert-details-side { 
                flex: 0 0 auto !important; 
                width: 100% !important;
                padding: 10px 0 !important;
                text-align: left !important;
              }

              .cert-details-side h3 {
                font-size: 1.5rem !important;
                line-height: 1.2 !important;
              }

              /* Skills Pills Wrap */
              .cert-details-side div[style*="display: flex"][style*="flex-wrap: wrap"] {
                gap: 6px !important;
              }

              /* CTA Button Group */
              .cert-details-side .btn-primary {
                width: 100% !important;
                justify-content: center !important;
                margin-bottom: 90px !important; /* Safe space for chatbot */
                padding: 14px !important;
              }
            }

            @media (min-width: 769px) and (max-width: 1024px) {
              .achievements-split { flex-direction: column !important; }
              .cert-viewer-side { flex: 1 1 100% !important; height: 350px !important; }
              .cert-details-side { flex: 1 1 100% !important; padding: 0 !important; }
            }
          `}</style>
          
          {/* Left Side: Image Viewer (60%) */}
          <div className="cert-viewer-side" style={{
            flex: '0 0 60%',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
          }}>
             <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '30px',
                }}
              >
                {/* Browser Frame Accent */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain', 
                      borderRadius: '8px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid var(--card-border)',
                    }} 
                  />
                  
                  {/* Zoom Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.2)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    transition: 'opacity 0.3s ease',
                    cursor: 'pointer',
                  }} className="zoom-overlay">
                    <Maximize2 color="white" size={32} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <button 
              onClick={() => paginate(-1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => paginate(1)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Progress Dots */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 20,
            }}>
              {achievements.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: i === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === currentIndex ? 'var(--primary)' : 'var(--text-secondary)',
                    opacity: i === currentIndex ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Right Side: Details Side (40%) */}
          <div className="cert-details-side" style={{
            flex: '0 0 40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {/* Badge + Counter */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    background: 'var(--primary-glow)',
                    color: 'var(--primary)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}>
                    {cert.category} Certification
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    {currentIndex + 1} / {achievements.length}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {cert.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', opacity: 0.9 }}>
                    {cert.org}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {cert.platform} • {cert.year}
                  </p>
                </div>

                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '8px 0' }}>
                  {cert.description}
                </p>

                {/* Skills Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0' }}>
                  {cert.skills.map((skill) => (
                    <span key={skill} className="tech-pill" style={{ 
                      fontSize: '0.7rem', 
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      border: '1px solid var(--card-border)',
                      padding: '4px 10px',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                  <a 
                    href="#" 
                    className="btn-primary" 
                    style={{ padding: '12px 24px', fontSize: '0.85rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    View Certificate <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${isDark ? 'rgba(239, 68, 68, 0.03)' : 'rgba(239, 68, 68, 0.015)'} 0%, transparent 70%)`,
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
    </section>
  )
}

export default AchievementsSection
