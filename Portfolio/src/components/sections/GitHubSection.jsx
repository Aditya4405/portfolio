import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { GitBranch, Layers3, UserRound, Zap } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const VP = { once: true, amount: 0.1 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: 'easeOut', delay } })

function GitHubSection({ personalInfo, github, githubHighlights }) {
  const languageTotal = github.languages.reduce((sum, [, count]) => sum + count, 0)
  const pieStops = github.languages.length
    ? github.languages.reduce(
        (acc, [, count], index) => {
          const colors = ['#00D4FF', '#8b5cf6', '#60A5FA', '#a855f7', '#38bdf8']
          const start = acc.offset
          const end = start + (count / languageTotal) * 100
          acc.stops.push(`${colors[index % colors.length]} ${start}% ${end}%`)
          acc.offset = end
          return acc
        },
        { offset: 0, stops: [] },
      ).stops.join(', ')
    : '#050816'

  return (
    <section id="github" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="GitHub Activity"
            title="Engineering momentum in numbers"
            description="Real activity, visual stats, and storytelling around coding momentum."
          />
        </motion.div>

        <div className="grid items-start gap-10 xl:gap-14 xl:grid-cols-[minmax(360px,0.32fr)_minmax(0,0.68fr)] mt-12">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div {...base} {...t(0.05)}
              className="flex items-center gap-4 border border-white/10 bg-[#0B1120]/50 rounded-2xl p-5">
              <img
                src={github.profile?.avatar_url ?? personalInfo.profileImage}
                alt="GitHub avatar"
                className="h-16 w-16 rounded-xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#00D4FF] font-bold">Profile Snapshot</p>
                <h3 className="mt-1 text-lg font-bold text-white">{github.profile?.name ?? personalInfo.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400 leading-5">{github.profile?.bio ?? 'Full-stack engineer with a backend and AI mindset.'}</p>
              </div>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {githubHighlights.map((item, i) => {
                const icons = [GitBranch, UserRound, Layers3, Zap]
                const Icon = icons[i] ?? GitBranch
                return (
                  <motion.div key={item.label} {...base} {...t(i * 0.07)}
                    className="border border-white/10 bg-[#0B1120]/50 rounded-2xl p-5 hover:border-[#00D4FF]/30 transition-colors">
                    <Icon size={20} className="text-[#00D4FF]" />
                    <p className="mt-3 text-[1.75rem] font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-[#94A3B8] font-bold">{item.label}</p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div {...base} {...t(0.1)}
              className="border border-white/10 bg-[#0B1120]/50 rounded-2xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full"
                style={{ background: `conic-gradient(${pieStops})` }} />
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#94A3B8] font-bold">Language Graph</p>
              <div className="mt-4 w-full space-y-2">
                {github.languages.map(([lang, count]) => (
                  <div key={lang} className="flex justify-between text-[0.85rem] text-slate-400 border-b border-white/5 py-1.5">
                    <span>{lang}</span>
                    <span className="text-slate-500">{count} Repos</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <motion.div {...base} {...t(0.05)}
              className="border border-white/10 bg-[#0B1120]/50 rounded-2xl p-6 overflow-hidden">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#00D4FF] font-bold mb-5">Contribution Grid</p>
              <div className="overflow-x-auto">
                <GitHubCalendar
                  username={personalInfo.githubUsername}
                  colorScheme="dark"
                  fontSize={11}
                  blockSize={11}
                  blockMargin={4}
                  theme={{ dark: ['#050816', '#083344', '#155e75', '#0891b2', '#00D4FF'] }}
                />
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {github.repos.slice(0, 4).map((repo, i) => (
                <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
                  {...base} {...t(i * 0.08)}
                  className="flex flex-col border border-white/5 bg-[#0B1120] rounded-2xl p-5 hover:border-[#00D4FF]/30 hover:bg-white/5 transition-all hover:-translate-y-1">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#00D4FF] font-bold">Repository</p>
                  <h3 className="mt-2 text-lg font-bold text-white truncate">{repo.name}</h3>
                  <p className="mt-2 text-[0.85rem] leading-6 text-slate-400 line-clamp-2">
                    {repo.description ?? "A public project from Aditya's GitHub."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-[0.75rem] text-slate-500">
                    <span>{repo.language ?? 'Mixed'}</span>
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-[#A855F7]" />{repo.stargazers_count ?? 0}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubSection
