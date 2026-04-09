import { ArrowUpRight, Download, Mail, Send } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import MagneticButton from '../MagneticButton'

function ContactSection({
  personalInfo,
  resumeUrl,
  formState,
  setFormState,
  sendEmail,
  formStatus,
}) {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something premium together"
          description="A glassmorphism contact area designed for collaboration, backed by EmailJS and a clear call to action."
        />

        <div className="grid items-start gap-4 xl:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)]">
          <div className="contact-panel h-fit">
            <p className="text-[0.96rem] leading-7 text-slate-300">
              Open to internships, backend engineering opportunities, AI-focused collaboration, and premium product building.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={`mailto:${personalInfo.email}`} className="contact-link">
                <Mail size={18} />
                {personalInfo.email}
              </a>
              <MagneticButton as="a" href={resumeUrl} download className="primary-button premium-button compact-button w-fit">
                <Download size={18} />
                Download Resume
              </MagneticButton>
              <a href="#home" className="secondary-button premium-button compact-button w-fit">
                Back to top
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <form onSubmit={sendEmail} className="contact-form-shell">
            <div className="grid gap-3.5">
              <label className="space-y-2">
                <span className="contact-label">Name</span>
                <input
                  value={formState.name}
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                  className="contact-input"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="contact-label">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                  className="contact-input"
                  placeholder="Your email"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="contact-label">Message</span>
                <textarea
                  value={formState.message}
                  onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                  className="contact-input min-h-28 resize-none"
                  placeholder="Tell me about your idea"
                  required
                />
              </label>
              <MagneticButton type="submit" className="primary-button premium-button compact-button w-fit">
                <Send size={18} />
                Send Message
              </MagneticButton>
              <p className="text-sm text-slate-400">{formStatus}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
