import { motion as Motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { GitBranch, Layers3, UserRound, Zap } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { fadeUp, stagger } from '../../motion/variants'

function GitHubSection({ personalInfo, github, githubHighlights }) {
  const languageTotal = github.languages.reduce((sum, [, count]) => sum + count, 0)
  const pieStops = github.languages.length
    ? github.languages.reduce(
        (acc, [, count], index) => {
          const colors = ['#22d3ee', '#8b5cf6', '#38bdf8', '#10b981', '#f59e0b']
          const start = acc.offset
          const end = start + (count / languageTotal) * 100
          acc.stops.push(`${colors[index % colors.length]} ${start}% ${end}%`)
          acc.offset = end
          return acc
        },
        { offset: 0, stops: [] },
      ).stops.join(', ')
    : '#0f172a'

  return (
    <section id="github" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="GitHub"
          title="A tighter GitHub snapshot with heatmap and compact repository cards"
          description="The GitHub area is designed to feel alive with real activity, visual stats, and richer storytelling around coding momentum."
        />

        <div className="grid items-start gap-4 xl:grid-cols-[minmax(360px,0.32fr)_minmax(0,0.68fr)]">
          <Motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="github-profile-card">
            <div className="flex items-center gap-3">
              <img
                src={github.profile?.avatar_url ?? personalInfo.profileImage}
                alt="GitHub avatar"
                className="h-[4.5rem] w-[4.5rem] rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Profile Snapshot</p>
                <h3 className="mt-1.5 text-[1.2rem] font-semibold leading-tight text-white">{github.profile?.name ?? personalInfo.name}</h3>
                <p className="mt-1 text-[0.92rem] leading-6 text-slate-400">{github.profile?.bio ?? 'Full-stack engineer with a backend and AI mindset.'}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {githubHighlights.map((item, index) => {
                const icons = [GitBranch, UserRound, Layers3, Zap]
                const Icon = icons[index] ?? GitBranch
                return (
                  <div key={item.label} className="github-stat-card">
                    <Icon size={18} className="text-cyan-300" />
                    <p className="mt-2.5 text-[1.65rem] font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 grid gap-3">
              <div className="language-pie-card">
                <div className="language-pie" style={{ background: `conic-gradient(${pieStops})` }} />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">Top Languages</p>
              </div>
              <div className="space-y-2">
                {github.languages.map(([language, count]) => (
                  <div key={language} className="language-row">
                    <span>{language}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Motion.div>

          <div className="space-y-3">
            <Motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="github-heatmap-card">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Contribution Heatmap</p>
              <div className="mt-4 overflow-x-auto">
                <GitHubCalendar
                  username={personalInfo.githubUsername}
                  colorScheme="dark"
                  fontSize={11}
                  blockSize={10}
                  blockMargin={3}
                  theme={{ dark: ['#0f172a', '#083344', '#155e75', '#0891b2', '#22d3ee'] }}
                />
              </div>
            </Motion.div>

            <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-3 md:grid-cols-2">
              {github.repos.slice(0, 4).map((repo) => (
                <Motion.a key={repo.id} variants={fadeUp} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Repository</p>
                  <h3 className="mt-1.5 text-[1rem] font-semibold text-white">{repo.name}</h3>
                  <p className="mt-2 text-[0.9rem] leading-6 text-slate-400">
                    {repo.description ?? 'A public project from Aditya&apos;s GitHub profile.'}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-[0.85rem] text-slate-500">
                    <span>{repo.language ?? 'Mixed stack'}</span>
                    <span>{repo.stargazers_count ?? 0} stars</span>
                  </div>
                </Motion.a>
              ))}
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubSection
