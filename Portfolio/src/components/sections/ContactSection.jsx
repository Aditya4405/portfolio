import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Send } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const VP = { once: true, amount: 0.15 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: 'easeOut', delay } })

function ContactSection({ personalInfo, resumeUrl, formState, setFormState, sendEmail, formStatus }) {
  return (
    <section id="contact" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something premium together"
            description="Open for backend engineering roles, AI collaboration, and premium product building."
          />
        </motion.div>

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)] mt-12">

          <motion.div {...base} {...t(0.1)}
            className="border border-white/5 bg-[#0B1120]/50 rounded-2xl p-8">
            <p className="text-[0.96rem] leading-7 text-slate-300">
              Open to internships, backend engineering opportunities, AI-focused collaboration, and premium product building.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-[#00D4FF] transition-colors text-sm">
                <Mail size={18} />{personalInfo.email}
              </a>
              <a href={resumeUrl} download
                className="primary-button compact-button w-fit bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] text-[#050816] mt-2">
                <Download size={18} />Download Resume
              </a>
              <a href="#home" className="secondary-button compact-button w-fit hover:bg-white/5">
                Back to top <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>

          <motion.form {...base} {...t(0.15)} onSubmit={sendEmail}
            className="border border-white/5 bg-[#0B1120]/50 rounded-2xl p-8">
            <div className="grid gap-5">
              <label className="space-y-2">
                <span className="text-[0.75rem] uppercase tracking-widest text-slate-400 font-bold">Name</span>
                <input
                  value={formState.name}
                  onChange={(e) => setFormState(c => ({ ...c, name: e.target.value }))}
                  className="contact-input w-full bg-transparent border border-white/10 focus:border-[#00D4FF]/50 outline-none p-3.5 rounded-xl text-white placeholder-slate-600 transition-colors"
                  placeholder="Your name" required
                />
              </label>
              <label className="space-y-2">
                <span className="text-[0.75rem] uppercase tracking-widest text-slate-400 font-bold">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(c => ({ ...c, email: e.target.value }))}
                  className="contact-input w-full bg-transparent border border-white/10 focus:border-[#00D4FF]/50 outline-none p-3.5 rounded-xl text-white placeholder-slate-600 transition-colors"
                  placeholder="your@email.com" required
                />
              </label>
              <label className="space-y-2">
                <span className="text-[0.75rem] uppercase tracking-widest text-slate-400 font-bold">Message</span>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(c => ({ ...c, message: e.target.value }))}
                  className="contact-input w-full min-h-32 resize-none bg-transparent border border-white/10 focus:border-[#00D4FF]/50 outline-none p-3.5 rounded-xl text-white placeholder-slate-600 transition-colors"
                  placeholder="Tell me about your idea" required
                />
              </label>
              <button type="submit"
                className="primary-button compact-button w-fit bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] text-[#050816] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:-translate-y-0.5 transition-all">
                <Send size={18} />Send Message
              </button>
              {formStatus && <p className="text-sm text-slate-400">{formStatus}</p>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
