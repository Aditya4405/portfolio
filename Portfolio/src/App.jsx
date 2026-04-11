import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import { motion as Motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import ScrollProgress from './components/Effects/ScrollProgress'
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

    return () => {
      cancelAnimationFrame(frame)
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
    <div className="app-shell bg-[#050816] text-[#F8FAFC] min-h-screen selection:bg-[#00D4FF]/30">
      <ScrollProgress />
      
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050816]/60 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="inline-flex items-center text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80">
            Aditya<span className="text-[#00D4FF] drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">.</span>
          </a>
          <div className="hidden items-center gap-8 text-[0.82rem] font-medium md:flex tracking-wide">
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#github" className="nav-link">GitHub</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <a href="#contact" className="primary-button premium-button hidden md:inline-flex shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-shadow">
            Hire Me
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
