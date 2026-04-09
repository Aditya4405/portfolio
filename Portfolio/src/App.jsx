import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import Tilt from 'react-parallax-tilt'
import { GitHubCalendar } from 'react-github-calendar'
import { TypeAnimation } from 'react-type-animation'
import emailjs from 'emailjs-com'
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiSend,
  FiStar,
} from 'react-icons/fi'
import {
  SiFirebase,
  SiGithub,
  SiJavascript,
  SiLeetcode,
  SiMysql,
  SiReact,
  SiSpringboot,
} from 'react-icons/si'
import DeveloperTerminal from './components/DeveloperTerminal'
import ProjectModal from './components/ProjectModal'
import SectionHeading from './components/SectionHeading'
import {
  achievements,
  counters,
  education,
  heroMetrics,
  personalInfo,
  projects,
  skills,
  techCards,
  timeline,
} from './data/portfolio'

const LazyChatbot = lazy(() => import('./components/Chatbot'))

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
  LeetCode: SiLeetcode,
}

const skillIcons = {
  React: SiReact,
  JavaScript: SiJavascript,
  'Spring Boot': SiSpringboot,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  'Git & GitHub': SiGithub,
}

const resumeUrl = '/resume.pdf'

function useGithubAnalytics(username) {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    languages: [],
    loading: true,
  })

  useEffect(() => {
    let active = true

    const fetchGithub = async () => {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ])

        const [profile, repos] = await Promise.all([
          profileResponse.json(),
          reposResponse.json(),
        ])

        if (!active) return

        const languageMap = (Array.isArray(repos) ? repos : []).reduce((accumulator, repo) => {
          if (repo.language) {
            accumulator[repo.language] = (accumulator[repo.language] ?? 0) + 1
          }
          return accumulator
        }, {})

        const languages = Object.entries(languageMap)
          .sort((first, second) => second[1] - first[1])
          .slice(0, 5)

        setData({
          profile,
          repos: Array.isArray(repos) ? repos : [],
          languages,
          loading: false,
        })
      } catch {
        if (!active) return
        setData({
          profile: null,
          repos: [],
          languages: [],
          loading: false,
        })
      }
    }

    fetchGithub()

    return () => {
      active = false
    }
  }, [username])

  return data
}

