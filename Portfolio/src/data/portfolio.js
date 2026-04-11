import profilePortrait from '../assets/images/profile-portrait.svg'
import healthPreview from '../assets/images/health-report-analyzer.svg'
import voicePreview from '../assets/images/voice-assistant.svg'
import signPreview from '../assets/images/sign-language.svg'
import mapPreview from '../assets/images/mapmypsit.svg'
import reactLogo from '../assets/icons/react-logo.svg'
import javaLogo from '../assets/icons/java-logo.svg'
import springLogo from '../assets/icons/springboot-logo.svg'
import mysqlLogo from '../assets/icons/mysql-logo.svg'
import firebaseLogo from '../assets/icons/firebase-logo.svg'
import githubLogo from '../assets/icons/github-logo.svg'
import dockerLogo from '../assets/icons/docker-logo.svg'
import aiLogo from '../assets/icons/ai-logo.svg'
import cloudLogo from '../assets/icons/cloud-logo.svg'
import restLogo from '../assets/icons/rest-logo.svg'
import tailwindLogo from '../assets/icons/tailwind-logo.svg'
import vercelLogo from '../assets/icons/vercel-logo.svg'

export const personalInfo = {
  name: 'Aditya Prajapati',
  title: 'Full Stack Developer | Java Backend Engineer | AI Innovator',
  email: 'adityaprajapati.dev@gmail.com',
  githubUsername: 'Aditya4405',
  profileImage: profilePortrait,
  roles: ['Spring Boot Developer', 'AI Enthusiast', 'Full Stack Builder'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Aditya4405' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adityaprajapati' },
    { label: 'Email', href: 'mailto:adityaprajapati.dev@gmail.com' },
    { label: 'LeetCode', href: 'https://leetcode.com/' },
  ],
}

export const heroMetrics = [
  { value: '12+', label: 'Shipped Projects' },
  { value: '95%', label: 'Backend Focus' },
  { value: '24/7', label: 'Builder Mindset' },
]

export const floatingSkills = ['Java', 'React', 'Spring Boot', 'AI Systems', 'Cloud', 'APIs']

export const storyCards = [
  {
    title: 'Frontend Foundation',
    text: 'Started with HTML, CSS, and JavaScript, learning how polished interfaces shape user trust and product clarity.',
  },
  {
    title: 'Backend Depth',
    text: 'Moved into Java, Spring Boot, MySQL, and secure API design to build reliable systems that can scale beyond prototypes.',
  },
  {
    title: 'AI Exploration',
    text: 'Applied computer vision, assistants, and intelligent workflows to real project ideas with practical product thinking.',
  },
]

export const miniAchievements = [
  { icon: 'Sparkles', value: '3+', label: 'Years building' },
  { icon: 'Trophy', value: '4', label: 'Flagship projects' },
  { icon: 'BadgeCheck', value: '6+', label: 'Learning milestones' },
]

export const timeline = [
  {
    year: '2024',
    title: 'Web Development Foundation',
    description:
      'Built a strong base in responsive UI design, modern layouts, and interaction-driven web development.',
  },
  {
    year: '2025',
    title: 'Java Backend + AI Projects',
    description:
      'Deepened into Spring Boot, REST architecture, Firebase sync, and early AI experimentation through applied projects.',
  },
  {
    year: '2026',
    title: 'Full-stack + Healthcare Systems',
    description:
      'Combined polished frontend delivery with backend architecture and healthcare-oriented workflows into production-style builds.',
  },
]

export const aboutHighlights = [
  {
    title: 'Education',
    subtitle: 'Computer Science and Engineering',
    body: 'Focused on software engineering, backend systems, and problem solving through product-led development.',
  },
  {
    title: 'Hackathon',
    subtitle: 'Smart India Hackathon 2024',
    body: 'Strengthened ideation, rapid prototyping, pitching, and team execution under real deadlines.',
  },
  {
    title: 'Backend Specialization',
    subtitle: 'Java + Spring Boot',
    body: 'Special interest in secure REST APIs, data-heavy systems, and backend flows that support rich UI experiences.',
  },
]

export const skills = [
  { name: 'React', icon: reactLogo },
  { name: 'Java', icon: javaLogo },
  { name: 'Spring Boot', icon: springLogo },
  { name: 'MySQL', icon: mysqlLogo },
  { name: 'Firebase', icon: firebaseLogo },
  { name: 'GitHub', icon: githubLogo },
  { name: 'REST API', icon: restLogo },
  { name: 'AI', icon: aiLogo },
  { name: 'Cloud', icon: cloudLogo },
  { name: 'Docker', icon: dockerLogo },
  { name: 'Tailwind', icon: tailwindLogo },
  { name: 'Vercel', icon: vercelLogo },
]

