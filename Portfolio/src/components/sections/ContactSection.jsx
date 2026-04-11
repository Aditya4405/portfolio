import { motion } from 'framer-motion'
import { Download, Mail, Send } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function ContactSection({ personalInfo, resumeUrl, formState, setFormState, sendEmail, formStatus }) {
  return (
    <div className="container">

      {/* Section Header — centered */}
      <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
          Let's build something great together
        </h2>
        <p className="section-description" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '520px' }}>
          Open for backend engineering roles, AI collaboration, and premium product building.
        </p>
      </motion.div>

      {/* 2-column: links + form */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        alignItems: 'start',
      }}>

        {/* LEFT: Contact links */}
        <motion.div {...fadeUp(0.1)} style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
            Get in touch
          </h3>

          <a
            href={`mailto:${personalInfo.email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-soft)',
              fontSize: '0.9rem',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--text-main)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-soft)'
            }}
          >
            <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            {personalInfo.email}
          </a>

          <a
            href={personalInfo.socials.find(s => s.label === 'LinkedIn')?.href ?? '#'}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-soft)',
              fontSize: '0.9rem',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--text-main)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-soft)'
            }}
          >
            <FiLinkedin size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            LinkedIn Profile
          </a>

          <a
            href={personalInfo.socials.find(s => s.label === 'GitHub')?.href ?? '#'}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-soft)',
              fontSize: '0.9rem',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--text-main)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-soft)'
            }}
          >
            <FiGithub size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            GitHub Profile
          </a>

          <a
            href={resumeUrl}
            download
            className="btn-primary"
            style={{ marginTop: '8px', justifyContent: 'center' }}
          >
            <Download size={17} /> Download Resume
          </a>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.form
          {...fadeUp(0.15)}
          onSubmit={sendEmail}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            Send a message
          </h3>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-soft)' }}>
              Name
            </span>
            <input
              className="contact-input"
              value={formState.name}
              onChange={(e) => setFormState(c => ({ ...c, name: e.target.value }))}
              placeholder="Your name"
              required
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-soft)' }}>
              Email
            </span>
            <input
              type="email"
              className="contact-input"
              value={formState.email}
              onChange={(e) => setFormState(c => ({ ...c, email: e.target.value }))}
              placeholder="your@email.com"
              required
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-soft)' }}>
              Message
            </span>
            <textarea
              className="contact-input"
              value={formState.message}
              onChange={(e) => setFormState(c => ({ ...c, message: e.target.value }))}
              placeholder="Tell me about your project or opportunity"
              rows={4}
              style={{ resize: 'none' }}
              required
            />
          </label>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
            <Send size={17} /> Send Message
          </button>

          {formStatus && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', textAlign: 'center' }}>{formStatus}</p>
          )}
        </motion.form>

      </div>
    </div>
  )
}

export default ContactSection
