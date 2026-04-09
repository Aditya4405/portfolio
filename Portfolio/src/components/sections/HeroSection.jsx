import { motion as MotionPrimitive } from 'framer-motion'
import { ArrowDownRight, Download, Sparkles } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { TypeAnimation } from 'react-type-animation'
import MagneticButton from '../MagneticButton'
import { fadeUp, scaleIn, stagger } from '../../motion/variants'

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
  LeetCode: SiLeetcode,
}

function HeroSection({ personalInfo, heroMetrics, floatingSkills, resumeUrl }) {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-8 pt-8 lg:px-10">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="absolute inset-x-0 top-12 mx-auto h-[16rem] max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_56%)] blur-3xl" />
      <div className="mx-auto grid min-h-[64vh] max-w-7xl items-center gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <MotionPrimitive.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <MotionPrimitive.div variants={fadeUp} className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
            <Sparkles size={16} />
            Full-Stack + AI Engineer
          </MotionPrimitive.div>

          <MotionPrimitive.h1 variants={fadeUp} className="mt-5 max-w-[13ch] font-display text-[3.35rem] font-semibold leading-[0.92] text-white md:text-[4.35rem] xl:text-[4.7rem]">
            Designing polished products around{' '}
            <span className="bg-[linear-gradient(120deg,#e0f2fe_10%,#67e8f9_42%,#c084fc_100%)] bg-clip-text text-transparent">
              backend depth
            </span>{' '}
            and intelligent systems.
          </MotionPrimitive.h1>

          <MotionPrimitive.p variants={fadeUp} className="mt-3.5 text-[0.98rem] text-slate-300 md:text-[1.18rem]">
            Hi, I&apos;m {personalInfo.name}
          </MotionPrimitive.p>

          <MotionPrimitive.div variants={fadeUp} className="mt-3.5 max-w-2xl text-[0.92rem] leading-7 text-slate-400 md:text-[0.98rem]">
            <TypeAnimation
              sequence={[
                personalInfo.title,
                1600,
                'Building scalable web apps, elegant APIs, and impactful AI experiences.',
                1600,
                ...personalInfo.roles.flatMap((role) => [role, 1000]),
              ]}
              speed={55}
              repeat={Infinity}
            />
          </MotionPrimitive.div>

          <MotionPrimitive.p variants={fadeUp} className="mt-5 max-w-[38rem] text-[0.94rem] leading-7 text-slate-400">
            Inspired by editorial developer portfolios, this experience frames Aditya as an engineer who cares equally about interface quality, service architecture, and practical AI execution.
          </MotionPrimitive.p>

          <MotionPrimitive.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
            <MagneticButton as="a" href="#projects" className="primary-button premium-button">
              Explore Work
              <ArrowDownRight size={18} />
            </MagneticButton>
            <MagneticButton as="a" href={resumeUrl} download className="secondary-button premium-button">
              <Download size={18} />
              Download Resume
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="secondary-button premium-button">
              <FiMail size={18} />
              Contact
            </MagneticButton>
          </MotionPrimitive.div>

          <MotionPrimitive.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
            {personalInfo.socials.map((social) => {
              const Icon = socialIcons[social.label]
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                  <Icon size={18} />
                  {social.label}
                </a>
              )
            })}
          </MotionPrimitive.div>

          <MotionPrimitive.div variants={fadeUp} className="mt-6 grid gap-3 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="glass-panel">
                <p className="text-[2rem] font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
              </div>
            ))}
          </MotionPrimitive.div>
        </MotionPrimitive.div>

        <MotionPrimitive.div variants={scaleIn} initial="hidden" animate="show" className="relative self-center">
          <div className="profile-shell">
            <div className="profile-rings" />
            <div className="profile-rings profile-rings--secondary" />
            <div className="profile-card">
              <img src={personalInfo.profileImage} alt="Aditya Prajapati portrait" className="profile-image" />
              <div className="profile-card__footer">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Current Focus</p>
                  <p className="mt-2 text-[1.02rem] font-semibold text-white md:text-[1.08rem]">Premium full-stack products with Java + AI</p>
                </div>
              </div>
            </div>

            {floatingSkills.map((skill, index) => (
              <MotionPrimitive.div
                key={skill}
                className={`orbit-chip orbit-chip--${(index % 6) + 1}`}
                animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
                transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {skill}
              </MotionPrimitive.div>
            ))}
          </div>
        </MotionPrimitive.div>
      </div>
    </section>
  )
}

export default HeroSection
