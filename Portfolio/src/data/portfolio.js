import profilePortrait from '../assets/images/p1.jpeg'
import aboutPhoto from '../assets/images/p2.png'
import healthPreview from '../assets/images/health-report-analyzer.svg'
import voicePreview from '../assets/images/voice-assistant.svg'
import signPreview from '../assets/images/sign-language.svg'
import mapPreview from '../assets/images/mapmypsit.svg'

export const personalInfo = {
  name: 'Aditya Prajapati',
  title: 'JAVA Backend Developer · Interested in AI/ML · Open to Internships',
  email: 'adityaprajapati4405@gmail.com',
  githubUsername: 'Aditya4405',
  college: 'PSIT Kanpur',
  profileImage: profilePortrait,
  aboutImage: aboutPhoto,
  roles: ['JAVA Backend Developer', 'Interested in AI/ML', 'Open to Internships'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Aditya4405' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-prajapati-4405q' },
    { label: 'Email', href: 'mailto:adityaprajapati4405@gmail.com' },
    { label: 'LeetCode', href: 'https://leetcode.com/Aditya_4405' },
  ],
}

export const aboutHighlights = [
  {
    icon: '💻',
    title: 'Full-Stack Dev',
    body: 'I build end-to-end web apps using the React and Java Backend.',
  },
  {
    icon: '🧩',
    title: 'Problem Solver',
    body: 'I enjoy breaking down complex problems and building clean solutions.',
  },
  {
    icon: '📊',
    title: 'DSA on LeetCode',
    body: 'Sharpening my problem-solving consistently alongside coursework.',
  },
  {
    icon: '🤝',
    title: 'Open to Collaborate',
    body: 'Looking for internships and open to working on interesting projects.',
  },
]

export const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  backend: ['Java', 'Spring Boot', 'REST APIs','Authentication'],
  tools: ['MySQL', 'Git', 'GitHub', 'Postman','Eclipse','VS Code'],
}

export const projects = [
  {
    title: 'Health Report Analyzer',
    preview: healthPreview,
    summary: 'A web app that lets doctors upload, manage, and share patient health reports across roles. Built with Spring Boot and MySQL. Learned how to design role-based access control and keep data in sync with Firebase in real time.',
    stack: ['Spring Boot', 'MySQL', 'Firebase'],
    github: 'https://github.com/Aditya4405',
    demo: '#contact',
    featured: true,
  },
  {
    title: 'Voice Controlled Cooking Assistant',
    preview: voicePreview,
    summary: 'A React app that guides users through recipes using voice commands. Built with React and the Web Speech API. Learned about browser-native voice recognition and building hands-free UI flows.',
    stack: ['React', 'Web Speech API', 'Node.js'],
    github: 'https://github.com/Aditya4405',
    demo: '#contact',
    featured: true,
  },
  {
    title: 'AI Sign Language Translator',
    preview: signPreview,
    summary: 'A computer vision project that captures hand gestures via webcam and translates them into text in real time. Built with Python and OpenCV. My first deep dive into image processing and ML pipelines.',
    stack: ['Python', 'OpenCV', 'TensorFlow'],
    github: 'https://github.com/Aditya4405',
    demo: '#contact',
    featured: true,
  },
  {
    title: 'MapmyPSIT',
    preview: mapPreview,
    summary: 'An indoor campus navigation app for PSIT college. Users can find rooms, labs, and facilities on an interactive map. Built with React and a custom backend API.',
    stack: ['React', 'Node.js', 'Express'],
    github: 'https://github.com/Aditya4405',
    demo: '#contact',
    featured: false,
  },
]

export const achievements = [
  {
    title: 'Smart India Hackathon 2024',
    org: 'Government of India',
    year: '2024',
    description: 'Participated at the national level. Worked on a real problem statement with a team of 6 — from ideation to prototype in 36 hours.',
    type: 'hackathon',
  },
  {
    title: 'Java Development Internship',
    org: 'CodSoft',
    year: '2024',
    description: 'Built Java projects and got hands-on experience with real-world development expectations, code quality, and delivery timelines.',
    type: 'internship',
  },
  {
    title: 'AI Workshop',
    org: 'PSIT Kanpur',
    year: '2025',
    description: 'Attended a hands-on workshop on AI and computer vision. Built small experiments with image recognition during the sessions.',
    type: 'workshop',
  },
  {
    title: 'B.Tech CSE — 3rd Year',
    org: 'PSIT Kanpur',
    year: '2023 – Present',
    description: 'Currently in 3rd year of B.Tech Computer Science & Engineering. Coursework includes DSA, OS, DBMS, and networking.',
    type: 'education',
  },
]

export const milestones = [
  {
    title: 'Smart India Hackathon 2024',
    text: 'Collaborated on solution framing, rapid prototyping, and presenting under real deadlines.',
  },
  {
    title: 'CodSoft Internship',
    text: 'Built Java projects with consistent implementation, ownership, and real-world expectations.',
  },
  {
    title: 'AI Workshop Participation',
    text: 'Expanded hands-on understanding of intelligent systems and applied computer vision.',
  },
  {
    title: 'Healthcare Backend Project',
    text: 'Delivered a full backend-heavy project with practical Spring Boot architecture.',
  },
]

export const counters = [
  { value: 4, suffix: '+', label: 'Projects Completed' },
  { value: 2, suffix: '+', label: 'Hackathons & Workshops' },
  { value: 3, suffix: '+', label: 'Certifications' },
  { value: 12, suffix: '+', label: 'Technologies Used' },
]

export const chatbotReplies = {
  about:
    'Aditya is a 3rd-year B.Tech CSE student at PSIT Kanpur, passionate about building full-stack web apps with the MERN stack.',
  projects:
    'Featured projects include Health Report Analyzer, Voice Cooking Assistant, AI Sign Language Translator, and MapmyPSIT.',
  skills:
    'Aditya works with HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Java, Spring Boot, Git, and Postman.',
  resume:
    'Use the Download Resume button in the hero or contact section.',
  contact:
    'Reach out via the contact form, email at adityaprajapati.dev@gmail.com, or through the social links.',
}
