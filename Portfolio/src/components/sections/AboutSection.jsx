import { motion } from 'framer-motion'
import aboutPhoto from "../../assets/images/p2.png"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
})

function AboutSection({ personalInfo, aboutHighlights }) {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '56px' }}>
        <span className="section-eyebrow">About Me</span>
        <h2 className="section-title">A bit about who I am</h2>
      </motion.div>

      {/* 2-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '56px',
        alignItems: 'start',
        marginBottom: '56px',
      }}>

        {/* LEFT: Profile Image */}
        <motion.div {...fadeUp(0.08)} style={{ position: 'relative' }}>
          <div style={{
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--card-bg)',
            padding: '8px',
          }}>
            <img
              src={personalInfo.aboutImage}
              alt="Aditya Prajapati"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '10px',
                display: 'block',
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT: bio */}
        <motion.div {...fadeUp(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-soft)' }}>
            I'm a 3rd-year Computer Science student at PSIT Kanpur who loves building real-world software products that solve meaningful problems. My journey started with curiosity about how digital systems work, and today that curiosity has evolved into designing full-stack applications, backend-heavy systems, and AI-powered solutions.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-soft)' }}>
            My core strength lies in React, Node.js, Java, Spring Boot, REST APIs, MySQL, MongoDB, and Firebase. I enjoy architecting scalable backend workflows, building clean user interfaces, and turning product ideas into practical solutions — from healthcare reporting platforms to campus navigation systems and intelligent AI assistants.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-soft)' }}>
           Beyond development, I actively sharpen my problem-solving skills through DSA, hackathons, and continuous project building. I’m driven by learning through execution.
          </p>

          {/* Education card */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: '10px',
            padding: '18px 20px',
          }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '4px' }}>Education</p>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>B.Tech Computer Science & Engineering</h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-soft)' }}>PSIT Kanpur · 2023 – Present · 3rd Year</p>
          </div>
        </motion.div>
      </div>

      {/* Highlight cards */}
      <motion.div
        {...fadeUp(0.16)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {aboutHighlights.map((item) => (
          <div key={item.title} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '20px',
          }}>
            <span style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'block' }}>{item.icon}</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>{item.title}</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-soft)' }}>{item.body}</p>
          </div>
        ))}
      </motion.div>

    </div>
  )
}

export default AboutSection
