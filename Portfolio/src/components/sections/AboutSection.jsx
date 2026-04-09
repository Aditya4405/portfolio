import { motion as Motion } from 'framer-motion'
import { BadgeCheck, GraduationCap, Sparkles, Trophy } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { fadeUp, stagger } from '../../motion/variants'

const miniIcons = {
  Sparkles,
  Trophy,
  BadgeCheck,
}

function AboutSection({ personalInfo, storyCards, miniAchievements, timeline, aboutHighlights }) {
  return (
    <section id="about" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="A backend-first builder with a product eye"
          description="A storytelling section that frames Aditya's transition from frontend curiosity into full-stack systems, cloud readiness, and applied AI exploration."
        />

        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <Motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="about-showcase">
            <div className="about-image-card">
              <img src={personalInfo.profileImage} alt="Aditya portrait showcase" className="about-image" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {miniAchievements.map((item) => {
                const Icon = miniIcons[item.icon]
                return (
                  <div key={item.label} className="mini-achievement">
                    <Icon size={18} className="text-cyan-300" />
                    <p className="mt-2 text-[1.4rem] font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </Motion.div>

          <div className="space-y-4">
            <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-3 md:grid-cols-3">
              {storyCards.map((card) => (
                <Motion.div key={card.title} variants={fadeUp} className="story-card">
                  <p className="story-card__title">{card.title}</p>
                  <p className="mt-2.5 text-[0.92rem] leading-7 text-slate-400">{card.text}</p>
                </Motion.div>
              ))}
            </Motion.div>

            <div className="grid gap-3 md:grid-cols-3">
              {aboutHighlights.map((item) => (
                <Motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="highlight-card">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/6 p-3 text-cyan-200">
                    {item.title === 'Education' ? <GraduationCap size={18} /> : item.title === 'Hackathon' ? <Trophy size={18} /> : <Sparkles size={18} />}
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cyan-200">{item.title}</p>
                  <h3 className="mt-2.5 text-[1rem] font-semibold leading-snug text-white">{item.subtitle}</h3>
                  <p className="mt-2 text-[0.92rem] leading-7 text-slate-400">{item.body}</p>
                </Motion.div>
              ))}
            </div>

            <div className="timeline-roadmap">
              {timeline.map((item) => (
                <Motion.div key={item.year} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="timeline-roadmap__item">
                  <div className="timeline-roadmap__node" />
                  <div className="timeline-roadmap__content">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{item.year}</p>
                    <h3 className="mt-2 text-[1.15rem] font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-7 text-slate-400">{item.description}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
