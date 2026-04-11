import { motion } from 'framer-motion'
import { BadgeCheck, GraduationCap, Sparkles, Trophy } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const miniIcons = { Sparkles, Trophy, BadgeCheck }
const VP = { once: true, amount: 0.15 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0, duration = 0.7) => ({ transition: { duration, ease: 'easeOut', delay } })

function AboutSection({ personalInfo, storyCards, miniAchievements, timeline, aboutHighlights }) {
  return (
    <section id="about" className="relative px-6 py-24 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="Backstory & Transition"
            title="A backend-first builder with a product eye"
            description="From frontend curiosity to full-stack systems, cloud readiness, and applied AI exploration."
          />
        </motion.div>

        <div className="grid gap-14 xl:grid-cols-[0.8fr_1.2fr] mt-12">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div {...base} {...t(0.1)}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0B1120] p-1 shadow-2xl">
              <img src={personalInfo.profileImage} alt="Aditya portrait"
                className="w-full h-auto aspect-square object-cover rounded-xl" />
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-3">
              {miniAchievements.map((item, i) => {
                const Icon = miniIcons[item.icon]
                return (
                  <motion.div key={item.label} {...base} {...t(i * 0.08)}
                    className="border border-white/10 bg-[#0B1120]/50 rounded-xl p-4 flex flex-col items-center text-center">
                    <Icon size={18} className="text-[#3B82F6]" />
                    <p className="mt-2 text-[1.4rem] font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#94A3B8] font-bold">{item.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {storyCards.map((card, i) => (
                <motion.div key={card.title} {...base} {...t(i * 0.08)}
                  className="border border-white/5 bg-[#0B1120]/40 rounded-xl p-6 hover:border-white/10 transition-colors">
                  <p className="text-[1rem] font-bold text-white">{card.title}</p>
                  <p className="mt-2.5 text-[0.92rem] leading-7 text-slate-400">{card.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {aboutHighlights.map((item, i) => (
                <motion.div key={item.title} {...base} {...t(i * 0.08)}
                  className="border border-white/5 bg-[#0B1120]/40 rounded-xl p-6 flex flex-col hover:border-[#3B82F6]/30 transition-colors">
                  <div className="inline-flex rounded-xl border border-white/10 bg-[#0B1120] p-3 text-[#3B82F6] w-fit">
                    {item.title === 'Education' ? <GraduationCap size={18} /> : item.title === 'Hackathon' ? <Trophy size={18} /> : <Sparkles size={18} />}
                  </div>
                  <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#3B82F6] font-bold">{item.title}</p>
                  <h3 className="mt-1.5 text-[1rem] font-bold text-white">{item.subtitle}</h3>
                  <p className="mt-2 text-[0.92rem] leading-7 text-slate-400">{item.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="border-l border-white/10 ml-2 pl-6 space-y-6">
              {timeline.map((item, i) => (
                <motion.div key={item.year} {...base} {...t(i * 0.08)} className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#3B82F6] font-bold">{item.year}</p>
                  <h3 className="mt-1 text-[1.1rem] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-7 text-slate-400 max-w-[500px]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
