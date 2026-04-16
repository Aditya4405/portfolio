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
                width: '100%',
                justifyContent: 'center', 
                padding: '16px', 
                marginTop: '8px',
                position: 'relative',
                overflow: 'hidden',
                height: '54px', /* Consistent height */
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: isSubmitting ? 0.9 : 1
              }}
            >
              {!isSubmitting ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Send size={18} /> Send Message
                </motion.div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: '100%' }}>
                  {/* Wave Loader */}
                  <div style={{ width: '120px', height: '14px', position: 'relative', overflow: 'hidden' }}>
                    <motion.svg 
                      width="240" 
                      height="14" 
                      viewBox="0 0 240 14"
                      initial={{ x: -120 }}
                      animate={{ x: 0 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    >
                      {/* Suble Glow behind wave */}
                      <path 
                        d="M0 7 Q 10 2, 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 T 140 7 T 160 7 T 180 7 T 200 7 T 220 7 T 240 7" 
                        fill="none" 
                        stroke="#8ab4f8" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        style={{ filter: 'blur(2px)', opacity: 0.4 }}
                      />
                      {/* Main Wavy Line */}
                      <path 
                        d="M0 7 Q 10 2, 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 T 140 7 T 160 7 T 180 7 T 200 7 T 220 7 T 240 7" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                    </motion.svg>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginTop: '-2px' }}
                  >
                    SENDING...
                  </motion.span>
                </div>
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
