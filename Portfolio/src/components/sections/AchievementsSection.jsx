import { motion } from 'framer-motion'
import { Award, Medal, Sparkles, Trophy } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const icons = [Sparkles, Trophy, Medal, Award, Trophy, Sparkles]
const VP = { once: true, amount: 0.15 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: 'easeOut', delay } })

function AchievementsSection({ milestones, counters }) {
  const compactItems = [
    { type: 'counter', title: counters[0].label, value: `${counters[0].value}${counters[0].suffix}` },
    { type: 'counter', title: counters[1].label, value: `${counters[1].value}${counters[1].suffix}` },
    ...milestones,
  ]

  return (
    <section id="achievements" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="Achievements"
            title="Milestones & recognition"
            description="Compact trophy, certification, and milestone cards from the journey so far."
          />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-12">
          {compactItems.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div key={`${item.title}-${i}`} {...base} {...t(i * 0.06)}
                className="border border-white/5 bg-[#0B1120]/50 rounded-2xl p-6 hover:border-[#00D4FF]/20 transition-colors">
                <div className="inline-flex rounded-xl border border-white/10 bg-[#0B1120] p-3 w-fit">
                  <Icon size={16} className="text-[#00D4FF]" />
                </div>
                {'value' in item ? (
                  <>
                    <p className="mt-4 text-[1.6rem] font-bold text-white">{item.value}</p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-500">{item.title}</p>
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-[0.98rem] font-semibold text-white leading-snug">{item.title}</p>
                    <p className="mt-1.5 text-[0.9rem] leading-6 text-slate-400">{item.text}</p>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
