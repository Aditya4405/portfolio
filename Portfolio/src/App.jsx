import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import { motion as Motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import CursorSpotlight from './components/CursorSpotlight'
import ProjectModal from './components/ProjectModal'
import AboutSection from './components/sections/AboutSection'
import AchievementsSection from './components/sections/AchievementsSection'
import ContactSection from './components/sections/ContactSection'
import GitHubSection from './components/sections/GitHubSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import {
  aboutHighlights,
  chatbotReplies,
  counters,
  floatingSkills,
  heroMetrics,
  milestones,
  miniAchievements,
  personalInfo,
  projects,
  skills,
  storyCards,
  timeline,
} from './data/portfolio'

const LazyChatbot = lazy(() => import('./components/Chatbot'))
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

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const github = useGithubAnalytics(personalInfo.githubUsername)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let frame = 0

    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    const float = gsap.to('.ambient-blob', {
      yPercent: 12,
      xPercent: 4,
      duration: 7,
      repeat: -1,
      yoyo: true,
      stagger: 0.7,
      ease: 'sine.inOut',
    })

    return () => {
      cancelAnimationFrame(frame)
      float.kill()
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
    const commitsEstimate = github.repos.reduce(
      (total, repo) => total + ((repo.size ?? 0) > 0 ? 1 : 0),
      0,
    )

    return [
      { label: 'Repositories', value: repoCount },
      { label: 'Followers', value: followers },
      { label: 'Streak Energy', value: commitsEstimate },
      { label: 'Stars', value: starredEstimate },
    ]
  }, [github.profile, github.repos])

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
    <div className="app-shell bg-[#020617] text-white">
      <CursorSpotlight />

      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.14),transparent_22%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_26%),linear-gradient(180deg,#020617,#030712_48%,#020617)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-60">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="ambient-blob absolute rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.24),rgba(103,232,249,0.02)_64%,transparent_70%)] blur-3xl"
            style={{
              width: `${160 + index * 8}px`,
              height: `${160 + index * 8}px`,
              left: `${(index * 14) % 100}%`,
              top: `${(index * 13) % 100}%`,
            }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#home" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.45em] text-slate-100">
            <span className="inline-flex rounded-full border border-cyan-300/20 bg-white/6 p-2 text-cyan-300">
              <Sparkles size={14} />
            </span>
            AP
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="hover:text-cyan-300">About</a>
            <a href="#skills" className="hover:text-cyan-300">Skills</a>
            <a href="#projects" className="hover:text-cyan-300">Projects</a>
            <a href="#github" className="hover:text-cyan-300">GitHub</a>
            <a href="#contact" className="hover:text-cyan-300">Contact</a>
          </div>
          <a href="#contact" className="secondary-button premium-button hidden md:inline-flex">
            Hire Me
            <ArrowUpRight size={18} />
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        <HeroSection
          personalInfo={personalInfo}
          heroMetrics={heroMetrics}
          floatingSkills={floatingSkills}
          resumeUrl={resumeUrl}
        />
        <AboutSection
          personalInfo={personalInfo}
          storyCards={storyCards}
          miniAchievements={miniAchievements}
          timeline={timeline}
          aboutHighlights={aboutHighlights}
        />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} onOpen={setSelectedProject} />
        <GitHubSection
          personalInfo={personalInfo}
          github={github}
          githubHighlights={githubHighlights}
        />
        <AchievementsSection milestones={milestones} counters={counters} />
        <ContactSection
          personalInfo={personalInfo}
          resumeUrl={resumeUrl}
          formState={formState}
          setFormState={setFormState}
          sendEmail={sendEmail}
          formStatus={formStatus}
        />
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <p>(c) {new Date().getFullYear()} Aditya Prajapati. Built for React, Tailwind, Vercel, and premium storytelling.</p>
          <a href="#home" className="secondary-button premium-button">
            Back to top
            <ArrowUpRight size={18} />
          </a>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Suspense fallback={null}>
        <LazyChatbot replies={chatbotReplies} />
      </Suspense>
    </div>
  )
}

export default App