export const projects = [
  {
    title: 'Health Report Analyzer',
    preview: healthPreview,
    summary:
      'A healthcare-focused reporting platform with clean role control, synchronized records, and structured report management.',
    stack: [springLogo, mysqlLogo, firebaseLogo],
    metrics: [
      { label: 'Roles', value: '3 access layers' },
      { label: 'Response', value: '<220ms' },
      { label: 'Sync', value: 'Realtime updates' },
    ],
    features: [
      'Role-based access control',
      'Report lifecycle management',
      'Realtime synchronization support',
    ],
    github: 'https://github.com/adityaprajapati',
    demo: '#contact',
  },
  {
    title: 'Voice Controlled Cooking Assistant',
    preview: voicePreview,
    summary:
      'An AI-assisted voice workflow for recipe guidance, contextual prompts, and media control in one fluid experience.',
    stack: [aiLogo, reactLogo, cloudLogo],
    metrics: [
      { label: 'Input', value: 'Voice-first UX' },
      { label: 'Guidance', value: 'Step-based flow' },
      { label: 'Media', value: 'Integrated controls' },
    ],
    features: [
      'Voice-first interaction model',
      'Cooking workflow help',
      'Media-integrated commands',
    ],
    github: 'https://github.com/adityaprajapati',
    demo: '#contact',
  },
  {
    title: 'AI Sign Language Translator',
    preview: signPreview,
    summary:
      'A computer vision system for real-time gesture capture and AI-powered translation into usable output.',
    stack: [aiLogo, pythonLogoFallback(aiLogo), cloudLogo],
    metrics: [
      { label: 'Detection', value: 'Realtime flow' },
      { label: 'Output', value: 'Accessible translation' },
      { label: 'Focus', value: 'Vision pipeline' },
    ],
    features: [
      'Realtime gesture detection',
      'Translation-focused output layer',
      'AI experimentation with computer vision',
    ],
    github: 'https://github.com/adityaprajapati',
    demo: '#contact',
  },
  {
    title: 'MapmyPSIT',
    preview: mapPreview,
    summary:
      'An indoor navigation system with map-backed direction flow and backend APIs supporting campus guidance.',
    stack: [reactLogo, githubLogo, cloudLogo],
    metrics: [
      { label: 'Routing', value: 'Indoor focused' },
      { label: 'UX', value: 'Map guidance' },
      { label: 'Backend', value: 'API-driven' },
    ],
    features: [
      'Indoor college navigation',
      'Map-based direction support',
      'Backend API system design',
    ],
    github: 'https://github.com/adityaprajapati',
    demo: '#contact',
  },
]

function pythonLogoFallback(icon) {
  return icon
}

export const milestones = [
  {
    title: 'Smart India Hackathon 2024',
    text: 'Collaborated on solution framing, rapid product thinking, and presentation under tight constraints.',
  },
  {
    title: 'CodSoft Internship',
    text: 'Built consistency around implementation, ownership, and real-world development expectations.',
  },
  {
    title: 'AI Workshop Participation',
    text: 'Expanded interest in intelligent systems, experimentation loops, and applied learning.',
  },
  {
    title: 'Healthcare Backend Project',
    text: 'Delivered a backend-heavy project with practical architecture and workflow depth.',
  },
]

export const counters = [
  { value: 12, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Hackathons & Workshops' },
  { value: 6, suffix: '+', label: 'Certifications' },
  { value: 14, suffix: '+', label: 'Technologies Learned' },
]

export const chatbotReplies = {
  about:
    'Aditya is a full stack developer and Java backend engineer focused on modern interfaces, reliable backend systems, and AI-inspired product building.',
  projects:
    'Featured case studies include Health Report Analyzer, Voice Controlled Cooking Assistant, AI Sign Language Translator, and MapmyPSIT.',
  skills:
    'Core strengths include React, Java, Spring Boot, MySQL, Firebase, GitHub, Docker, cloud fundamentals, and applied AI work.',
  resume:
    'Use the Download Resume button in the hero or contact section after replacing the placeholder PDF.',
  contact:
    'Reach out via the contact form, email at adityaprajapati.dev@gmail.com, or social links in the portfolio.',
}
