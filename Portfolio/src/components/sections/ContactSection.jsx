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

            <div style={{ position: 'relative', marginTop: '8px' }}>
              {!isSubmitting ? (
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ 
                    width: '100%',
                    justifyContent: 'center', 
                    padding: '16px', 
                  }}
                >
                  <Send size={18} /> Send Message
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    width: '100%', 
                    background: 'var(--card-bg)', 
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sending message...</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Please keep this window open while we deliver your message.
                  </p>
                  
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    {/* The Wavy Progress Path */}
                    <motion.div 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: '100%', 
                        width: '100%',
                        overflow: 'hidden'
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 4, ease: "easeOut" }}
                    >
                      <motion.svg 
                        width="600" 
                        height="12" 
                        viewBox="0 0 600 12"
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        style={{ position: 'absolute', top: '-4px', left: 0 }}
                      >
                        <path 
                          d="M0 6 Q 10 1, 20 6 T 40 6 T 60 6 T 80 6 T 100 6 T 120 6 T 140 6 T 160 6 T 180 6 T 200 6 T 220 6 T 240 6 T 260 6 T 280 6 T 300 6 T 320 6 T 340 6 T 360 6 T 380 6 T 400 6 T 420 6 T 440 6 T 460 6 T 480 6 T 500 6 T 520 6 T 540 6 T 560 6 T 580 6 T 600 6" 
                          fill="none" 
                          stroke="#8ab4f8" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {formStatus && !isSubmitting && (
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
