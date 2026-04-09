import { Award, Medal, Sparkles, Trophy } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const icons = [Sparkles, Trophy, Medal, Award, Trophy, Sparkles]

function AchievementsSection({ milestones, counters }) {
  const compactItems = [
    { type: 'counter', title: counters[0].label, value: `${counters[0].value}${counters[0].suffix}` },
    { type: 'counter', title: counters[1].label, value: `${counters[1].value}${counters[1].suffix}` },
    ...milestones,
  ]

  return (
    <section id="achievements" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Achievements"
          title="A tighter milestone grid with better card density"
          description="Compact trophy, certification, and milestone cards arranged in a tighter desktop grid to reduce empty space."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {compactItems.map((item, index) => {
            const Icon = icons[index % icons.length]

            return (
              <div key={`${item.title}-${index}`} className="milestone-card compact-achievement-card">
                <div className="milestone-card__icon compact-achievement-card__icon">
                  <Icon size={16} className="text-cyan-200" />
                </div>
                {'value' in item ? (
                  <>
                    <p className="mt-2.5 text-[1.6rem] font-semibold text-white">{item.value}</p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-slate-500">{item.title}</p>
                  </>
                ) : (
                  <>
                    <p className="mt-2.5 text-[0.98rem] font-semibold leading-snug text-white">{item.title}</p>
                    <p className="mt-1.5 text-[0.9rem] leading-6 text-slate-400">{item.text}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
