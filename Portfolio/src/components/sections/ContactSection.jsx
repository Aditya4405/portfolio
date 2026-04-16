import { motion } from 'framer-motion'
import { Download, Mail, Send } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

function ContactSection({ personalInfo, resumeUrl, formState, setFormState, sendEmail, formStatus, isSubmitting }) {
  const { theme } = useTheme()
  const isSuccess = formStatus.toLowerCase().includes('successfully') || formStatus.toLowerCase().includes('sent')

  return (
    <section id="contact" className="alt-bg">
      <div className="container" style={{ position: 'relative' }}>
        {/* Section Header */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '64px', position: 'relative', zIndex: 10 }}>
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
            Get In Touch
          </h2>
          <p className="section-description" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '520px' }}>
            I'm currently open to internship opportunities and interesting projects. Feel free to reach out!
          </p>
        </motion.div>

        {/* 2-column: links + form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 10,
        }}>

          {/* LEFT: Contact links */}
          <motion.div {...fadeUp(0.08)} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
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
                  gap: '14px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--card-border)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'var(--card-bg)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
                {label}
              </a>
            ))}

            <a
              href={resumeUrl}
              download
              className="btn-primary"
              style={{ marginTop: '12px', justifyContent: 'center', padding: '16px' }}
            >
              <Download size={18} /> Download Resume
            </a>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.form
            {...fadeUp(0.12)}
            onSubmit={sendEmail}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Send a message
            </h3>

            {[
              { field: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { field: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { field: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
            ].map(({ field, label, type, placeholder }) => (
              <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', opacity: 0.6 }}>{label}</span>
                <input
                  className="contact-input"
                  type={type}
                  value={formState[field]}
                  onChange={(e) => setFormState(c => ({ ...c, [field]: e.target.value }))}
                  placeholder={placeholder}
                  required
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', borderRadius: '12px', padding: '14px 18px' }}
                />
              </label>
            ))}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', opacity: 0.6 }}>Message</span>
              <textarea
                className="contact-input"
                value={formState.message}
                onChange={(e) => setFormState(c => ({ ...c, message: e.target.value }))}
                placeholder="What's on your mind?"
                rows={4}
                style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', resize: 'none', borderRadius: '12px', padding: '14px 18px' }}
                required
              />
            </label>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting}
              style={{ 
                justifyContent: 'center', 
                padding: '16px', 
                marginTop: '8px',
                opacity: isSubmitting ? 0.9 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {isSubmitting ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '120px', height: '14px', position: 'relative', overflow: 'hidden' }}>
                    <motion.svg 
                      width="240" 
                      height="14" 
                      viewBox="0 0 240 14"
                      initial={{ x: -120 }}
                      animate={{ x: 0 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <path 
                        d="M0 7 L5 2 L10 7 L15 12 L20 7 L25 2 L30 7 L35 12 L40 7 L45 2 L50 7 L55 12 L60 7 L65 2 L70 7 L75 12 L80 7 L85 2 L90 7 L95 12 L100 7 L105 2 L110 7 L115 12 L120 7 L125 2 L130 7 L135 12 L140 7 L145 2 L150 7 L155 12 L160 7 L165 2 L170 7 L175 12 L180 7 L185 2 L190 7 L195 12 L200 7 L205 2 L210 7 L215 12 L220 7 L225 2 L230 7 L235 12 L240 7" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </motion.svg>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>SENDING...</span>
                </div>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>

            {formStatus && (
              <p style={{ 
                fontSize: '0.9rem', 
                color: isSuccess ? '#22c55e' : '#ef4444', 
                textAlign: 'center', 
                fontWeight: 600,
                marginTop: '12px'
              }}>
                {formStatus}
              </p>
            )}
          </motion.form>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
