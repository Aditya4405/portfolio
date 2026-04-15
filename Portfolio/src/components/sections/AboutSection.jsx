import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { useTheme } from '../../hooks/useTheme.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

function AboutSection({ personalInfo, aboutHighlights }) {
  const { theme } = useTheme()
  return (
    <section id="about" className="alt-bg">
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Section Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
          <SectionHeading title="A bit about who I am" eyebrow="Discovery" />
        </motion.div>

        {/* 2-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '64px',
          position: 'relative',
          zIndex: 10,
        }}>

          {/* LEFT: Profile Image */}
          <motion.div {...fadeUp(0.08)} style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px',
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              padding: '12px',
              boxShadow: theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
            }}>
              <img
                src={personalInfo.aboutImage}
                alt="Aditya Prajapati"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT: bio */}
          <motion.div {...fadeUp(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-secondary)' }}>
              I'm a 3rd-year Computer Science student at PSIT Kanpur who loves building real-world software products that solve meaningful problems. My journey started with curiosity about how digital systems work, and today that curiosity has evolved into designing full-stack applications, backend-heavy systems, and AI-powered solutions.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-secondary)' }}>
              My core strength lies in React, Node.js, Java, Spring Boot, REST APIs, MySQL, MongoDB, and Firebase. I enjoy architecting scalable backend workflows, building clean user interfaces, and turning product ideas into practical solutions — from healthcare reporting platforms to campus navigation systems and intelligent AI assistants.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-secondary)' }}>
              I thrive in the space between backend logic and frontend experience. Whether it's optimizing a Java Spring Boot service or building a dynamic UI with React, my goal is always the same: to create scalable, performant, and user-centric software.
            </p>

            <motion.div {...fadeUp(0.15)} style={{
              marginTop: '8px',
              padding: '24px',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                flexShrink: 0,
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>B.Tech in Computer Science</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>PSIT Kanpur · 2023 — 2027</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <motion.div
          {...fadeUp(0.16)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {aboutHighlights.map((item) => (
            <div key={item.title} className="card" style={{ padding: '24px' }}>
              <span style={{ fontSize: '1.8rem', marginBottom: '14px', display: 'block' }}>{item.icon}</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{item.body}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default AboutSection
