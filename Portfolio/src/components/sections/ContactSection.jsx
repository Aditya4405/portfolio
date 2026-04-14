import { motion } from 'framer-motion'
import { Download, Mail, Send } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
})

function ContactSection({ personalInfo, resumeUrl, formState, setFormState, sendEmail, formStatus }) {
  return (
    <div className="container">

      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title" style={{ maxWidth: '560px', margin: '0 auto 14px' }}>
          Get In Touch
        </h2>
        <p className="section-description" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '480px' }}>
          I'm currently open to internship opportunities and interesting projects. Feel free to reach out!
        </p>
      </motion.div>

      {/* 2-column: links + form */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '28px',
        alignItems: 'start',
      }}>

        {/* LEFT: Contact links */}
        <motion.div {...fadeUp(0.08)} style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            Let's Connect
          </h3>

          {[
            { href: `mailto:${personalInfo.email}`, icon: Mail, label: personalInfo.email },
            {
              href: personalInfo.socials.find(s => s.label === 'LinkedIn')?.href ?? '#',
              icon: FiLinkedin,
              label: 'LinkedIn Profile',
              external: true,
            },
            {
              href: personalInfo.socials.find(s => s.label === 'GitHub')?.href ?? '#',
              icon: FiGithub,
              label: 'GitHub Profile',
              external: true,
            },
          ].map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '10px',
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
              <Icon size={17} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              {label}
            </a>
          ))}

          <a
            href={resumeUrl}
            download
            className="btn-primary"
            style={{ marginTop: '6px', justifyContent: 'center' }}
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.form
          {...fadeUp(0.12)}
          onSubmit={sendEmail}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
            Send a message
          </h3>

          {[
            { field: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
            { field: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
          ].map(({ field, label, type, placeholder }) => (
            <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-soft)' }}>{label}</span>
              <input
                className="contact-input"
                type={type}
                value={formState[field]}
                onChange={(e) => setFormState(c => ({ ...c, [field]: e.target.value }))}
                placeholder={placeholder}
                required
              />
            </label>
          ))}

          <label style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-soft)' }}>Message</span>
            <textarea
              className="contact-input"
              value={formState.message}
              onChange={(e) => setFormState(c => ({ ...c, message: e.target.value }))}
              placeholder="What's on your mind?"
              rows={4}
              style={{ resize: 'none' }}
              required
            />
          </label>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
            <Send size={16} /> Send
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