function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const animation = gsap.to(
      { val: 0 },
      {
        val: value,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate() {
          setCount(Math.round(this.targets()[0].val))
        },
      },
    )

    return () => animation.kill()
  }, [value])

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
      <p className="text-4xl font-semibold text-white">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
    </div>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('')
  const github = useGithubAnalytics(personalInfo.githubUsername)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const floating = gsap.fromTo(
      '.hero-orb',
      { yPercent: -8, xPercent: -2 },
      {
        yPercent: 10,
        xPercent: 4,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.6,
      },
    )

    return () => {
      cancelAnimationFrame(frame)
      floating.kill()
      lenis.destroy()
    }
  }, [])

  const githubHighlights = useMemo(() => {
    const repoCount = github.profile?.public_repos ?? 0
    const followers = github.profile?.followers ?? 0
    const starredEstimate = github.repos.reduce(
      (total, repo) => total + (repo.stargazers_count ?? 0),
      0,
    )

    return [
      { label: 'Repositories', value: repoCount },
      { label: 'Followers', value: followers },
      { label: 'Stars Across Repos', value: starredEstimate },
      { label: 'Top Languages', value: github.languages.length || 0 },
    ]
  }, [github.languages.length, github.profile, github.repos])

  const sendEmail = async (event) => {
    event.preventDefault()
    setFormStatus('Sending message...')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus('EmailJS keys are not configured yet. Add VITE_EMAILJS_* env vars.')
      return
    }

    try {
      await emailjs.send(serviceId, templateId, formState, publicKey)
      setFormStatus('Message sent successfully. Thanks for reaching out.')
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setFormStatus('Message could not be sent right now. Please email directly instead.')
    }
  }

  return (
    <div className="relative overflow-x-hidden bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_35%),linear-gradient(180deg,#020617,#030712_35%,#020617)]" />

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="hero-orb absolute rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.45),rgba(103,232,249,0.02)_65%,transparent_70%)] blur-2xl"
            style={{
              width: `${120 + index * 6}px`,
              height: `${120 + index * 6}px`,
              left: `${(index * 17) % 100}%`,
              top: `${(index * 11) % 100}%`,
            }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#home" className="text-lg font-semibold tracking-[0.3em] text-slate-100">
            AP
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-cyan-300">About</a>
            <a href="#skills" className="transition hover:text-cyan-300">Skills</a>
            <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
            <a href="#github" className="transition hover:text-cyan-300">GitHub</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] lg:px-10"
        >
          <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <FiStar />
              Premium Portfolio Experience
            </span>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
              Hi, I&apos;m{' '}
              <span className="bg-[linear-gradient(120deg,#ffffff_10%,#67e8f9_50%,#a855f7_100%)] bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-2xl">
              {personalInfo.shortTitle}
            </p>
            <div className="mt-6 text-lg text-cyan-200 md:text-xl">
              <TypeAnimation
                sequence={[
                  'Building scalable web apps, intelligent systems, and impactful AI solutions',
                  1500,
                  ...personalInfo.roles.flatMap((role) => [role, 1200]),
                ]}
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400">
              I started with HTML, CSS, and JavaScript, then went deeper into Java backend engineering, Spring Boot APIs, and AI-led projects that solve practical problems with polished product thinking.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="primary-button">Explore My Work</a>
              <a href={resumeUrl} className="secondary-button" download>
                <FiDownload />
                Download Resume
              </a>
              <a href="#contact" className="secondary-button">Contact Me</a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {personalInfo.socials.map((social) => {
                const Icon = socialIcons[social.label]
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                    <Icon />
                    {social.label}
                  </a>
                )
              })}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {heroMetrics.map((item) => (
                <div key={item.label} className="glass-card">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div className="relative" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.18} className="h-full">
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-[linear-gradient(180deg,rgba(8,15,30,0.82),rgba(15,23,42,0.88))] p-6 shadow-[0_25px_100px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.2),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_28%)]" />
                <div className="relative">
                  <div className="profile-ring mx-auto flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(15,23,42,0.45),rgba(15,23,42,0.95))]">
                    <div className="flex h-56 w-56 items-center justify-center rounded-full bg-[linear-gradient(135deg,#22d3ee,#8b5cf6)] text-6xl font-semibold text-slate-950">
                      AP
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="glass-card">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Focus</p>
                      <p className="mt-3 text-xl font-medium text-white">Java, React, AI Systems</p>
                    </div>
                    <div className="glass-card">
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Building</p>
                      <p className="mt-3 text-xl font-medium text-white">Scalable products with elegant UX</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {personalInfo.roles.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </Motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            eyebrow="About Me"
            title="From frontend curiosity to backend depth and AI exploration"
            description="A journey shaped by building interfaces, learning how systems scale, and using intelligent tools to solve real user problems."
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-lg leading-8 text-slate-300">
                I began with HTML, CSS, and JavaScript, where I learned how design and interaction shape the first impression of a product. That curiosity gradually led me into Java, Spring Boot, and backend architecture, where I started focusing on APIs, real-world data flows, and scalable product logic.
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Along the way, I explored MySQL, Firebase, cloud concepts, and real-time AI systems. Today, I am especially excited by products that combine elegant interfaces, strong backend design, and intelligent automation to create useful digital experiences.
              </p>
              <div className="mt-10 space-y-6">
                {timeline.map((item) => (
                  <Motion.div key={item.year} className="timeline-item relative rounded-[1.5rem] border border-white/8 bg-slate-950/40 p-6" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{item.year}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-slate-400">{item.description}</p>
                  </Motion.div>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              {education.map((item) => (
                <Motion.div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{item.subtitle}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-400">{item.description}</p>
                </Motion.div>
              ))}
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(168,85,247,0.16))] p-7">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Goals</p>
                <p className="mt-3 text-lg leading-8 text-slate-100">
                  Build premium full-stack products, deepen expertise in cloud-native systems, and create AI solutions that feel genuinely helpful in the real world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Skills" title="Engineering depth across modern frontend, backend, and AI workflows" description="A polished blend of user interface craft, backend architecture, and experimentation with real-time intelligent systems." />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5">
              {skills.map((skill) => {
                const Icon = skillIcons[skill.name] ?? FiLayers
                return (
                  <Tilt key={skill.name} tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-full">
                    <Motion.div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-2xl border border-white/10 bg-cyan-400/10 p-4 text-cyan-200">
                            <Icon className="text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                            <p className="mt-1 text-sm text-slate-400">{skill.description}</p>
                          </div>
                        </div>
                        <span className="text-lg font-semibold text-cyan-300">{skill.level}%</span>
                      </div>
                      <div className="mt-5 h-3 rounded-full bg-white/8">
                        <Motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#a855f7)]" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} />
                      </div>
                    </Motion.div>
                  </Tilt>
                )
              })}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(4,9,19,0.92))] p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Tech Stack Cloud</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {techCards.map((tech, index) => (
                  <Motion.div key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.3)]">
                    {tech}
                  </Motion.div>
                ))}
              </div>
              <div className="mt-10 rounded-[1.5rem] border border-cyan-400/15 bg-cyan-400/8 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Strength Zone</p>
                <p className="mt-3 text-lg leading-8 text-slate-200">
                  Strongest at connecting frontend polish with backend reliability, especially in projects that need clean APIs, secure workflows, and intelligent interaction layers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Featured Projects" title="Premium product case studies with depth, motion, and detail" description="A curated set of projects that show how Aditya approaches backend architecture, real-time interaction, computer vision, and practical user-centric problem solving." />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Tilt key={project.title} tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.12}>
                <Motion.article className="project-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(4,9,19,0.92))] p-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.08 }}>
                  <div className="project-preview relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_28%),linear-gradient(135deg,rgba(30,41,59,0.95),rgba(15,23,42,0.95))] p-6">
                    <div className="absolute inset-0 opacity-60 transition duration-500 group-hover:scale-110">
                      <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.14),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.2),transparent_20%),linear-gradient(135deg,rgba(15,23,42,0.1),rgba(15,23,42,0.55))]" />
                    </div>
                    <div className="relative h-56 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(135deg,rgba(15,23,42,0.55),rgba(2,6,23,0.92))] p-4">
                      <div className="grid h-full gap-3">
                        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/8" />
                        <div className="grid grid-cols-[1fr_0.7fr] gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/6" />
                          <div className="rounded-2xl border border-purple-400/20 bg-purple-400/8" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-slate-400">{project.description}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((badge) => (
                      <span key={badge} className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="secondary-button">
                      <FiGithub />
                      GitHub
                    </a>
                    <a href={project.demo} className="secondary-button">
                      <FiArrowUpRight />
                      Live Demo
                    </a>
                    <button type="button" className="primary-button" onClick={() => setSelectedProject(project)}>
                      View Details
                    </button>
                  </div>
                </Motion.article>
              </Tilt>
            ))}
          </div>
        </section>

        <section id="github" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="GitHub Analytics" title="Live coding presence with dynamic profile and contribution insight" description="GitHub data is fetched dynamically so the portfolio can stay current with profile growth, repositories, and public activity signals." />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Profile Snapshot</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{github.profile?.name ?? personalInfo.name}</h3>
                  <p className="mt-2 text-slate-400">{github.profile?.bio ?? 'Java backend builder, full stack developer, and AI enthusiast.'}</p>
                </div>
                <a href={`https://github.com/${personalInfo.githubUsername}`} target="_blank" rel="noreferrer" className="primary-button">
                  <FiGithub />
                  GitHub Profile
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {githubHighlights.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
                    <p className="text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Top Languages</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {github.languages.length ? (
                      github.languages.map(([language, count]) => (
                        <span key={language} className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200">
                          {language} · {count}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">{github.loading ? 'Loading language breakdown...' : 'Language data unavailable right now.'}</span>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${personalInfo.githubUsername}&show_icons=true&theme=transparent&hide_border=true&title_color=67e8f9&text_color=e2e8f0&icon_color=a855f7&bg_color=00000000`}
                    alt="GitHub stats card"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-2"
                    loading="lazy"
                  />
                  <img
                    src={`https://streak-stats.demolab.com?user=${personalInfo.githubUsername}&theme=transparent&hide_border=true&ring=67e8f9&fire=a855f7&currStreakLabel=e2e8f0&sideLabels=e2e8f0&currStreakNum=e2e8f0&sideNums=e2e8f0`}
                    alt="GitHub streak card"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-2"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contribution Activity</p>
              <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                <GitHubCalendar
                  username={personalInfo.githubUsername}
                  colorScheme="dark"
                  fontSize={14}
                  blockSize={13}
                  blockMargin={5}
                  theme={{ dark: ['#0f172a', '#083344', '#155e75', '#0891b2', '#22d3ee'] }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Achievements" title="Milestones that reflect curiosity, discipline, and delivery" description="Growth across hackathons, internships, hands-on project work, and continuous learning." />
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {counters.map((item) => (
                <Counter key={item.label} {...item} />
              ))}
            </div>
            <div className="grid gap-4">
              {achievements.map((item) => (
                <Motion.div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
                  <p className="text-lg text-slate-100">{item}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Experience Timeline" title="A roadmap from foundations to intelligent full-stack systems" description="A clean vertical progression showing how Aditya has expanded from web basics into backend architecture and applied AI." />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-4 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(34,211,238,0.6),rgba(168,85,247,0.25),transparent)] md:left-1/2" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <Motion.div key={item.year} className={`relative md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
                  <div className="mb-4 md:mb-0">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{item.year}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-slate-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                  <span className="absolute left-2.5 top-10 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300 md:left-[calc(50%-0.5rem)]" />
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Developer Terminal" title="An interactive command line layer for fast portfolio discovery" description="A premium terminal widget that lets visitors explore projects, skills, resume, contact, and GitHub shortcuts." />
          <DeveloperTerminal />
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Contact" title="Let's build something amazing together" description="Open to collaborations, internships, backend engineering opportunities, and AI-focused product work." />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(8,12,24,0.94))] p-8 backdrop-blur-xl">
              <p className="text-lg leading-8 text-slate-300">
                Whether you want to build a polished product, discuss a backend system, or explore an AI idea, I'd love to connect.
              </p>
              <a href={`mailto:${personalInfo.email}`} className="secondary-button">
                <FiMail />
                {personalInfo.email}
              </a>
              <a href={resumeUrl} className="primary-button w-fit" download>
                <FiDownload />
                Download Resume
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                {personalInfo.socials.map((social) => {
                  const Icon = socialIcons[social.label]
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                      <Icon />
                      {social.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <form onSubmit={sendEmail} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="grid gap-5">
                <label className="space-y-2">
                  <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Name</span>
                  <input value={formState.name} onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))} className="contact-input" placeholder="Your name" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Email</span>
                  <input type="email" value={formState.email} onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))} className="contact-input" placeholder="Your email" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Message</span>
                  <textarea value={formState.message} onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))} className="contact-input min-h-40 resize-none" placeholder="Tell me about your idea" required />
                </label>
                <button type="submit" className="primary-button w-fit">
                  <FiSend />
                  Send Message
                </button>
                <p className="text-sm text-slate-400">{formStatus}</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>(c) {new Date().getFullYear()} Aditya Prajapati. Built with HTML, CSS, JavaScript, React, and Tailwind CSS.</p>
          <a href="#home" className="secondary-button">
            Back to top
            <FiArrowDownRight className="rotate-[-90deg]" />
          </a>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Suspense fallback={null}>
        <LazyChatbot />
      </Suspense>
    </div>
  )
}

export default App
