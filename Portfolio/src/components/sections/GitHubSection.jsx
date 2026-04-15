import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { GitBranch, Layers3, UserRound, Zap } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const VP = { once: true, amount: 0.1 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } })

function GitHubSection({ personalInfo, github, githubHighlights }) {
  const languageTotal = github.languages.reduce((sum, [, count]) => sum + count, 0)
  const pieStops = github.languages.length
    ? github.languages.reduce(
        (acc, [, count], index) => {
          const colors = ['#c0392b', '#e05030', '#8b1a1a', '#cc4433', '#a03020']
          const start = acc.offset
          const end = start + (count / languageTotal) * 100
          acc.stops.push(`${colors[index % colors.length]} ${start}% ${end}%`)
          acc.offset = end
          return acc
        },
        { offset: 0, stops: [] },
      ).stops.join(', ')
    : '#0a0000'

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
              style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', backdropFilter: 'blur(10px)' }}>
              <img
                src={github.profile?.avatar_url ?? personalInfo.profileImage}
                alt="GitHub avatar"
                style={{ width: '64px', height: '64px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#e05030', fontWeight: 700 }}>Profile Snapshot</p>
                <h3 style={{ marginTop: '4px', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{github.profile?.name ?? personalInfo.name}</h3>
                <p style={{ marginTop: '2px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{github.profile?.bio ?? 'Full-stack engineer with a backend and AI mindset.'}</p>
              </div>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {githubHighlights.map((item, i) => {
                const icons = [GitBranch, UserRound, Layers3, Zap]
                const Icon = icons[i] ?? GitBranch
                return (
                  <motion.div key={item.label} {...base} {...t(i * 0.07)}
                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease, background 0.3s ease' }}
                    whileHover={{ borderColor: 'rgba(192,57,43,0.35)', background: 'rgba(255,255,255,0.05)' }}>
                    <Icon size={20} style={{ color: '#c0392b' }} />
                    <p style={{ marginTop: '12px', fontSize: '1.75rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</p>
                    <p style={{ marginTop: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{item.label}</p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div {...base} {...t(0.1)}
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `conic-gradient(${pieStops})` }} />
              <p style={{ marginTop: '16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Language Graph</p>
              <div style={{ marginTop: '16px', width: '100%' }}>
                {github.languages.map(([lang, count]) => (
                  <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '6px 0' }}>
                    <span>{lang}</span>
                    <span style={{ color: 'rgba(255,255,255,0.35)' }}>{count} Repos</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div {...base} {...t(0.05)}
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.35em', color: '#e05030', fontWeight: 700, marginBottom: '20px' }}>Contribution Grid</p>
              <div style={{ overflowX: 'auto' }}>
                <GitHubCalendar
                  username={personalInfo.githubUsername}
                  colorScheme="dark"
                  fontSize={11}
                  blockSize={11}
                  blockMargin={4}
                  theme={{ dark: ['#0a0000', '#2a0505', '#5a0f0f', '#8b1a1a', '#c0392b'] }}
                />
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {github.repos.slice(0, 4).map((repo, i) => (
                <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
                  {...base} {...t(i * 0.08)}
                  style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease' }}
                  whileHover={{ borderColor: 'rgba(192,57,43,0.35)', background: 'rgba(255,255,255,0.05)', translateY: -4 }}>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#e05030', fontWeight: 700 }}>Repository</p>
                  <h3 style={{ marginTop: '8px', fontSize: '1rem', fontWeight: 700, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{repo.name}</h3>
                  <p style={{ marginTop: '8px', fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {repo.description ?? "A public project from Aditya's GitHub."}
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                    <span>{repo.language ?? 'Mixed'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={12} style={{ color: '#c0392b' }} />{repo.stargazers_count ?? 0}</span>
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
